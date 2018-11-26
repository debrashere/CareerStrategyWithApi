'use strict'

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


const CAREER_STRATEGY_URL = 'http://localhost:8080/api';

/*    
  Retrieve data from Career Strategy API
*/
function submitCareerStrategyAPI(callbackFn, queryString) {

    setTimeout(function(){ callbackFn(MOCK_COMPANIES)}, 100);

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
  .then(responseJson => displayCareerStrategyResults(responseJson, queryString))
  .catch(error => {
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  }); 
  */
} 
 
/*    
  create elements to dipslay event details (event name, host and location)
*/
function generateJobProspectDetails() {
  let eventDetails = `
    <div class="host">
      <h2>Event: ${EVENT.name}</h2> <a  tabindex="0" aria-label="Edit event details such as host name and location of event" class="edit-link js-edit" alt="edit event details" id="EditHost" href=#>edit</a>
     </div>
    <div class="host">
      <div  class="eventLocation"><strong tabindex="0" aria-label="Host name">Host: <span tabindex="0"> ${EVENT.host}</span></strong></div>
    </div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Date of the event">Date: </strong> <span tabindex="0"  id="event-date" class="js-event-date"> ${EVENT.date}</span></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Location name of the event">Location: </strong> <span tabindex="0" id="event-location" class="js-event-location"> ${EVENT.location}</span></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Address of the event">Address: </strong>  <address  tabindex="0"  id="event-address" class="js-event-address">${EVENT.address1}, ${EVENT.city}, ${EVENT.state} ${EVENT.zip}</address></div>
    <div  class="eventLocation"><strong tabindex="0" aria-label="Start time of the event">Start time:</strong><span  tabindex="0" id="event-startTime"> ${EVENT.startTime}</span></div>`;
    $(".js-event-hosts").html(eventDetails);
    watchEditLinkClick();
}
 
/*
  Generate display when name left to the menu item is clicked.
  Menu display will switch to display only menu items for the name selected.
  This would be the items this attendee is responsible for.
*/
function showJobProspectDetails(thisContributor) {
  let description = thisContributor === "Open"
      ? "Menu items not selected"
      : `Menu items for  ${thisContributor}`;
  let menuDivs = `<div class="menuHeader contributor-menuHeader"><h2>${description}</h2> 
                <a id="showMenu" aria-label="Show full menu" href="#" class="show-menu js-edit js-show-menu"> Show full menu</a></div>`;
  let courseName = "";
  let matchedCourses = [];

  /* find all courses where "thisContributor" is assigned to any menu items  */
   MENU.courses.map( function (thisCourse) {       
    jQuery.each( thisCourse.menuItems, function( i, menuItems ) {
      if ( menuItems.contributors.filter( c => c.contributor == `${thisContributor}`)
        .length > 0 && courseName == "") {  
         matchedCourses.push(thisCourse); 
         courseName = thisCourse.course;
        }    
      });
      courseName = "";
    });

    matchedCourses.map( function(courses) {
      menuDivs += `
      <div class="col">
        <div class="courseAndMenu"> 
          <div class="course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3></div><div class="menuItems">`;    
      courses.menuItems.map( function (menuItems) {  
        menuItems.contributors.filter( c => c.contributor == `${thisContributor}`)
        .map( function(contributors) {                
            menuDivs+= `<p tabindex="0" class="menuItem js-menuItem" aria-label="${courses.course} menu item ${menuItems.menuItem} " >${menuItems.menuItem}</p>`;                         
        });     
      });
      menuDivs += "</div></div></div>";
    });   

  $(".js-menu").html(`<div class="menuItems js-menuItems">${menuDivs}</div>` ); 
  watchEditLinkClick();
} 
 
/*
  Generate the links that appear within the recipe search results, when clicked will
  add the recipe to the menu
*/
function generateProspectsLinks(recipeId) {  
  let coursesOption = "";
  MENU.courses.map( function(courses) {
   coursesOption+=`<a class="add-recipe-to js-add-recipe-to" id="add-${courses.course}-${recipeId}" href=#>${courses.course}</a>, `;   
  });
  return coursesOption.substring(0, coursesOption.length-2);
}

