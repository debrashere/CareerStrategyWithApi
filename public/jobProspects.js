'use strict'
const CAREER_STRATEGY_URL = 'http://localhost:8080/api';

let MOCK_ROLES = {
    "roles": [
        {
            "id": "5bef0a6aaeb22c022c594cec",
            "title": "Reporter",
            "accessLevel": "reporter"
        },
        {
            "id": "5bef0a6aaeb22c022c594ceb",
            "title": "SuperUser",
            "accessLevel": "all"
        },
        {
            "id": "5bef0a6aaeb22c022c594ced",
            "title": "User",
            "accessLevel": "user"
        }
    ]
}
let MOCK_USER =    {
  "user": {
    "username": "thisusername",
    "firstName": "thisuserfirstName",
    "lastName": "ThisUserLastName"
  }
};

let MOCK_COMPANIES = {
  "companies": [
      {
          "id": "5bef0e0eaeb22c022c594cf3",
          "title": "Carvana",
          "description": "Carvana is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
          "state": "AZ",
          "zip": "85302",
          "links": [
              {
                  "keywords": "Carvana, Company",
                  "linktype": "",
                  "url": "https://www.carvana.com/",
                  "_id": "5bef0e0eaeb22c022c594cf4",
                  "title": "Carvana site"
              }
          ]
      },
      {
          "id": "5bf1dbca3672ef1af46256d2",
          "title": "SRP",
          "description": "Carvana is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
          "state": "AZ",
          "zip": "85302",
          "links": [
              {
                  "keywords": "SRP, Company",
                  "linktype": "",
                  "url": "https://www.SRP.com/",
                  "_id": "5bf1dbca3672ef1af46256d3",
                  "title": "SRP site"
              }
          ]
      },
      {
          "id": "5bf1ec277b378e2e6814a511",
          "title": "Cox",
          "description": "Cox is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
          "state": "AZ",
          "zip": "85302",
          "links": [
              {
                  "keywords": "Cox, Company",
                  "linktype": "",
                  "url": "https://www.SRP.com/",
                  "_id": "5bf1ec277b378e2e6814a512",
                  "title": "Cox site"
              }
          ]
      }
  ]
};

