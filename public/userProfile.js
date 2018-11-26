'use strict'

let MOCK_SKILLS =
{
  "skills": [
    {       
        "id": "5bef0be9aeb22c022c594ceee",
        "name": "Express",
        "description": "Node.js is an open source server environment",
        "developerTypes": [
            "5bef0a6aaeb22c022c594ced"
        ],
        "links": [
            {
                "keywords": "Node.js",
                "linktype": "",
                "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                "_id": "5bef0be9aeb22c022c594cf1",
                "title": "Node.js explained"
            }
        ]
    },
    {       
          "id": "5bef0be9aeb22c022c594cf0",
          "name": "Node.js",
          "description": "Node.js is an open source server environment",
          "developerTypes": [
              "5bef0a6aaeb22c022c594ced"
          ],
          "links": [
              {
                  "keywords": "Node.js",
                  "linktype": "",
                  "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                  "_id": "5bef0be9aeb22c022c594cf1",
                  "title": "Node.js explained"
              }
          ]
      },
      {
          "id": "5bf445466db0534d690c2c07",
          "name": "c#",
          "description": "C# is an open source server environment",
          "developerTypes": [
              "5bef0a6aaeb22c022c594ced"
          ],
          "links": [
              {
                  "keywords": "c#",
                  "linktype": "",
                  "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                  "_id": "5bef0be9aeb22c022c594cf1",
                  "title": "c#explained"
              }
          ]
      },
      {
          "id": "5bf4457d6db0534d690c2c1b",
          "name": "Javascript",
          "description": "Javascript is an open source server environment",
          "developerTypes": [
              "5bef0a6aaeb22c022c594ced"
          ],
          "links": [
              {
                  "keywords": "Javascript",
                  "linktype": "",
                  "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                  "_id": "5bef0be9aeb22c022c594cf1",
                  "title": "Javascript explained"
              }
          ]
      },
      {       
        "id": "5bef0be9aeb22c022c594cf0",
        "name": "Node.js",
        "description": "Node.js is an open source server environment",
        "developerTypes": [
            "5bef0a6aaeb22c022c594ced"
        ],
        "links": [
            {
                "keywords": "Node.js",
                "linktype": "",
                "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                "_id": "5bef0be9aeb22c022c594cf1",
                "title": "Node.js explained"
            }
        ]
    },
    {
        "id": "5bf445466db0534d690c2c07",
        "name": "c#",
        "description": "C# is an open source server environment",
        "developerTypes": [
            "5bef0a6aaeb22c022c594ced"
        ],
        "links": [
            {
                "keywords": "c#",
                "linktype": "",
                "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                "_id": "5bef0be9aeb22c022c594cf1",
                "title": "c#explained"
            }
        ]
    },
    {
        "id": "5bf4457d6db0534d690c2c1b",
        "name": "Javascript",
        "description": "Javascript is an open source server environment",
        "developerTypes": [
            "5bef0a6aaeb22c022c594ced"
        ],
        "links": [
            {
                "keywords": "Javascript",
                "linktype": "",
                "url": "https://www.w3schools.com/nodejs/nodejs_intro.asp",
                "_id": "5bef0be9aeb22c022c594cf1",
                "title": "Javascript explained"
            }
        ]
    }      
  ]  
};

