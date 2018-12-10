'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {Role} = require('../models/commonModels');
const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
let token;
console.log("test-roles TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

const roles = [
{"role": "User", "accessLevel": "user", "date": new Date()},
{"role": "Reporter", "accessLevel": "reporting", "date": new Date()},
{"role": "Administrattor", "accessLevel": "admin", "date": new Date()}
]

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedRoleData() {
  console.info('seeding role data');
  const seedData = [];
  seedData.push(roles);
  // this will return a promise
  return Role.insertMany(roles).catch(err => console.error(err));
}
 

function seedLoggedInUser() {
  console.info('           seeding logged in User data');
  const loggedInUsers = [{
      username: "debratester",
      password: "Mypassw0rd",
      firstName:"debra",
      lastName:  "tester"
    }];
  
   token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZGVicmF0ZXN0ZXIiLCJmaXJzdE5hbWUiOiJkZWJyYSIsImxhc3ROYW1lIjoidGVzdGVyIiwiaWQiOiI1YzBiMDg0ZGE3MWJkNDBhZDAzNWYzZjQifSwiaWF0IjoxNTQ0MjMzNzQ4LCJleHAiOjE1NDQ4Mzg1NDgsInN1YiI6ImRlYnJhdGVzdGVyIn0.nE8Vs317DX_6I5j_6VP3oLErBLOOBPBh-NoM4mLvDYk';
  // this will return a promise  
  return User.insertMany(loggedInUsers);
}

// generate an object represnting a role.
// can be used to generate seed data for db
// or request.body data
function generateRoleData() {
  return {
    role:"newRole",
    accessLevel:"new access level",
    date: new Date()
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

describe('roles API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRoleData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  before(function() {
    return seedRoleData();
  });

  before(function() {
    return seedLoggedInUser();
  });


  /*
  beforeEach(function() {
    return seedRoleData();
  });

  afterEach(function() {
    return tearDownDb();
  });
  */

  after(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing roles', function() {
      // strategy:
      //    1. get back all roles returned by by GET request to `/roles`
      //    2. prove res has right status, data type
      //    3. prove the number of roles we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/api/roles')
        .set('Authorization', token)
        .then(function(_res) {       
          // so subsequent .then blocks can access response object
          res = _res; 
          expect(res).to.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body.role).to.have.lengthOf.at.least(1);
          return res.body.role.length;
        })
        .then(function(count) {
          expect(res.body.role).to.have.lengthOf(count);
        });
    });

    it('should return roles with right fields', function() {
      // Strategy: Get back all roles, and ensure they have expected keys

      let resRole;
      return chai.request(app)
        .get('/api/roles')
        .set('Authorization', token)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.role).to.be.a('array');
          expect(res.body.role).to.have.lengthOf.at.least(1);

          res.body.role.forEach(function(role) {
            expect(role).to.be.a('object');
            expect(role).to.include.keys(
              'id', 'role','accessLevel', 'date');
          });
          resRole = res.body.role[0];    
          return Role.findById(resRole.id);
        })
        .then(function(role) { 
          //expect(resRole.id).to.equal(role._id);
          expect(resRole.role).to.equal(role.role);  
          expect(resRole.accessLevel).to.equal(role.accessLevel);  
         // expect(resRole.date).to.equal(role.date);     
        });
    });
});
   
  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the role we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new role', function() {

      const newRole = generateRoleData();
      let mostRecentRole;

      return chai.request(app)      
        .post('/api/roles/')
        .set('Authorization', token)
        .send(newRole)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'role', 'accessLevel', 'date');
         // expect(res.body.role).to.equal(newRole.role);
          // cause Mongo should have created id on insertion
          expect(res.body.id).to.not.be.null;        
          expect(res.body.accessLevel).to.equal(newRole.accessLevel);
     
          mostRecentRole = newRole;
          expect(res.body.role).to.equal(mostRecentRole.role);
          return Role.findById(res.body.id);
        })
        .then(function(newRole) {
          expect(newRole.role).to.equal(newRole.role);
          expect(newRole.accessLevel).to.equal(newRole.accessLevel);
          expect(newRole.date).to.equal(newRole.date);
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing role from db
    //  2. Make a PUT request to update that role
    //  3. Prove role returned by request contains data we sent
    //  4. Prove role in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        id: "newid",    
        accessLevel: 'ReportsLevel1'        
      };

      return Role
        .findOne()
        .then(function(role) {
          updateData.id = role._id;
         
          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/roles/${updateData.id}`)
            .set('Authorization', token)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Role.findById(updateData.id);
        })
        .then(function(newRole) { 
          expect(newRole.accessLevel).to.equal(updateData.accessLevel);
        });
    });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a role
    //  2. make a DELETE request for that role's id
    //  3. assert that response has right status code
    //  4. prove that role with the id doesn't exist in db anymore
    it('delete a role by id', function() {

      let role;

      return Role
        .findOne()
        .then(function(_role) {
          role = _role;
          return chai.request(app)
          .delete(`/api/roles/${role.id}`)
          .set('Authorization', token)
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Role.findById(role.id);
        })
        .then(function(_role) {
          expect(_role).to.be.null;
        });
    });   
  }); 

});
