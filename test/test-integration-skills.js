'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {Skill} = require('../models/skillsModels');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

console.log("test-skills TEST_DATABASE_URL", TEST_DATABASE_URL);

chai.use(chaiHttp);

const skills = [
{"skill": "Angular", "description": ""},
{"skill": ".Net", "description": ""},
{"skill": ".Net Core", "description": ""},
{"skill": "c#", "description": ""},
{"skill": "Visual Studio", "description": ""},
{"skill": "HTML5" , "description": ""},
{"skill": "CSS" , "description": ""}, 
{"skill": "CSS3" , "description": ""},
{"skill": "JS" , "description": ""},
{"skill": "AJAX/JSON" , "description": ""},
{"skill": "jquery" , "description": ""},
{"skill": "react.js" , "description": ""},
{"skill": "Responsive design" , "description": ""},
{"skill": "PHP" , "description": ""},
{"skill": "Node.js" , "description": ""},
{"skill": "ROR" , "description": ""},
{"skill": "Django" , "description": ""},
{"skill": "Apache" , "description": ""},
{"skill": "nginx" , "description": ""},
{"skill": "NoSQL" , "description": ""},
{"skill": "RDBMS" , "description": ""},
{"skill": "TDD" , "description": ""},
{"skill": "Virtualization" , "description": ""},
{"skill": "sandboxing" , "description": ""},
{"skill": "linux" , "description": ""},
{"skill": "Git" , "description": ""}, 
{"skill": "android/iOS" , "description": ""}, 
{"skill": "app developement" , "description": ""},
{"skill": "UI/UX design" , "description": ""}]

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
 

// generate an object represnting a skill.
// can be used to generate seed data for db
// or request.body data
function generateSkillData() {
  return {
    skill:"newskill",
    description:""
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
        .get('/api/skills')
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

    it('should return skills with right fields', function() {
      // Strategy: Get back all skills, and ensure they have expected keys

      let resSkill;
      return chai.request(app)
        .get('/api/skills')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);

          res.body.forEach(function(skill) {
            expect(skill).to.be.a('object');
            expect(skill).to.include.keys(
              'id', 'skill');
          });
          resSkill = res.body[0];          
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
      let mostRecentGrade;

      return chai.request(app)
        .post('/skills')
        .send(newSkill)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'name', 'cuisine', 'borough', 'grade', 'address');
          expect(res.body.name).to.equal(newSkill.name);
          // cause Mongo should have created id on insertion
          expect(res.body.id).to.not.be.null;
          expect(res.body.cuisine).to.equal(newSkill.cuisine);
          expect(res.body.borough).to.equal(newSkill.borough);

          mostRecentGrade = newSkill.grades.sort(
            (a, b) => b.date - a.date)[0].grade;

          expect(res.body.grade).to.equal(mostRecentGrade);
          return skill.findById(res.body.id);
        })
        .then(function(skill) {
          expect(skill.name).to.equal(newSkill.name);
          expect(skill.cuisine).to.equal(newSkill.cuisine);
          expect(skill.borough).to.equal(newSkill.borough);
          expect(skill.grade).to.equal(mostRecentGrade);
          expect(skill.address.building).to.equal(newSkill.address.building);
          expect(skill.address.street).to.equal(newSkill.address.street);
          expect(skill.address.zipcode).to.equal(newSkill.address.zipcode);
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
        name: 'fofofofofofofof',
        cuisine: 'futuristic fusion'
      };

      return skill
        .findOne()
        .then(function(skill) {
          updateData.id = skill.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/skills/${skill.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);

          return skill.findById(updateData.id);
        })
        .then(function(skill) {
          expect(skill.name).to.equal(updateData.name);
          expect(skill.cuisine).to.equal(updateData.cuisine);
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

      return skill
        .findOne()
        .then(function(_skill) {
          skill = _skill;
          return chai.request(app).delete(`/skills/${skill.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return skill.findById(skill.id);
        })
        .then(function(_skill) {
          expect(_skill).to.be.null;
        });
    });   
  }); 

});
