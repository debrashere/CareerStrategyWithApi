'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {JobProspect} = require('../models/jobProspectsModels');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-jb-prospects TEST_DATABASE_URL", TEST_DATABASE_URL);

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
  return []
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

describe('Prospects API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedJobProspectData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedJobProspectData();
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

    it('should return all existing prospects', function() {
      // strategy:
      //    1. get back all prospects returned by by GET request to `/prospects`
      //    2. prove res has right status, data type
      //    3. prove the number of prospects we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/api/prospects/')
        .then(function(_res) {       
          // so subsequent .then blocks can access response object
          res = _res; 
          expect(res).to.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body.prospect).to.have.lengthOf.at.least(1);
          return res.body.prospect.length;
        })
        .then(function(count) {
          expect(res.body.prospect).to.have.lengthOf(count);
        });
    });

    it('should return prospect with right fields', function() {
      // Strategy: Get back all job prospects, and ensure they have expected keys
      let resProspect;
      return chai.request(app)
        .get('/api/prospects/')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.prospect).to.be.a('array');
          expect(res.body.prospect).to.have.lengthOf.at.least(1);

          res.body.prospect.forEach(function(jobProspect) {
            expect(jobProspect).to.be.a('object');
            expect(jobProspect).to.include.keys(
              'what', 'where', 'when');
          });
          resProspect = res.body.prospect[0];  
          return JobProspect.findById(resProspect.id);
        })
        .then(function(prospect) {    
          //expect(resProspect.id).to.equal(jobProspect._id);
          expect(resProspect.what).to.equal(prospect.what);        
        });
    });
});

describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the jobProspect we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new job prospect', function() {

      const newProspect = generateJobProspectData();
      let mostRecentProspect;

      return chai.request(app)
        .post('/api/prospects/')
        .send(newProspect)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'what', 'when', 'where');
          //expect(res.body).to.equal(newProspect.prospect);
          // cause Mongo should have created id on insertion
          expect(res.body.id).to.not.be.null;
          expect(res.body.what).to.equal(newProspect.what);
          expect(res.body.where).to.equal(newProspect.where);

          mostRecentProspect = newProspect;

          expect(res.body.what).to.equal(mostRecentProspect.what);
          return JobProspect.findById(res.body.id);
        })
        .then(function(jobProspect) {
          expect(jobProspect.what).to.equal(newProspect.what);
          expect(jobProspect.where).to.equal(newProspect.where);
          expect(jobProspect.date).to.equal(newProspect.date); 
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing jobProspect from db
    //  2. Make a PUT request to update that jobProspect
    //  3. Prove jobProspect returned by request contains data we sent
    //  4. Prove jobProspect in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = { 
           id: "id",
        what: "new what" ,
        where: 'new where'
      };

      return JobProspect
        .findOne()
        .then(function(jobProspect) {
          updateData.id = jobProspect.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/prospects/${jobProspect.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return JobProspect.findById(updateData.id);
        })
        .then(function(jobProspect) {
          expect(jobProspect.what).to.equal(updateData.what);
          expect(jobProspect.where).to.equal(updateData.where);
        });
    });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a jobProspect
    //  2. make a DELETE request for that jobProspect's id
    //  3. assert that response has right status code
    //  4. prove that jobProspect with the id doesn't exist in db anymore
    it('delete a jobProspect by id', function() {

      let jobProspect;

      return JobProspect
        .findOne()
        .then(function(_prospect) {
          jobProspect = _prospect;
          return chai.request(app).delete(`/api/prospects/${jobProspect.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return JobProspect.findById(jobProspect.id);
        })
        .then(function(_prospect) {
          expect(_prospect).to.be.null;
        });
    });      
});

})