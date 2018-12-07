'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {User} = require('../users/models');
const {JobProspect} = require('../models/jobProspectsModels');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-users TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedJobProspectData() {
  console.info('seeding user profile data');
  const seedData = [];

  for (let i=1; i<=100; i++) { 
    seedData.push(generateJobProspectData());
  }
  // this will return a promise
  return JobProspect.insertMany(seedData).catch(err => console.error(err));
}

function generateStatus()
{
  return "Applied";
}
function generateSource(){
  return "Indeed";
}
function generateSourceUrl() {
return "Indeed.job.url";
}
// used to generate data to put in db
function getUserId() {
  return  11111;
}

// used to generate data to put in db
function generateJobSkills() {
  return [];
  /*
  return [
    {skill: "angular", yearsOfExperience: 2},
    {skill: "cSharp", yearsOfExperience: 8},
    {skill: "asp.net", yearsOfExperience: 12},    
  ];
  */
}

// generate an object represnting a user.
// can be used to generate seed data for db
// or request.body data
function generateJobProspectData() {
   
  return {
    what: faker.name.jobTitle(),
    where: faker.company.companyName(),
    when: faker.date.recent(),
    userId: getUserId(),
    status: generateStatus(),
    source: generateSource(),
    sourceUrl: generateSourceUrl(),
    dayToDay:faker.name.jobDescriptor(),
    contact: faker.name.findName(),
    comments:faker.lorem.paragraph(),
    details:faker.random.words(),
    jobSkills: generateJobSkills()
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

describe('Job Prospects API resource', function() {

  before(function(done) {
    mongoose.connect(TEST_DATABASE_URL, function(err) {
        done(err)
    })
  })
  
    beforeEach(function() {
      return seedJobProspectData();
    });

    afterEach(function() {
      return tearDownDb();
    });  

  // Close the fake connection after all tests are done
  after(function(done) {
    console.log('Closing') // Shows in console (always)
    mongoose.connection.close(function() {
        console.log('Closed') // Also. always shows in console
        done()
    })
  })

  describe('User Profile', function() {

    // test strategy:
    //   1. make request to `/api/prospects`
    //   2. inspect response object and prove has right code and have
    //   right keys in response object.
    it('should retrieve job prospect data GET', function() {
      // for Mocha tests, when we're dealing with asynchronous operations,
      // we must either return a Promise object or else call a `done` callback
      // at the end of the test. The `chai.request(server).get...` call is asynchronous
      // and returns a Promise, so we just return it.
      return chai.request(app)
        .get('/api/prospects')
        .then(function(res) {
          console.log("aaaaaaaaaaaaaaaaaaaaaa res.body", res.body);
          res.should.have.status(200);
          res.should.be.json; 
          res.body.jobProspect.should.be.a('array');
          // because we create three items on app load
          res.body.jobProspect.length.should.be.at.least(1);
          // each item should be an object with key/value pairs
          // for `id`, `name` and `checked`.
          const expectedKeys = ['id', 'what', 'where'];
          res.body.jobProspect.forEach(function(item) {
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
          });
        });
    });

    // test strategy:
    //  1. make a POST request with data for a new item
    //  2. inspect response object and prove it has right
    //  status code and that the returned object has an `id`
    it('should add an item on POST', function() {    
      const randomUserId = Math.floor((Math.random() * 1000000) + 1).toString();
      //const newItem = `{"email": "jason.diggs@test.com", "firstName": "testguy", "lastName": "jones", "phone": "123-456-1789",  "roles": [], "skills" : [], "userId": "${randomUserId}"}`; 
      const newItem = generateJobProspect();

      return chai.request(app)
        .post('/api/jobprospects')
        .send(newItem)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('what', 'when', 'where', 'status');
          res.body.id.should.not.be.null;
          // response should be deep equal to `newItem` from above if we assign
          // `id` to it from `res.body.id`
          res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
        });
    });

    // test strategy:
    //  1. initialize some update data (we won't have an `id` yet)
    //  2. make a GET request so we can get an item to update
    //  3. add the `id` to `updateData`
    //  4. Make a PUT request with `updateData`
    //  5. Inspect the response object to ensure it
    //  has right status code and that we get back an updated
    //  item with the right data in it.
    it('should update items on PUT', function() {
      // we initialize our updateData here and then after the initial
      // request to the app, we update it with an `id` property so
      // we can make a second, PUT call to the app.
      const updateData = generateProspectUpdateData();

      return chai.request(app)
        // first have to get so we have an idea of object to update
        .get('/api/prospects')
        .then(function(res) {
          updateData.id = res.body.JobProspect[0].id;
          // this will return a promise whose value will be the response
          // object, which we can inspect in the next `then` back. Note
          // that we could have used a nested callback here instead of
          // returning a promise and chaining with `then`, but we find
          // this approach cleaner and easier to read and reason about.
          return chai.request(app)
            .put(`/api/prospects/${updateData.id}`)
            .send(updateData);
        })
        // prove that the PUT request has right status code
        // and returns updated item
        .then(function(res) {
          res.should.have.status(204);
        });
    });
  
    // test strategy:
    //  1. GET a shopping list items so we can get ID of one
    //  to delete.
    //  2. DELETE an item and ensure we get back a status 204
    it('should delete items on DELETE', function() {
      return chai.request(app)
        // first have to get so we have an `id` of item
        // to delete
        .get('/api/prospects')
        .then(function(res) {
          return chai.request(app)
            .delete(`/api/prospects/${res.body.jobProspect[0].id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
        });
    });
  })
})
