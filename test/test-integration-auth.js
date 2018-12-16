'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-users TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);
  
// used to generate data to put in db
function generatePassword() {
  return  User.hashPassword('Mypassw0rd');
}

// generate an object represnting user registration data
const register_details = {"username": "RegUserName","password": "Mypassw0rd", "firstName": "RegFirstName","lastName":  "RegLastName"};
const login_details  = {"username": "RegUserName","password": "Mypassw0rd"};

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
    return tearDownDb();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

describe('USER Registartion and Login ', function() {
  it('should return register and login a user', (done) => {
      chai.request(app)
        .post('/api/users/')
        .send(register_details) 
        .then((res, err) => {
            expect(res).to.have.status(201);  
              // follow up with login
              chai.request(app)
              .post('/api/auth/login')
              .send(login_details)
              .end((err, res) => {                
                expect(res).to.have.status(200);               
                expect(res.body.userAuth).to.not.be.null; 
                expect(res.body.userAuth).to.haveOwnProperty('authToken');
                expect(res.body.userAuth).to.haveOwnProperty('id');
                done();                                              
              })          
            }) 
        .catch(err => {
            console.error(err);             
        })              
      })
    })
})