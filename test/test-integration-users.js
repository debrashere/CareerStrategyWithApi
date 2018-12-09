'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-users TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedUserData() {
  console.info('seeding user data');
  const seedData = [];

  for (let i=1; i<=100; i++) {
    //console.info('seeding user data ', seedData);
    seedData.push(generateuserData());
  }
  // this will return a promise
  return User.insertMany(seedData).catch(err => console.error(err));
}
  
// used to generate data to put in db
function generatePassword() {
  const text = ['Mypass', 'Testpass', 'Regpass', 'Newpass', 'Oldpass'];
  const numbers = ['1', '2', '3', '4', '5'];
  const part1 = text[Math.floor(Math.random() * text.length)];
  const part2 = numbers[Math.floor(Math.random() * numbers.length)];
  //return   `${part1}${part2}`); 
  //return  User.hashPassword('Mypassw0rd');
  return '$2a$10$UHynRKStsFB63WZiNg3d/.4a/lHx1DIj4yK/TcTa1oJRf4gvZSj3y';
}

// generate an object represnting a user.
// can be used to generate seed data for db
// or request.body data
function generateuserData() {
  return {
    username:faker.internet.userName(),
    password: generatePassword(),
    firstName: faker.name.firstName(),
    lastName:  faker.name.lastName()
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

describe('users API resource', function() {

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

    it('should return all existing users', function() {
      // strategy:
      //    1. get back all users returned by by GET request to `/users`
      //    2. prove res has right status, data type
      //    3. prove the number of users we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/api/users')
        .then(function(_res) {       
          // so subsequent .then blocks can access response object
          res = _res; 
          expect(res).to.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body).to.have.lengthOf.at.least(1);
          return res.body.length;
        })
        .then(function(count) {
          expect(res.body).to.have.lengthOf(count);
        });
    });

    it('should return users with right fields', function() {
      // Strategy: Get back all users, and ensure they have expected keys

      let resuser;
      return chai.request(app)
        .get('/api/users')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);

          res.body.forEach(function(user) {
            expect(user).to.be.a('object');
            expect(user).to.include.keys(
              'id', 'firstName', 'lastName', 'username');
          });
          resuser = res.body[0];          
          return User.findById(resuser.id);
        })
        .then(function(user) {     
          //expect(resuser.id).to.equal(user._id);
          expect(resuser.firstName).to.equal(user.firstName);
          expect(resuser.lastName).to.equal(user.lastName);
          expect(resuser.username).to.equal(user.username);
        });
    });
  })
 
  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the user we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new user', function() {

      const newuser = generateuserData();
      let mostRecentUser;

      return chai.request(app)
        .post('/api/users/')
        .send(newuser)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'username', 'firstName', 'lastName');
          expect(res.body.name).to.equal(newuser.name);
          // cause Mongo should have created id on insertion
          expect(res.body.id).to.not.be.null;
          expect(res.body.username).to.equal(newuser.username);
          expect(res.body.lastName).to.equal(newuser.lastName);
          expect(res.body.firstName).to.equal(newuser.firstName);

          mostRecentUser = newuser

          expect(res.body.username).to.equal(mostRecentUser.username);
          return User.findById(res.body.id);
        })
        .then(function(user) {
          expect(user.username).to.equal(newuser.username);
          expect(user.firstName).to.equal(newuser.firstName);
          expect(user.lastName).to.equal(newuser.lastName);
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing user from db
    //  2. Make a PUT request to update that user
    //  3. Prove user returned by request contains data we sent
    //  4. Prove user in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        id: "ID",
        username: 'newUserName01',
        firstName: 'new FirstName',
        lastName: 'new LastName'
      };

      return User
        .findOne()
        .then(function(user) {
          updateData.id = user.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/users/${user.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);

          return User.findById(updateData.id);
        })
        .then(function(user) {
          expect(user.name).to.equal(updateData.name);
          expect(user.cuisine).to.equal(updateData.cuisine);
        });
    });
  });
/*  CURRENT Users are not to be deleted
  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a user
    //  2. make a DELETE request for that user's id
    //  3. assert that response has right status code
    //  4. prove that user with the id doesn't exist in db anymore
    it('delete a user by id', function() {

      let user;

      return User
        .findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app).delete(`/api/users/${user.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return User.findById(user.id);
        })
        .then(function(_user) {
          expect(_user).to.be.null;
        });
    });  
  }); 
  */
})