let MOCK_USER_PROFILES =
{
  "profiles": [
    { 
      "id": "5bf447b7118b1f34dcfa111d",
      "firstName": "jane",
      "lastName": "doe",
      "email": "janede@email.com",
      "phone": "222-222-2222",
      "employer": "APS",
      "links": {},
      "skills": [
          {
              "_id": "5bf447b7118b1f34dcfa111f",
              "skill": {
                "id": "5bef0be9aeb22c022c594cf0",
                "name": "Node.js"
                },
              "monthsOfExperince": 1,
              "yearsOfExperince": 2
          },
          {
              "_id": "5bf447b7118b1f34dcfa111e",
              "skill": {
                "id": "5bef0be9aeb22c022c594cf0",
                "name": "javascript"
                },
              "monthsOfExperince": 4,
              "yearsOfExperince": 3
          },
          {
            "_id": "5bf447b7118b1f34dcfa111f",
            "skill": {
              "id": "5bef0be9aeb22c022c594cf0",
              "name": "Node.js"
              },
            "monthsOfExperince": 1,
            "yearsOfExperince": 2
        },
        {
            "_id": "5bf447b7118b1f34dcfa111e",
            "skill": {
              "id": "5bef0be9aeb22c022c594cf0",
              "name": "javascript"
              },
            "monthsOfExperince": 4,
            "yearsOfExperince": 3
        },
        {
          "_id": "5bf447b7118b1f34dcfa111f",
          "skill": {
            "id": "5bef0be9aeb22c022c594cf0",
            "name": "Node.js"
            },
          "monthsOfExperince": 1,
          "yearsOfExperince": 2
      },
      {
          "_id": "5bf447b7118b1f34dcfa111e",
          "skill": {
            "id": "5bef0be9aeb22c022c594cf0",
            "name": "javascript"
            },
          "monthsOfExperince": 4,
          "yearsOfExperince": 3
      },
      {
        "_id": "5bf447b7118b1f34dcfa111f",
        "skill": {
          "id": "5bef0be9aeb22c022c594cf0",
          "name": "Node.js"
          },
        "monthsOfExperince": 1,
        "yearsOfExperince": 2
    },
    {
        "_id": "5bf447b7118b1f34dcfa111e",
        "skill": {
          "id": "5bef0be9aeb22c022c594cf0",
          "name": "javascript"
          },
        "monthsOfExperince": 4,
        "yearsOfExperince": 3
    }
      ],
      "roles": [
          {
              "_id": "5bef0a6aaeb22c022c594cec",
              "title": "Reporter",
              "accessLevel": "reporter",
              "__v": 0
          }
      ]
  }
]
};