let MOCK_USER_PROFILES = {
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
                  "skill": "5bf445466db0534d690c2c07",
                  "monthsOfExperince": 2,
                  "yearsOfExperince": 2
              },
              {
                  "_id": "5bf447b7118b1f34dcfa111e",
                  "skill": "5bf4457d6db0534d690c2c1b",
                  "monthsOfExperince": 2,
                  "yearsOfExperince": 2
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
            "dayToDay": "Building workflow management systems (e.g., helping our employees automate themselves)  Building connected services (e.g., integrating with providers like Twilio)           Creating beautiful dashboards for both managers and staff           Understanding and optimizing our processes through data and analytics",
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
                    "comment": "Passed first phone interview",
                    "commentDate": "2018-11-03T07:00:00.000Z"
                },
                {
                    "_id": "5bf590130d05a31758434ce2",
                    "comment": "well qualifed for this position",
                    "commentDate": "2018-11-15T07:00:00.000Z"
                }
            ],
            "details": `Professional Health Care Network is hiring a full-time Software Developer to help us double the size of our business. Our developers report directly to the CTO and will be critical to us achieving our operational goals over the coming years. 
   \n        What you’ll be working on   
   \n  PHCN is building our infrastructure in-house from scratch. We work with the latest technologies and are always interested in the right tool for the job, regardless of platform or stack. Expect to be able to work with React, TypeScript, .NET, .NET Core, Redis, SQL Server, Microsoft Azure, Amazon AWS, and more.
            
   \n "What you’ll be doing
            
   \n Building workflow management systems (e.g., helping our employees automate themselves)*
   \n Building connected services (e.g., integrating with providers like Twilio)**
   \n  Creating beautiful dashboards for both managers and staff**
   \n Understanding and optimizing our processes through data and analytics*
   \n What we offer
            
   \n We’re a small company focused on growth. You’ll be on the ground floor, in a position to influence our future and work directly with our leadership team. Additionally, we offer:
            
   \n Competitive pay
   \n High quality medical, dental, and vision coverage
   \n Brand new equipment
   \n  Private, quiet working environment
   \n About you
            
   \n We’re looking for a smart, eager developer who can learn on their feet and pay attention to the details. We don’t care about your exact experience if you’re the type of person who can learn and adapt quickly.
            
   \n We’d prefer you to have a BS in Computer Science or a similar technical field.
            
   \n Job Type: Full-time
            
   \n Salary: $70,000.00 to $90,000.00 /year`,
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
                },
                {
                    "_id": "5bf590130d05a31758434ce5",
                    "name": "express",
                    "required": true,
                    "niceToHave": true,
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
function submitCareerStrategyAPI(callbackFn, queryString) {

    if (queryString == "prospects")
        setTimeout(function(){ callbackFn(MOCK_JOB_PROSPECTS)}, 100);
    else if(queryString == "prospect") 
        setTimeout(function(){ callbackFn(MOCK_JOB_PROSPECTS.prospects[0])}, 100);

    /*
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
 

function displayProspectSummary(data) {
    let counter = 0;
    let skillHeader = '<div class="table flex-item"><div class="tr th"> <div class="td">Skill</div></div>';
    let prospects = skillHeader;
   
    if (data == null || data.prospects == null || data.prospects.length == 0) {
      $('#js-error-message').text("No job prospects found");
      $('#js-error-message').prop("hidden", false);
      return;
    }
      let thisProspect = data.prospects[0];         
        prospects +=
         `<div class="tr">  
            <div class="td" data-header="Skill"><a href=# id="masterSkill${counter}">${thisProspect.name}</a></div>
        </div>`;
          skillCount++; 
          counter++
          if (counter == 3)   
          {
            prospects += '</div>';
            prospects += skillHeader;
            counter = 0;
          }
       prospects += '</div>';       
  
      $('.js-prospect-summary').append(`${prospects}`);  
      $('.js-prospect-summary').prop("hidden", false); 
  } 

  function displayProspectsSummary(data) {
    let counter = 0;
    let skillHeader = '<div class="table flex-item"><div class="tr th"> <div class="td">Skill</div></div>';
    let prospects = skillHeader;
   
    if (data == null || data.prospects == null || data.prospects.length == 0) {
      $('#js-error-message').text("No job prospects found");
      $('#js-error-message').prop("hidden", false);
      return;
    }
  
      data.prospects.map( function(prospect) {          
        prospects +=
         `<div class="tr">  
            <div class="td" data-header="Skill"><a href=# id="masterSkill${counter}">${prospect.name}</a></div>
        </div>`;
          skillCount++; 
          counter++
          if (counter == 3)   
          {
            prospects += '</div>';
            prospects += skillHeader;
            counter = 0;
          }
       });
       prospects += '</div>';       
  
      $('.js-prospect-summary').append(`${prospects}`);  
      $('.js-prospect-summary').prop("hidden", false); 
  } 

function renderJobProspects(data) {
  $( ".js-slider-gallery" ).html('');

  let counter = 1; 
  let thumbs = "";

  data.prospects.map( function(prospect) {    
    const jobPosting = prospect.sourceUrl.length >0 
          ? `<a href='${prospect.sourceUrl}', _target=blank>${prospect.source}</a>`          
          : `${prospect.source}`;

     thumbs +=
      `<div class="flex-item">
          <span class="title">
            <span>${prospect.what}</span> </br>
            <span><em>${prospect.where}</em></span>  </br>
            <span>${prospect.dayToDay}</span>  </br>
            <span>${jobPosting}</span>  </br> 
            <span>${prospect.status}</span>  </br> 
            <span class="js-add-prospect"><strong>View details</strong></span> </br>             
          </span>            
      </div> `;  
      counter++; 
  });  

  if ( $(".flex-item").css("max-width") == "260px")  {
    $( ".js-slider-gallery" ).append(`<div>${thumbs}$</div>`);  
  }
  else {  
    $( ".js-slider-gallery" ).append(`${thumbs}`); 
  }
  $(".js-slider").prop("hidden", false);
} 


function renderJobProspect(prospect) {
    $( ".js-prospect-summary" ).html('');

    const jobPosting = prospect.sourceUrl.length >0 
        ? `<a href='${prospect.sourceUrl}', _target=blank>${prospect.source}</a>`          
        : `${prospect.source}`;

      let summary =
        `<div>
            <span class="title">
              <span><b>What:</b> ${prospect.what}</span> </br>
              <span><b>Where:</b> <em>${prospect.where}</em></span>  </br>
              <span><b>Day to day:</b> ${prospect.dayToDay}</span>  </br>
              <span><b>Source:</b> ${jobPosting}</span>  </br> 
              <span><b>Status:</b> ${prospect.status}</span>  </br>          
            </span>            
        </div> `; 
  
    if ( $(".flex-item").css("max-width") == "260px")  {
      $( ".js-prospect-summary" ).append(`<div>${summary}</div>`);  
    }
    else {  
      $( ".js-prospect-summary" ).append(`${summary}`); 
    }
    $(".js-prospect-summary").prop("hidden", false);    

  } 

function editJobProspect(prospect) {
    let formInputs = `
    <fieldset class="edit-form">
      <legend><h2>Job Prospect Summary</h2></legend>
     <p> <label for="what" class="edit-label"><strong>What: </strong></label> <input type="text" id="what" value="${prospect.what}" required /></p>
     <p> <label for="where" class="edit-label"><strong>Where: </strong></label>  <input  type="text"  id="where" value="${prospect.where}" /></p>
     <p> <label for="daytoday" class="edit-label"><strong>Day to day: </strong></label>  <input type="text"  id="daytoday" value="${prospect.dayToDay}" /></p>
     <p> <label for="source" class="edit-label"><strong>Source: </strong></label> <input type="text"  id="source" value="${prospect.source}" /></p>
     <p> <label for="status"  class="edit-label"><strong>Status: </strong></label>  <input type="text"  id="details" value=" ${prospect.status}" /></p>
     <p> <label for="details" class="edit-label"><strong>Details: </strong></label>  <input type="text"  id="status" value="${prospect.details}" /></p>
    </fieldset>`;

    $(".inputForm").html(formInputs);   
    $(".inputForm").prop("hidden", false);
    $(".js-edit-button").prop("hidden", false);    
    $(".js-prospect-summary").prop("hidden", true);
    
  } 
  
function updateJobProspect(prospect) {
    if (summaryEditsAreValid()) {
        prospect.what =  $('#what').val();   
        prospect.where = $("#where").val();
        prospect.daytoday = $("#daytoday").val();
        prospect.source = $("#source").val();
        prospect.details = $("#details").val();
        prospect.status = $("#status").val();
        
        $(".js-edit-prospect-form").prop("hidden", true);
        $(".js-edit-button").prop("hidden", true);
        $(".js-form").prop("hidden", true);
        refreshJobProspects(); 
      }
}
  
function summaryEditsAreValid(){
    return true;
}  


function editJobComments(prospect) {
    let formInputs = `
    <fieldset class="edit-form">
      <legend><h2>Edit Comments</h2></legend>
     <p> <label for="what" class="edit-label"><strong>What: </strong></label> <input type="text" id="what" value="${prospect.what}" required /></p>
     </fieldset>`;

    $(".inputForm").html(formInputs);   
    $(".inputForm").prop("hidden", false);
    $(".js-edit-button").prop("hidden", false);    
    $(".js-prospect-comments").prop("hidden", true);
    
  } 
  
function updateJobComments(prospect) {
    if (summaryEditsAreValid()) {
        prospect.what =  $('#what').val();   
        prospect.where = $("#where").val();
        prospect.daytoday = $("#daytoday").val();
        prospect.source = $("#source").val();
        prospect.details = $("#details").val();
        prospect.status = $("#status").val();
        
        $(".js-edit-prospect-form").prop("hidden", true);
        $(".js-edit-button").prop("hidden", true);
        $(".js-form").prop("hidden", true);
        refreshJobProspects(); 
      }
    }

function renderSkillsRequirements(prospect) {
    $( ".js-prospect-skills-contacts" ).html('');  
    let counter = 1; 
    let thumbs = "";
  
    let niceToHave = "";
    prospect.jobSkills.map( function(skill, index){
        niceToHave = skill.niceToHave ? " - nice to have" : "";
        let thumb =  
        `<div class="flex-item">
            <span class="skill-${counter}" role="title">${skill.name}${niceToHave}</span>                        
        </div> `; 
        thumbs += thumb;
        counter++;       
    })
   
    if ( $(".flex-item").css("max-width") == "260px")  {
      $( ".js-prospect-skills-contacts" ).append(`<div>${thumbs}</div>`);  
    }
    else {  
      $( ".js-prospect-skills-contacts" ).append(`${thumbs}`); 
    }
    $(".js-prospect-skills-contacts").prop("hidden", false);
  } 

   
function renderProspectComments(prospect) {
    $( ".js-prospect-comments" ).html('');  
    let counter = 1; 
    let thumbs = "";  
    
    function custom_sort(a, b) {
        return new Date(a.when).getTime() - new Date(b.commentDate).getTime();
    }
    const sortedComments = prospect.comments.sort(custom_sort);

    sortedComments.map( function(comment, index){ 
        let date = new Date(comment.commentDate);
        let formattedDate =  (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(); 
        let thumb =  
        `<div class="flex-item">        
            <p>${formattedDate}  <a id="editComment${counter}" href=#>edit</a></p>  
            <p>${comment.comment}</p>                        
        </div> `; 
        thumbs += thumb;
        counter++;       
    })
   
    if ( $(".flex-item").css("max-width") == "260px")  {
      $( ".js-prospect-comments" ).append(`<div>${thumbs}</div>`);  
    }
    else {  
      $( ".js-prospect-comments" ).append(`${thumbs}`); 
    }
    $(".js-prospect-comments").prop("hidden", false);
  } 

    
function renderProspectDetails(prospect) {
    $( ".js-prospect-details" ).html('');
    let thumbs = `<div>
        <p class="details">${prospect.details.replace('\n','<br>')}</p>                         
    </div> `; 
   
    if ( $(".flex-item").css("max-width") == "260px")  {
      $( ".js-prospect-details" ).append(`<div>${thumbs}</div>`);  
    }
    else {  
      $( ".js-prospect-details" ).append(`${thumbs}`); 
    }
    $(".js-prospect-details").prop("hidden", false);
  } 
  
function displayCareerStrategyResults(data, query) {  
  if (data == null || data.prospects == null || data.prospects.length == 0) {
        $('#js-error-message').text("No data found");
        $('#js-error-message').prop("hidden", false);
  }
  else { 
    renderJobProspects(data);
  }       
}

function displayJobProspectResults(data, query) {  
    if (data == null || data == null) {
        $('#js-error-message').text("No data found");
        $('#js-error-message').prop("hidden", false);
    }
    else { 
    renderJobProspect(data);
    renderSkillsRequirements(data);
    renderProspectComments(data);
    renderProspectDetails(data);
    }       
}
  
function refreshJobProspects() {       
    let query  = "prospects";
    //submitCareerStrategyAPI(displayCareerStrategyResults, query);
     query  = "prospect";    
    submitCareerStrategyAPI(displayJobProspectResults, query);
}

/*
    Disregard event edit when cancel button is clicked
*/
function watchCancelEventButtonClick() {       
  $('#cancelEvent').click(event => {  
    $(".js-edit-form").prop("hidden", true);
    $(".js-edit-event").prop("hidden", true);
    $(".js-search").prop("hidden", false);  
    $('.js-search-button').prop("hidden", false);
    location.hash = "bm-event";
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
    submitCareerStrategyAPI(updateJobProspect, "prospect"); 
  });  
}

function watchEditSummaryClick() {
    $('#editSummary').click(event => {
        event.preventDefault();    
        let query  = "prospect";    
        submitCareerStrategyAPI(editJobProspect, query);
    });  
}

function watchEditCommentsClick() {
    $('#editComments').click(event => {
        event.preventDefault();    
        let query  = "prospect";    
        submitCareerStrategyAPI(editJobComments, query);
    });  
}

function watchEditDetailsClick() {
    $('#editDetails').click(event => {
        event.preventDefault();    
        let query  = "prospect";    
        submitCareerStrategyAPI(editJobDetails, query);
    });  
}

function setupHandleEvents() {  
  refreshJobProspects(); 
  watchEditSummaryClick(); 
  watchEditCommentsClick();
  watchEditDetailsClick();
  watchSubmitEventButtonClick();
}

$(setupHandleEvents);