/*
  Using the results from the recipe search, render the results
*/
function renderJobProspect(data) {
  console.log("renderJobProspect", "start") ;
  console.log("renderJobProspect data.prospects", data.prospects) ;
  console.log("renderJobProspect data.prospects.prospects", data.prospects.prospects) ;

  $( ".js-slider-gallery" ).html('');

  let slideCount = 1; 
  let leftArrow  = '<div class="Aligner"><div class="Aligner-item-arrow"><a href="#"class="paging-icon js-page-prev" alt="Previous"><img src="images/icon-arrow-left.png" alt="left arrow page previous" /></a></div></div>';
  let rightArrow = '<div class="Aligner"><div class="Aligner-item-arrow"><a href="#" class="paging-icon js-page-next" alt="Previous"><img src="images/icon-arrow-right.png" alt="righ arrow page next" /></a></div></div>';
  let thumbs = "";

  console.log("renderJobProspect", "data.prospect.map") ;

  data.prospects.map( function(prospect) {    
    const prospectId = `prospect${slideCount}`;
    const jobPosting = prospect.sourceUrl.length >0 
          ? `<a href='${prospect.sourceUrl}', _target=blank>${prospect.source}</a>`          
          : `${prospect.source}`;
    //const coursesLinks = generateProspectsLinks(prospect.links);
    let thumb =  
      `<div class="flex-item">
          <span class="title">
            <span class="recipejs-${prospectId}" role="title">${prospect.what}</span> </br>
            <span><em>${prospect.where}</em></span>  </br>
            <span>${prospect.dayToDay}</span>  </br>
            <span>${jobPosting}</span>  </br> 
            <span>${prospect.status}</span>  </br> 
            <span class="js-add-prospect"><strong>View details</strong></span> </br>             
          </span>            
      </div> `; 
      console.log("renderJobProspect thumb", thumb) ;
      thumbs += thumb;
      slideCount++; 
  });  

  if ( $(".flex-item").css("max-width") == "260px")  {
    $( ".js-slider-gallery" ).append(`<div>${leftArrow}${thumbs}${rightArrow}</div>`);  
  }
  else {  
    $( ".js-slider-gallery" ).append(`${leftArrow}${thumbs}${rightArrow}`); 
  }
  console.log("renderJobProspect js-slider-gallery", $( ".js-slider-gallery" ).html()) ;
  $(".js-slider").prop("hidden", false);
 // watchAddLToLinkClick(); 
} 

/*
  Execute the Recipe API and check for invalid results
  If results returned the execute functions to render the results
*/
function displayCareerStrategyResults(data, query) {  
  console.log("displayCareerStrategyResults data", data );
  console.log("displayCareerStrategyResults data.prospects", data.prospects) ;
  console.log("displayCareerStrategyResults data.prospects[0]", data.prospects[0]) ;
  if (data == null || data.prospects == null || data.prospects.length == 0) {
        $('#js-error-message').text("No recipes found");
        $('#js-error-message').prop("hidden", false);
  }
  else { 
    renderJobProspect(data);
  }       
}
 