let MOCK_JOB_PROSPECTS = {
  prospects: [
      {        
          "id": "5bf590130d05a31758434cde",
          "what": "Senior Full Stack Developer",
          "where": "5bef0e0eaeb22c022c594cf3",
          "when": "2018-11-01T07:00:00.000Z",
          "source": "LinkedIn",
          "sourceUrl": "https://www.indeed.com/jobs?q=web%20developer&l=Phoenix%2C%20AZ&vjk=292d3b57b8f73f51",
          "dayToDay": "Day to day responsibilities",
          "contacts": [
              {
                  "title": "title",
                  "phone": "111-111-1111",
                  "contactType": "Recruiter",
                  "datesContacted": [],
                  "_id": "5bf590130d05a31758434cdf",
                  "firstName": "firstname",
                  "lastName": "lastname",
                  "companyName": "Apex Reurting",
                  "links": [
                      {
                          "keywords": "Recuriting",
                          "linktype": "Company Site",
                          "url": "https://www.apexsystems.com/Pages/default.aspx",
                          "_id": "5bf590130d05a31758434ce0",
                          "title": "Apex Recruiting"
                      }
                  ],
                  "comments": []
              }
          ],
          "comments": [
              {
                  "_id": "5bf590130d05a31758434ce1",
                  "comment": "well qualifed for this position",
                  "commentDate": "2018-11-02T07:00:00.000Z"
              }
          ],
          "details": "Details",
          "status": "applied",
          "outcome": "",
          "interviews": [
              {
                  "phone": "333-333-3333",
                  "email": "JohnTewes@test.com",
                  "outcome": "scheduled for f2f interview",
                  "_id": "5bf590130d05a31758434ce2",
                  "firstName": "John",
                  "lastName": "Tewes",
                  "title": "Recruiter",
                  "interviewType": "pre screening",
                  "dateInterviewed": "2018-11-10T07:00:00.000Z",
                  "comments": [
                      {
                          "_id": "5bf590130d05a31758434ce3",
                          "comment": "went well",
                          "commentDate": "2018-11-02T07:00:00.000Z"
                      }
                  ]
              }
          ],
          "jobSkills": [
              {
                  "_id": "5bf590130d05a31758434ce5",
                  "name": "C#",
                  "required": true,
                  "niceToHave": false,
                  "yearsOfExperience": 3
              },
              {
                  "_id": "5bf590130d05a31758434ce4",
                  "name": "javascript",
                  "required": true,
                  "niceToHave": false,
                  "yearsOfExperience": 4
              }
          ]
      },
      {
          "id": "5bf590130d05a31758434cde",
          "what": "Senior Full Stack Developer",
          "where": "5bef0e0eaeb22c022c594cf3",
          "when": "2018-11-01T07:00:00.000Z",
          "source": "LinkedIn",
          "sourceUrl": "https://www.indeed.com/jobs?q=web%20developer&l=Phoenix%2C%20AZ&vjk=292d3b57b8f73f51",
          "dayToDay": "Day to day responsibilities",
          "contacts": [
              {
                  "title": "title",
                  "phone": "111-111-1111",
                  "contactType": "Recruiter",
                  "datesContacted": [],
                  "_id": "5bf590130d05a31758434cdf",
                  "firstName": "firstname",
                  "lastName": "lastname",
                  "companyName": "Apex Reurting",
                  "links": [
                      {
                          "keywords": "Recuriting",
                          "linktype": "Company Site",
                          "url": "https://www.apexsystems.com/Pages/default.aspx",
                          "_id": "5bf590130d05a31758434ce0",
                          "title": "Apex Recruiting"
                      }
                  ],
                  "comments": []
              }
          ],
          "comments": [
              {
                  "_id": "5bf590130d05a31758434ce1",
                  "comment": "well qualifed for this position",
                  "commentDate": "2018-11-02T07:00:00.000Z"
              }
          ],
          "details": "Details",
          "status": "applied",
          "outcome": "",
          "interviews": [
              {
                  "phone": "333-333-3333",
                  "email": "JohnTewes@test.com",
                  "outcome": "scheduled for f2f interview",
                  "_id": "5bf590130d05a31758434ce2",
                  "firstName": "John",
                  "lastName": "Tewes",
                  "title": "Recruiter",
                  "interviewType": "pre screening",
                  "dateInterviewed": "2018-11-10T07:00:00.000Z",
                  "comments": [
                      {
                          "_id": "5bf590130d05a31758434ce3",
                          "comment": "went well",
                          "commentDate": "2018-11-02T07:00:00.000Z"
                      }
                  ]
              }
          ],
          "jobSkills": [
              {
                  "_id": "5bf590130d05a31758434ce5",
                  "name": "C#",
                  "required": true,
                  "niceToHave": false,
                  "yearsOfExperience": 3
              },
              {
                  "_id": "5bf590130d05a31758434ce4",
                  "name": "javascript",
                  "required": true,
                  "niceToHave": false,
                  "yearsOfExperience": 4
              }
          ]
      }
  ]
};


/*    
  Retrieve data from Career Strategy API
*/
function submitCareerStrategyAPI(callbackFn, query) {

  if(query == "userprofile")
    setTimeout(function(){ callbackFn(MOCK_USER_PROFILES)}, 100);
  else if (query == "skills")
    setTimeout(function(){ callbackFn(MOCK_SKILLS)}, 100);
  else if (query == "prospects")
    setTimeout(function(){ callbackFn(MOCK_JOB_PROSPECTS)}, 100);
    

  /*
  console.log("submitCareerStrategyAPI", queryString);
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  const encodedQuery = encodeURIComponent(queryString);
  const url =  `${CAREER_STRATEGY_URL}/${queryString}/`;

  fetch(url)
  .then(response => {
    if (response.ok) {      
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => callbackFn(responseJson, queryString))
  .catch(error => {
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  }); 

  */
} 

