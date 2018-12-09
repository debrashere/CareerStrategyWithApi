'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {UserProfile} = require('../models/userProfileModels');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-jb-user-profile TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedUserData() {
  console.info('seeding user profile data');
  const seedData = [];

  for (let i=1; i<=100; i++) { 
    seedData.push(generateUserProfileData());
  }
  // this will return a promise
  return UserProfile.insertMany(seedData).catch(err => console.error(err));
}

// used to generate data to put in db
function generateRoles() {
  return  [];
}

// used to generate data to put in db
function generateSkills() {
  return [];

  return [
    {skill: "angular", yearsOfExperience: 2},
    {skill: "cSharp", yearsOfExperience: 8},
    {skill: "asp.net", yearsOfExperience: 12},    
  ];

}

// generate an object represnting a user.
// can be used to generate seed data for db
// or request.body data
function generateUserProfileData() {
  return {
    username:faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    userId: faker.internet.userName(),
    phone:  faker.phone.phoneNumber(),
    skills: generateSkills(),
    roles: generateRoles()
  };
}

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure data from one test does not stick
// around for next one
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('UserProfile API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedUserData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing user profiles', function() {
      // strategy:
      //    1. get back all user profile returned by by GET request to `/userprofiles`
      //    2. prove res has right status, data type
      //    3. prove the number of user profile we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/api/userprofiles/')
        .then(function(_res) { 
          // so subsequent .then blocks can access response object
          res = _res; 
          expect(res).to.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body.userProfile).to.have.lengthOf.at.least(1);
          return res.body.userProfile.length;
        })
        .then(function(count) {
          expect(res.body.userProfile).to.have.lengthOf(count);
        });
    });   

    it('should return user profile with right fields', function() {
      // Strategy: Get back all user profiles, and ensure they have expected keys
      let resProfile;
      return chai.request(app)
        .get('/api/userprofiles/')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.userProfile).to.be.a('array');
          expect(res.body.userProfile).to.have.lengthOf.at.least(1);

          res.body.userProfile.forEach(function(userProfile) {
            expect(userProfile).to.be.a('object');
            expect(userProfile).to.include.keys(
              'firstName','lastName', 'email', 'userId', 'phone', 'skills', 'roles');
          });
          resProfile = res.body.userProfile[0];  
          return UserProfile.findById(resProfile.id);
        })
        .then(function(profile) {    
          //expect(resProfile.id).to.equal(userProfile._id);
          expect(resProfile.what).to.equal(profile.what);        
        });
    });
});
 
describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the userProfile we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new user profile', function() {

      const newProfile = generateUserProfileData();
      let mostRecentProfile;

      return chai.request(app)
        .post('/api/userprofiles/')
        .send(newProfile)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'firstName','lastName', 'email', 'userId', 'phone', 'skills', 'roles');
          //expect(res.body).to.equal(newProfile.prospect);
          // cause Mongo should have created id on insertion
          expect(res.body.id).to.not.be.null;
          expect(res.body.firstName).to.equal(newProfile.firstName);
          expect(res.body.lastName).to.equal(newProfile.lastName);

          mostRecentProfile = newProfile;
          expect(res.body.firstName).to.equal(mostRecentProfile.firstName);
          return UserProfile.findById(res.body.id);
        })
        .then(function(userProfile) {
          expect(userProfile.firstName).to.equal(newProfile.firstName);
          expect(userProfile.lastName).to.equal(newProfile.lastName);
          expect(userProfile.email).to.equal(newProfile.email); 
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing userProfile from db
    //  2. Make a PUT request to update that userProfile
    //  3. Prove userProfile returned by request contains data we sent
    //  4. Prove userProfile in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = { 
           id: "id",
        email: "new.email@new.com" ,
        phone: '111-123-2344'
      };

      return UserProfile
        .findOne()
        .then(function(userProfile) {
          updateData.id = userProfile.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/userprofiles/${userProfile.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return UserProfile.findById(updateData.id);
        })
        .then(function(userProfile) {
          expect(userProfile.email).to.equal(updateData.email);
          expect(userProfile.phone).to.equal(updateData.phone);
        });
    });
  });
 
  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a userProfile
    //  2. make a DELETE request for that userProfile's id
    //  3. assert that response has right status code
    //  4. prove that userProfile with the id doesn't exist in db anymore
    it('delete a userProfile by id', function() {

      let userProfile;

      return UserProfile
        .findOne()
        .then(function(_profile) {
          userProfile = _profile;
          return chai.request(app).delete(`/api/userprofiles/${userProfile.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return UserProfile.findById(userProfile.id);
        })
        .then(function(_profile) {
          expect(_profile).to.be.null;
        });
    });      
  });
})