/*
    Create the form to edit the host name and event location
*/
  function showEditForm() {
    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>Host details and event name</h2></legend>
       <p> <label for="eventName" class="edit-label"><strong>Event Name: </strong></label> <input type="text" id="eventName" value="${EVENT.name}" required /></p>
       <p> <label for="eventDate" class="edit-label"><strong>Event Date: </strong></label>  <input role="datetime" type="datetime"  id="eventDate" value="${EVENT.date}" /></p>
       <p> <label for="eventLocation" class="edit-label"><strong>Location: </strong></label>  <input type="text"  id="eventLocation" value="${EVENT.location}" /></p>
       <p> <label for="hostName" class="edit-label"><strong>Host Name: </strong></label> <input type="text"  id="hostName" value="${EVENT.host}" /></p>
       <p> <label for="address1"  class="edit-label"><strong>Address: </strong></label>  <input type="text"  id="address1" value=" ${EVENT.address1}" /></p>
       <p> <label for="city" class="edit-label"><strong>City: </strong></label>  <input type="text"  id="city" value="${EVENT.city}" /></p>
       <p> <label for="state" class="edit-label"><strong>State: </strong></label>  <input type="text"  id="state" value="${EVENT.state}" /></p>
       <p> <label for="zip" class="edit-label"><strong>Zip: </strong></label> <input type="text"  id="zip" value=" ${EVENT.zip}" /></p>
       <p> <label for="startTime" class="edit-label"><strong>Start Time: </strong></label>  <input type="text"  id="startTime" value="${EVENT.startTime}" /></p>
      </fieldset>`;

      $(".js-edit-event-form").html(formInputs);   
      $(".js-edit-event").prop("hidden", false);
      $(".js-search").prop("hidden", true);      
      $('.js-search-button').prop("hidden", true);
      $("#eventName").prop('required',true);
  }

  /*
    Validation of event edits. Currently only required field is event name
*/
  function eventEditsAreValid() { 
    $('#js-error-message').text("");
    if ( $('#eventName').val() == null || $('#eventName').val().length == 0) {
       $('#js-error-message').text("Event Name is required");
       $('#js-error-message').prop("hidden",false);    
    }
      return  $('#js-error-message').text().length == 0;
  }

/*
    Function to update EVENT object with edits from the user
*/
function updateJobDetails() {       
  if (eventEditsAreValid()) {
    EVENT.name =  $('#eventName').val();   
    EVENT.data = $("#eventDate").val();
    EVENT.location = $("#eventLocation").val();
    EVENT.hostName = $("#hostName").val();
    EVENT.address1 = $("#address1").val();
    EVENT.city = $("#city").val();
    EVENT.state = $("#state").val();
    EVENT.zip = $("#zip").val();
    EVENT.startTime = $("#startTime").val();
    $(".js-search").prop("hidden", false);  
    $('.js-search-button').prop("hidden", false);
    generateJobProspectDetails(); 
    $(".js-edit-event").prop("hidden", true);
    $(".js-edit-form").prop("hidden", true);
    location.hash = "bm-event";
  }
}
  
function refreshJobProspects() {       
    $( ".thumbs" ).html("");
    $( ".slide" ).html("");
    $(".js-slider").prop("hidden", true); 
    //const query = $(".js-query").val();
    const query  = "prospects";
    submitCareerStrategyAPI(displayCareerStrategyResults, query);
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


/*
    Create the menu section 
*/
function generateJobProspects() {
  let index = 1;   
  let classes = "";
  let menuDivs = '';
  let contributorSpan = "";
  $(".js-menu").html(''); 

  MENU.courses.forEach( function(courses, index) {
    menuDivs += `
    <div class="flex-item"> 
      <div class="course"><h3 class="menu-course" id="bm-${courses.course}">${courses.course}</h3></div><div class="menuItems">`;    
    courses.menuItems.map( function (menuItems) { 
      menuItems.contributors.map( function(contributors) {    
        contributors.contributor === "Open" 
        ? classes = "contributor noContributor js-edit js-contributor"
        : classes = "contributor js-edit js-contributor";
        contributorSpan += `  <a href="#" aria-label="Show menu items that ${contributors.contributor} will contribute to ${courses.course}" id="conDetails-${contributors.contributor}-${index}" class="${classes}" alt="Next">${contributors.contributor}</a>`;
        index++;
      });          
      menuDivs += `<p tabindex="0" class="menuItem js-menuItem" aria-label="${courses.course} menu item ${menuItems.menuItem} " >${menuItems.menuItem} ${contributorSpan} </p>`        
      contributorSpan = "";                         
    });
  menuDivs += "</div></div>";
  });   
  $(".js-menu").html(`${menuDivs}` ); 
  watchEditLinkClick(); 
}  

 

/*
  Handle event when edit link next to event name is clicked
*/
function watchEditLinkClick() {       
  $('.js-edit').click(event => {
    event.preventDefault();  
    const editItem = event.currentTarget.id; 
    if (editItem == "EditHost") {
       showEditForm();
    }
    else if  (editItem =="showMenu") {    
      generateJobProspects();   
    }
    else if  (editItem.substring(0, 10) == "conDetails") {    
      showJobProspectDetails(editItem.split('-')[1]);    
    }
  });  
}

/*
   Handle for when course name link is clicked from the recipe result 
*/
function watchAddLToLinkClick() {       
  $(".js-add-recipe-to").click(function(event) { 
    event.preventDefault();
    andLinkToJobProspect(`${event.currentTarget.id}`);
  });  
}

function watchSearchButtonClick() {       
  $('.js-search-button').click(event => {
    event.preventDefault();
    $( ".thumbs" ).html("");
    $( ".slide" ).html("");
    $(".js-slider").prop("hidden", true); 
    food2Fork_data.page = 0;
    const query = $(".js-query").val();
    submitAPIForRecipes("displayCareerStrategyResults",query);
  });  
}

function watchSubmitEventButtonClick() {       
  $('#submitEvent').click(event => {
    event.preventDefault();  
    updateJobDetails();
  });  
}
function setupHandleEvents() {  
  refreshJobProspects();  
  /*
  watchSubmitEventButtonClick();
  watchResetEventButtonClick();
  watchCancelEventButtonClick();
  watchSearchButtonClick(); 
  watchEditLinkClick(); 
  watchAddLToLinkClick();
  */
}

$(setupHandleEvents);