function renderUserProfile(data) {
  $( ".js-user-skills" ).html('');
  $( ".js-user-profile" ).html('');
  let thumbs = "";

  let skillCount = 1;
  let counter = 0;
  let skillHeader = '<div class="table flex-item"><div class="tr th"> <div class="td">Skill</div> <div class="td experience">Years</div><div class="td"></div><div class="td"></div></div>';
  let skills = skillHeader;
 
  data.profiles.map( function(profile) {          
    const profileId = `profile${skillCount}`; 
    profile.skills.map( function(skill) {          
      skills +=
       `<div class="tr">  
          <div class="td" data-header="Skill">${skill.skill.name}</div>
          <div class="td" data-header="Experience">${skill.yearsOfExperince}</div>
          <div class="td" data-header=""><a id="EditSkill" href=# class="js-edit-skill"><img alt="edit skill" src="./images/icon-edit.png" /></a></div>
          <div class="td" data-header=""><a id="DeleteSkill" href=# class="js-delete-skill"><img alt="delete skill" src="./images/icon-delete.png" /></a></div>
        </div>`;
        skillCount++; 
        counter++
        if (counter == 3)   
        {
          skills += '</div>';
          skills += skillHeader;
          counter = 0;
        }
     });
     skills += '</div>';     


    let thumb =  
      `<div>
          <span class="title">
            <span><em>${profile.firstName} ${profile.lastName}</em></span>  </br>
            <span>${profile.email}</span>  </br>          
            <span>${profile.phone}</span>  </br>
            <span>${profile.employer}</span>  </br>              
          </span>            
      </div> `;   
      thumbs += thumb;  
  });  

    $('.js-user-skills').append(`${skills}`);  
    $('.js-user-skills').prop("hidden", false); 

    $('.js-user-profile').append(`${thumbs}`);  
    $('.js-user-profile').prop("hidden", false); 
 // watchAddLToLinkClick(); 
} 


function displayCareerStrategyResults(data) {  
  if (data == null || data.profiles == null || data.profiles.length == 0) {
        $('#js-error-message').text("No recipes found");
        $('#js-error-message').prop("hidden", false);
  }
  else { 
    renderUserProfile(data);
  }       
}


function displaySkillsMasterList(data) {
  $( ".js-slider-gallery" ).html('');
  let skillCount = 1;
  let counter = 0;
  let skillHeader = '<div class="table flex-item"><div class="tr th"> <div class="td">Skill</div></div>';
  let skills = skillHeader;
 
  if (data == null || data.skills == null || data.skills.length == 0) {
    $('#js-error-message').text("No master skills found");
    $('#js-error-message').prop("hidden", false);
    return;
  }

    data.skills.map( function(skill) {          
      skills +=
       `<div class="tr">  
          <div class="td" data-header="Skill"><a href=# id="masterSkill${counter}">${skill.name}</a></div>
      </div>`;
        skillCount++; 
        counter++
        if (counter == 3)   
        {
          skills += '</div>';
          skills += skillHeader;
          counter = 0;
        }
     });
     skills += '</div>';       

    $('.js-masterlist-skills').append(`${skills}`);  
    $('.js-masterlist-skills').prop("hidden", false); 
 // watchAddLToLinkClick(); 
}  

function displayProspectsSummary(data) {
    console.log("displayProspectsSummary data", data);

  let counter = 0;
  let skillHeader = `<div class="table flex-item"><div class="tr th"> 
    <div class="td">Prospect</div>
    <div class="td">Where</div>
    <div class="td">When</div>
    <div class="td">Status</div>
    </div>`;

  let prospects = skillHeader;
  let prospectsCount = 0;
 
  if (data == null || data.prospects == null || data.prospects.length == 0) {
    $('#js-error-message').text("No job prospects found");
    $('#js-error-message').prop("hidden", false);
    return;
  }

function custom_sort(a, b) {
    return new Date(a.when).getTime() - new Date(b.when).getTime();
}
const sortedProspects = data.prospects.sort(custom_sort);

sortedProspects.map( function(prospect) {          
      prospects +=
       `<div class="tr">  
          <div class="td" data-header="What">
            <a href=# id="prospect${counter}">${prospect.what}</a>
          </div>
            <div class="td" data-header="Where"><span>${prospect.where}</span></div>
            <div class="td" data-header="When"><span>${prospect.when}</span></div>
            <div class="td" data-header="Status"><span>${prospect.status}</span></div>          
      </div>`; 
        counter++
        if (counter == 3)   
        {
          prospects += '</div>';
          prospects += skillHeader;
          counter = 0;
        }
     });
     prospects += '</div>';       

    $('.js-job-prospects').append(`${prospects}`);  
    $('.js-job-prospects').prop("hidden", false); 
 // watchAddLToLinkClick(); 
} 

