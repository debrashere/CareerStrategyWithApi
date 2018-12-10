'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {Skill} = require('../models/skillsModels');
const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
let token;

console.log("test-skills TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

const skills = [

  {"skill": "Angular", "description": "", "date": new Date()},
  {"skill": ".Net", "description": "", "date": new Date()},
  {"skill": ".Net Core", "description": "", "date": new Date()},
  {"skill": "c#", "description": "", "date": new Date()},
  {"skill": "Visual Studio", "description": "", "date": new Date()},
  {"skill": "HTML5" , "description": "", "date": new Date()},
  {"skill": "CSS" , "description": "", "date": new Date()}, 
  {"skill": "CSS3" , "description": "", "date": new Date()},
  {"skill": "JS" , "description": "", "date": new Date()},
  {"skill": "AJAX/JSON" , "description": "", "date": new Date()},
  {"skill": "jquery" , "description": "", "date": new Date()},
  {"skill": "react.js" , "description": "", "date": new Date()},
  {"skill": "Responsive design" , "description": "", "date": new Date()},
  {"skill": "PHP" , "description": "", "date": new Date()},
  {"skill": "Node.js" , "description": "", "date": new Date()},
  {"skill": "ROR" , "description": "", "date": new Date()},
  {"skill": "Django" , "description": "", "date": new Date()},
  {"skill": "Apache" , "description": "", "date": new Date()},
  {"skill": "nginx" , "description": "", "date": new Date()},
  {"skill": "NoSQL" , "description": "", "date": new Date()},
  {"skill": "RDBMS" , "description": "", "date": new Date()},
  {"skill": "TDD" , "description": "", "date": new Date()},
  {"skill": "Virtualization" , "description": "", "date": new Date()},
  {"skill": "sandboxing" , "description": "", "date": new Date()},
  {"skill": "linux" , "description": "", "date": new Date()},
  {"skill": "Git" , "description": "", "date": new Date()}, 
  {"skill": "android/iOS" , "description": "", "date": new Date()}, 
  {"skill": "app developement" , "description": "", "date": new Date()},
  {"skill": "UI/UX design" , "description": "", "date": new Date()}
]

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedSkillData() {
  console.info('seeding skill data');
  const seedData = [];
  seedData.push(skills);
  // this will return a promise
  return Skill.insertMany(skills).catch(err => console.error(err));
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
  // return User.insertMany(loggedInUsers);
}

// generate an object represnting a skill.
// can be used to generate seed data for db
// or request.body data
function generateSkillData() {
  return {
    skill:"newskill",
    description:"new skill description",
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

function exit (code) {
  function done() {
    draining--;
    console.log(`Draining down to ${draining}`);
    if (draining <= 0) {
      process.exit(Math.min(code, 255));
    }
  }

  process.on('exit', function(realExitCode) {
    console.log(`Process is exiting with ${realExitCode}`);
  });

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1;
    console.log(`Draining up to ${draining}`);
    stream.write('', done);
  });

  console.log('Starting extra call to done().');
  done();
  console.log('Extra call to done() finished.');
}

describe('skills API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedSkillData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedSkillData();
  });

  beforeEach(function() {
    return seedLoggedInUser();
  });

  after(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  /*
  after(function() {
    exit();
  });
  */

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing skills', function() {
      // strategy:
      //    1. get back all skills returned by by GET request to `/skills`
      //    2. prove res has right status, data type
      //    3. prove the number of skills we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/api/skills/')
        .set('Authorization', token)
        .then(function(_res) {       
          // so subsequent .then blocks can access response object
          res = _res; 
          expect(res).to.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body.skill).to.have.lengthOf.at.least(1);
          return res.body.skill.length;
        })
        .then(function(count) {
          expect(res.body.skill).to.have.lengthOf(count);
        });
    });

    it('should return skills with right fields', function() {
      // Strategy: Get back all skills, and ensure they have expected keys

      let resSkill;
      return chai.request(app)
        .get('/api/skills/')
        .set('Authorization', token)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.skill).to.be.a('array');
          expect(res.body.skill).to.have.lengthOf.at.least(1);

          res.body.skill.forEach(function(skill) {
            expect(skill).to.be.a('object');
            expect(skill).to.include.keys(
              'id', 'skill', 'description');
          });
          resSkill = res.body.skill[0];          
          return Skill.findById(resSkill.id);
        })
        .then(function(skill) {     
          //expect(resSkill.id).to.equal(skill._id);
          expect(resSkill.skill).to.equal(skill.skill);        
        });
    });
});
   
  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the skill we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new skill', function() {

      const newSkill = generateSkillData();
      let mostRecentSkill;

      return chai.request(app)
        .post('/api/skills/')
        .set('Authorization', token)
        .send(newSkill)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'skill', 'description', 'date');
          expect(res.body.skill).to.equal(newSkill.skill);
          // cause Mongo should have created id on insertion
          //expect(res.body.id).to.not.be.null;
          expect(res.body.skill).to.equal(newSkill.skill);
          expect(res.body.description).to.equal(newSkill.description);

          mostRecentSkill = newSkill;

          expect(res.body.skill).to.equal(mostRecentSkill.skill);
          return Skill.findById(res.body.id);
        })
        .then(function(skill) {
          expect(skill.skill).to.equal(newSkill.skill);
          expect(skill.description).to.equal(newSkill.description);
         // expect(skill.date).to.equal(newSkill.date); 
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing skill from db
    //  2. Make a PUT request to update that skill
    //  3. Prove skill returned by request contains data we sent
    //  4. Prove skill in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = { 
           id: "id",
        skill: "Angular" ,
        description: 'Angular new description'
      };

      return Skill
        .findOne()
        .then(function(skill) {
          updateData.id = skill.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/api/skills/${skill.id}`)
            .set('Authorization', token)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Skill.findById(updateData.id);
        })
        .then(function(skill) {
          expect(skill.skill).to.equal(updateData.skill);
          expect(skill.description).to.equal(updateData.description);
        });
    });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a skill
    //  2. make a DELETE request for that skill's id
    //  3. assert that response has right status code
    //  4. prove that skill with the id doesn't exist in db anymore
    it('delete a skill by id', function() {

      let skill;

      return Skill
        .findOne()
        .then(function(_skill) {
          skill = _skill;
          return chai.request(app)
          .delete(`/api/skills/${skill.id}`)
          .set('Authorization', token)
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Skill.findById(skill.id);
        })
        .then(function(_skill) {
          expect(_skill).to.be.null;
        });
    });   
  }); 
});