function refreshUserProfile() {       
    $( ".thumbs" ).html("");
    $( ".slide" ).html("");
    $(".js-slider").prop("hidden", true); 
    let query  = "userprofile";
    submitCareerStrategyAPI(displayCareerStrategyResults, query);
    query  = "skills";
    submitCareerStrategyAPI(displaySkillsMasterList, query);
    query  = "prospects";
    submitCareerStrategyAPI(displayProspectsSummary, query);
}


/*
  Handle event when edit icon on skill row is clicked
*/
function watchEditLinkClick() {       
  $('.js-edit-skill').click(event => {
    event.preventDefault();  
    const editItem = event.currentTarget.id; 
    if (editItem == "EditHost") {
       showEditHostForm();
    }
    else if  (editItem =="showMenu") {    
      generateMenu();   
    }
    else if  (editItem.substring(0, 10) == "conDetails") {    
      showContributorDetails(editItem.split('-')[1]);    
    }
  });  
}
  
function addMasterSkill(skill){ 
    let masterSkill = JSON.parse(`
    {       
        "id": "5bf447b7118b1f34newMaster",
        "name": "${skill}",
        "description": "",
        "developerTypes": [],
        "links": []
    }`);   

    MOCK_SKILLS.skills.push(masterSkill);
    return masterSkill;
}

function getMasterSkill(skill){
    let masterSkill = null;
    for (let i = 0; i < MOCK_SKILLS.skills.length; i++){
        if (MOCK_SKILLS.skills[i].name == skill){
            masterSkill = MOCK_SKILLS.skills[i];
            break;
        }
      }
    return masterSkill;
}
/*
    Disregard event edit when cancel button is clicked
*/
function  watchAddSkillButtonClick() {       
  $('#addNewSkill').click(event => {  
    event.preventDefault();
    let skill = $('#newSkill').val();
    let years = $('#skillYears').val();
    
    // Check if this skill already exists for this user?     
    let skillFound = false;
    for (let i = 0; i < MOCK_USER_PROFILES.profiles[0].skills.length; i++){      
        if (MOCK_USER_PROFILES.profiles[0].skills[i].skill.name == skill){
            skillFound = true;
            break;
        }
    }
    if (skillFound) {
        
   
    }
    else{
         // If this skill does not exist in the master skills list, add it    
        let thisSkill = getMasterSkill(skill);
        if (thisSkill == null) {
           thisSkill = addMasterSkill(skill);
        }
        let userSkill = JSON.parse(`          {
            "_id": "5bf447b7118newuserskill",
            "skill": {
              "id": "${thisSkill._id}",
              "name": "${thisSkill.name}"
              },
            "monthsOfExperince": 0,
            "yearsOfExperince": ${years}
        }`);
        MOCK_USER_PROFILES.profiles[0].skills.push(userSkill);                
    }
    // Clear out the input fields
    $('#newSkill').html();
    $('#skillYears').html();

    // Refresh the user skills list and master skills list
    refreshUserProfile();
  });  
}

function watchResetEventButtonClick() {       
  $('#resetEvent').click(event => {
     showEditForm();    
  });  
}


function watchSubmitEventButtonClick() {       
  $('#submitEvent').click(event => {
    event.preventDefault();  
    updateJobDetails();
  });  
}
function setupHandleEvents() {  
  refreshUserProfile();   
  watchAddSkillButtonClick();
}

$(setupHandleEvents);