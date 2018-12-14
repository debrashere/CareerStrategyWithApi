'use strict'  
const CAREER_STRATEGY_URL ='https://sheltered-gorge-50174.herokuapp.com/api';
const pathUser = "user";
const pathUserProfile  = "userprofiles";
const pathSkills = "skills";
const pathJobProspects  = "prospects";
let userId = "";
let userProfileId = "";
let USER_PROFILE = {};
 
/*     
  Retrieve data from Career Strategy API
*/
function findCareerStrategyAPI(path, query, id,  callbackFn) {
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  const encodedQuery = encodeURIComponent(query);
  let url =  `${CAREER_STRATEGY_URL}/${path}`;
  url = id == "" ? url: `${url}/${id}/`;
  url = query == "" ? url: `${url}?${query}`;  
 
  const authToken = localStorage.getItem('token'); 
  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then(response => {
    if (response.ok) {  
      if (response.status == 204) {
        return null;
      }   
      return response.json();
    }
    else if (response.status == 401) {
      // Redirect the to the login page.
      location.href = "./login.html";
    }  
    throw new Error(response.statusText);
  })
  .then(responseJson => callbackFn(responseJson))
  .catch(error => {  
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  }); 
} 

/*     
  Post data via Career Strategy API
*/
function postCareerStrategyAPI(path, query, id, callback) {
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  let url =  `${CAREER_STRATEGY_URL}/${path}`; 
  const authToken = localStorage.getItem('token');

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',         
    data: JSON.stringify(query),
    headers: {
      "Authorization": `Bearer ${authToken}`
    },      
    success: callback,
    error:callback    
  });
}

/*     
  Update data via Career Strategy API
*/
function putCareerStrategyAPI(path, update, id, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  url = id == "" ? url: `${url}/${id}/`;
  const authToken = localStorage.getItem('token');

  $.ajax({
    url: url,
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',    
    data: JSON.stringify(update), 
    headers: {
      "Authorization": `Bearer ${authToken}`
    },     
    success: callback,
    error: callback     
  });  
} 
/*     
  Delete data via Career Strategy API
*/
function deleteCareerStrategyAPI(path, update, id, callback) {
  let url =  `${CAREER_STRATEGY_URL/api}/${path}/`;
  url = id == "" ? url: `${url}${id}/`;
  const authToken = localStorage.getItem('token');

  const settings = {
    url: url,
    data: update,
    dataType: 'json',
    type: 'DELETE',    
    headers: {
      "Authorization": `Bearer ${authToken}`
    },      
    success: callback,
    error:callback
  };
  $.ajax(settings);
}

/*     
  Check if API response returned an error and set error message
*/
function apiReturnedError(data) {
  if (data && data.responseJSON) {
    if (data.responseJSON.error)
    {
      $('#js-error-message').html(data.responseJSON.error);
      $('#js-error-message').prop("hidden", false);
      return true;
    }
    else {
      $('#js-error-message').html("Oops something went wrong. Please try again.");
      $('#js-error-message').prop("hidden", false);
      return true;
    }
  }
}

/*     
   render profile information (user name, email address, phone number)
*/
function renderUserProfile(data) {
  if (!data || !data.userProfile) {
    // do not display following until the user profile has been created
    $('.js-section-job-prospects').prop("hidden", true);    
    $('.js-section-job-prospects-header').prop("hidden", true);     
    return;
  }  
  let userProfile = data.userProfile[0];
  userId = userProfile.userId;

  $( ".js-user-skills" ).html('');
  $( ".js-user-profile" ).html(''); 

  let profileContent =  
    `<div class="flex-item">
          <div class="section-header"><em><span  tabindex="0">${userProfile.firstName} ${userProfile.lastName}</span></em> <a href=# class="js-edit-profile"><img alt="edit prospect" src="./images/icon-edit.png" /> (Edit)</a></div>
          <div> 
            <span  tabindex="0" class="user-profile-heading">${userProfile.email}</span>
            <span  tabindex="0" class="user-profile-heading">${userProfile.phone}</span>  
          </div>                     
    </div> `;   
    
  $('.js-user-profile').append(`${profileContent}`);  
  $('.js-user-profile').prop("hidden", false); 
  $('.js-flex-item-profile').prop("hidden", false); 

  watchEditUserProfile();
} 

/*     
   render user skills)
*/
function renderUserSkills(data) {
  if (!data || !data.userProfile) {
    // do not display following until the user profile has been created
    $('.js-section-user-skills').prop("hidden", true);
    $('.js-section-master-skills').prop("hidden", true);    
    return;
  }  
  // retrieve the user's profile and user id
  let userProfile = data.userProfile[0];; 

  // retrieve the user's profile id
  $('.js-section-user-skills').html('');
  let counter = 0;
  let skillHeader = `
  <div class="flex-item-skills">
    <div class="section-header"><h3 tabindex="0">Your Skills</h3></div>
    <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
    <div class="table">
      <div class="tr th"> 
        <div class="td">Skill</div> 
        <div class="td experience">Years</div>
        <div class="td"> </div>     
      </div>
      <div class="tr">  
        <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
        <div class="td" data-header="Experience"> <input type="text" id="skillYears"></input></div>
        <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add)</a></div>
      </div>
    </div>              
    <ul class="items flex-item-skillset">`;

  let skills = skillHeader;
       
   // if the user has any skills then format the html to display them
  if (userProfile.skills){
      userProfile.skills.map( function(skill) {          
      skills +=
       `<li class="item js-user-skillset"> 
          <span  tabindex="0" id="UserSkill-${counter}" class="js-user-skill js-user-skill-text" data-header="Skill">${skill.skill}</span>
          <span  tabindex="0" id="UserExp-${counter}" class="js-user-skill js-user-skill-years" data-header="Experience">${skill.yearsOfExperience}</span>
          <span  tabindex="0"><a id="EditSkill-${counter}" href=# class="js-edit-skill"><img alt="edit skill" src="./images/icon-edit.png" /></a></span>
          <span  tabindex="0"><a id="DeleteSkill-${counter}" href=# class="js-delete-skill"><img alt="delete skill" src="./images/icon-delete.png" /></a></span>           
        </li> `;
        counter++; 
     });
     skills += '</ul></div> ';     
    }
 
    // unhide the html to display the user skills
    $('.js-section-user-skills').append(skills);  
    $('.js-section-user-skills').prop("hidden", false); 
    $('.js-section-user-skills').prop("hidden", false); 
   
    watchAddSkillButtonClick();
    watchDeleteSkillButtonClick();
    watchEditSkillButtonClick(); 
} 

/*
  After find method is executed to retrieve the user profile
  check if data is returned, save the user profile to variable then render profile information
*/
function displayCareerStrategyResults(data) { 
  if (apiReturnedError(data)) return;

  if (!data || !data.userProfile || data.userProfile.length == 0) {
      $('.js-section-user-skills').prop("hidden", true); 
      displayUserProfileForm(null);
  }
  else {   
    USER_PROFILE = data.userProfile[0];
    userProfileId = USER_PROFILE.id;
    renderUserProfile(data);
    renderUserSkills(data);   
  }       
}

/*
  After find method is executed to find the master list of skills 
  if data is returned then setup html to display master list of skills  
*/
function displaySkillsMasterList(data) {
  if (apiReturnedError(data)) return;
  if (data == null || data.skill == null || data.skill.length == 0) {
    $('.js-section-master-skills').prop('hidden', true);
    return;
  }
  $('.js-section-master-skills').html('');
  $('.js-section-master-skills').prop('hidden', false);
  let counter = 0;
  let skillHeader = `
  <div flex-item>
    <div class="skills-header"><h3 tabindex="0">Master list of skills</h3> <em> (click on a skill to add it to your list of skills)</em></div>   
    <p flex-item-skills">`;
  let skills = skillHeader;
           
  data.skill.map( function(skill) {           
      skills +=  `<a href=# id="masterSkill${counter}" class="master-skill-link js-master-skill">${skill.skill}</a>`;     
      counter++; 
     });
     skills += '</p>';    
     
    $('.js-section-master-skills').append(`${skills}`);  
    $('.js-section-master-skills').prop("hidden", false); 

    watchAddMasterSkillButtonClick();   
}  

/*
  After API find method is executed to retrieve collection of job prospects
  this function is executed to format the html to display the skills requested for the job
*/
function generateJobSkills(skills) { 
  let skillset = ""; 
  if (skills && skills.length > 0) {
      skills.map( function(skillObj) {          
        skillset += `<span tabindex="0" class="job-skill">${skillObj.skill}</span> `;
    });
  }
  return skillset.length > 0 
    ? `<div class="td"><p><em>Job Skills:</em> ${skillset}</p></div>`
    : "";
}

/*
  After API find method is executed to retrieve collection of job prospects
  this function is executed to format the html to display the job prospect details
*/
function renderJobProspects(data) {
    if (apiReturnedError(data)) return;

    // if no data found then display the input form for job prospect 
    if (data == null || data.prospect == null || data.prospect.length == 0) {
      if (userProfileId.length > 0)
        displayProspectsSummaryForm()
      return;
    }  

    $( ".js-section-job-prospects" ).html('');

    let counter = 0;       
    let prospects = "";

    data.prospect.map( function(prospect) {  
      let dateWhen = new Date(prospect.when);
      let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
       ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;     
      let jobSkills = generateJobSkills(prospect.jobSkills)    ;
      prospects +=
       `<div class="flex-item-job-prospect">
            <div class="section-header"><span  tabindex="0" id="prospect${counter}">${prospect.what}</span>  <br />
                    <a id="ProspectEdit-${counter}" href=# class="js-edit-prospect"><img alt="edit prospect" src="./images/icon-edit.png" />  (edit)</a>   
                    <a id="ProspectDelete-${counter}" href=# class="js-delete-prospect"><img alt="delete prospect" src="./images/icon-delete.png" /> (delete)</a>  </div>
            <div class="td"><span tabindex="0"><em>Where:</em> ${prospect.where}</span></div>            
            <div class="td"><span tabindex="0"><em>When: </em>${formattedDate}</span></div>
            <div class="td"><span tabindex="0"><em>Status:</em> ${prospect.status}</span></div>          
            <div class="td"><span tabindex="0"><em>Source:</em> ${prospect.source}</span></div>    
            <div class="td"><span tabindex="0"><em>Source Url:</em> <a href='${prospect.sourceUrl}' target=_blank>${prospect.sourceUrl}<a></span></div>              
            <div class="td"><em>Contacts:</em><p tabindex="0">${prospect.contact}</p></div>            
            <div class="td"><em>Comments:</em><p tabindex="0">${prospect.comments}</p></div>  
            <div class="td"><em>Details:</em><p tabindex="0">${prospect.details}</p></div> 
            <div class="td"><span tabindex="0"><em>Day to day:</em> ${prospect.dayToDay}</span></div>                                                  
            ${jobSkills}
            <div class="td" hidden><span id="Prospect-${counter}" hidden>${prospect.id}</span></div>
      </div>
      `; 
       counter++;       
     });    

    $('.js-section-job-prospects').append(`${prospects}`);  
    $('.js-section-job-prospects').prop("hidden", false); 
    $('.js-section-job-prospects-header').prop("hidden", false); 
        
    watchEditJobProspectClick();
    watchAddJobProspectClick();
    watchDeleteJobProspectClick();
}

/*
  Format the html to display the form to input data to edit or create user profile
*/
function displayUserProfileForm(data) { 
  $('.js-edit-profile-form').html('');
 
    // set user profile json variable with default empty values
    let hiddenProfileId = "";
    let profile = {      
      "firstName": "",
      "lastName": "",      
      "email": "",    
      "phone": ""
    }; 

    // if user clicked edit button to edit existing user profile data then set user json variable with that data
    if (data && data.userProfile.length > 0) {
      profile = data.userProfile[[0]];
      hiddenProfileId = `<label for="ProfileEditKey" class="edit-label"></label><div class="td" hidden><input id="ProfileEditKey" type="text"value=${profile.id} hidden></input></div>`;       
    }

    // format the form html
    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2 tabindex="0">User Profile</h2></legend>
        <p> <label for="profileFirst" class="edit-label"><strong>First Name: </strong></label> <input type="text" id="profileFirst" value="${profile.firstName}" aria-required="true" required /></p>    
        <p> <label for="profileLast" class="edit-label"><strong>Last Name: </strong></label>  <input   type="text"  id="profileLast" value="${profile.lastName}" aria-required="true" required /></p>
        <p> <label for="profileEmail" class="edit-label"><strong>Email: </strong></label>  <input   type="text"  id="profileEmail" value="${profile.email}" aria-required="true" required /></p>
        <p> <label for="profilePhone" class="edit-label"><strong>Phone: </strong></label>  <input   type="text"  id="profilePhone" value="${profile.phone}" /></p>
        ${hiddenProfileId}
      </fieldset>`;

    // display the form
    $(".js-edit-profile-form").html(formInputs);   
    $(".js-edit-profile-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);    
} 

/*
  Validate the input data from the user profile form
*/
function validateProfileForm(profileId) {
    const errors = profileEditsAreValid();
    if (errors != "") {
      $('#js-error-message').html(errors);
      $('#js-error-message').prop("hidden", false);
      return;
    } 

    userId = localStorage.getItem('userId');  
    if (!userId || userId.length == 0) {
      location.href = "./login.html";
    }
    const firstName = $('#profileFirst').val();  
    const lastName =  $('#profileLast').val();  
    const email =  $('#profileEmail').val(); 
    const phone =  $('#profilePhone').val(); 
    let userProfile = ""; 

    if (profileId && profileId != undefined) {
      // update the user profile document for this user
      userProfile = `{"id": "${profileId}", "firstName": "${firstName}", "lastName": "${lastName}", "email": "${email}", "phone": "${phone}"}`; 
      setTimeout(putCareerStrategyAPI(pathUserProfile, 
        JSON.parse(userProfile), profileId, refreshUserProfile),  3000);
    }
    else{        
      // create the user profile document for this user  
      userProfile = `{"firstName": "${firstName}","lastName": "${lastName}","email": "${email}", "phone": "${phone}", "userId": "${userId}" }`;    
      setTimeout(postCareerStrategyAPI(pathUserProfile, 
        JSON.parse(userProfile), "", function(data){
          if (data && data.id) {
            userProfileId = data.id;                     
            refreshUserProfile(userProfileId); 

            $(".js-edit-profile-form").prop("hidden", true);
            $(".js-form").prop("hidden", true); 
          }
          else if (data.responseJSON.error)
          {
            $('#js-error-message').html(data.responseJSON.error);
            $('#js-error-message').prop("hidden", false);
          }
          else {
            $('#js-error-message').html("Oops something went wrong. Please try again.");
            $('#js-error-message').prop("hidden", false);
          }
            
      }), 3000);
    }             
}

/*
  Display the job prospect form to edit or create job prospect
*/
function displayProspectsSummaryForm(data) { 
  $('.js-job-prospects-form').html();
 
    // create json variable with default empty values for creating a new job prospect
    let hiddenProspectId = "";
    let prospect = { 
      "id": "",     
      "what": "",
      "where": "",  
      "when": "",    
      "status": "",
      "source": "",
      "sourceUrl": "",
      "dayToDay": "",
      "contact": "",
      "comments": "",
      "details": "",
    }; 
 
    // If user clicked edit for an existing job prospect then save the id for that prospect in hidden form element 
    if (data && data != undefined) {
      prospect = data.prospect;
      hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
    }

    // Format the input form for job prospect
    let formInputs = `
      <fieldset class="edit-form">
        <legend>>Job Prospect</h2></legend>
          <p> <label for="prospectWhat" class="edit-label"><strong>What: </strong></label> <input type="text" id="prospectWhat" value="${prospect.what}" aria-required="true" required /></p>    
          <p> <label for="prospectWhere" class="edit-label"><strong>Company: </strong></label>  <input   type="text"  id="prospectWhere" value="${prospect.where}" aria-required="true" required /></p>
          <p> <label for="prospectWhen" class="edit-label"><strong>When: </strong></label>  <input type="datetime"  role="datetime" id="prospectWhen" value="${prospect.when}" aria-required="true" required /></p>                   
          <p> <label for="prospectStatus"  class="edit-label"><strong>Status: </strong></label>  <input type="text"  id="prospectStatus" value=" ${prospect.status}" /></p>    
          <p> <label for="prospectSource" class="edit-label"><strong>Source: </strong></label>  <input   type="text"  id="prospectSource" value="${prospect.source}" /></p>
          <p> <label for="prospectSourceUrl" class="edit-label"><strong>Source Url: </strong></label>  <input   type="text"  id="prospectSourceUrl" value="${prospect.sourceUrl}" /></p>
          <p> <label for="prospectDayToDay" class="edit-label"><strong>Day to Day: </strong></label>  <textarea   rows="4" cols="50" id="prospectDayToDay" value="${prospect.dayToDay}" >${prospect.dayToDay}</textarea></p>
          <p> <label for="prospectContacts" class="edit-label"><strong>Contacts : </strong></label>  <textarea   rows="2" cols="50"  id="prospectContacts" value="${prospect.contact}" >${prospect.contact}</textarea></p>
          <p> <label for="prospectComments" class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50"  id="prospectComments" value="${prospect.comments}" >${prospect.comments}</textarea></p> 
          <p> <label for="prospectDetails"  class="edit-label"><strong>Details: </strong></label>  <textarea   rows="4" cols="50"   id="prospectDetails" value=" ${prospect.details}" >${prospect.details}</textarea></p>    
          ${hiddenProspectId}
      </fieldset>`;      

    // display the job prospect form
    $(".js-job-prospects-form").html(formInputs);   
    $(".js-job-prospects-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);   
    $(".js-section-job-prospects-header").prop("hidden", false);    
} 

/*
  when page initially loads and after updates this function is called to refresh the page
*/
function refreshUserProfile(id) {  
  // get the user id that's created in local storage after the user successfully logs in
  // this id is used to find the user profile and job prospects for this particular user   
  userId = localStorage.getItem('userId');    
  if (!userId || userId.length == 0) {
    location.href = "./";
  }
      const queryPath = `userId=${userId}`;
      setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , displayCareerStrategyResults)
      , 3000);
            
      setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "", renderJobProspects)
     , 3000);          

    findCareerStrategyAPI(pathSkills, "",  "", displaySkillsMasterList);
    $(".js-form").prop("hidden", "true");
    $(".js-edit-form").prop("hidden", "true");     
} 

/*
   Validate data entered in the job prospect form
*/
function prospectEditsAreValid() {
  let message = "";
  const what =  $('#prospectWhat').val();  
  const when =  $('#prospectWhen').val();  
  const where = $('#prospectWhere').val(); 

  if (!what || what.trim().length == 0)
    message += "What is required <br/>";

  if (!when || when.trim().length == 0)
    message += "When is required <br/>";

  if (!where || where.trim().length == 0)
    message += "Where is required";  

  return message;
}

/*
  Check if the data input from the user profile form are valid
*/
function profileEditsAreValid() {
  let message = "";
  const firstName =  $('#profileFirst').val();  
  const lastName =  $('#profileLast').val();  
  const email =  $('#profileEmail').val();  

  if (!firstName || firstName.trim().length == 0)
    message += "First name is required <br/>";

  if (!lastName || lastName.trim().length == 0)
    message += "Last name is required <br/>";
  
  if (!email || email.trim().length == 0)
    message += "Email is required";    

  return message;
}

/*
  Retrive the input from the job prospect form and 
*/
function validateProspectForm(prospectId) {
  const errors = prospectEditsAreValid();
  // show error message if the form input is not  valie
  if (errors != "") {
    $('#js-error-message').html(errors);
    $('#js-error-message').prop("hidden", false);
    return;
  } 
    const what =  $('#prospectWhat').val();  
    const when =  $('#prospectWhen').val();  
    const where = $('#prospectWhere').val(); 
    const status =  $('#prospectStatus').val();  
    const source =  $('#prospectSource').val(); 
    const sourceUrl =  $('#prospectSourceUrl').val();
    const dayToDay =  $('#prospectDayToDay').val();
    const contacts =  $('#prospectContacts').val();
    const comments =  $('#prospectComments').val();
    const details =  $('#prospectDetails').val(); 
  
    // Creating new job prospect
    if (!prospectId || prospectId == undefined) {
    const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contact":  "${contacts}", "comments":  "${comments}", "details":   "${details}"}`;          
    setTimeout(postCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), userProfileId, function(data){  
        refreshUserProfile();
      }), 3000);  
  }
  else{ 
    // Updating existing job prospect
    const jobProspect = `{"id":"${prospectId}","what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}"}`;  
    setTimeout(putCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), prospectId, function(data){       
        refreshUserProfile();
    }), 3000);
  }    
      
  $(".js-job-prospects-form").prop("hidden", true);
  $(".js-form").prop("hidden", true);      
} 

/*
  Executed when user clicks on edit button for the user profile
  Will execute the API find method for the user profile data and call method to display the input form
*/
function  watchEditUserProfile() {       
  $('.js-edit-profile').click(event => {  
    event.preventDefault();  
    userId = localStorage.getItem('userId');
    const queryPath = `userId=${userId}`;
    setTimeout( findCareerStrategyAPI(pathUserProfile, queryPath, "", displayUserProfileForm), 5000);     
  }); 
}

/*
   Checks the input for errors when adding a user skills
*/
function userSkillsAreValid() { 
  let message = "";
  const skill = $('#newSkill').val();
  const years = $('#skillYears').val();  
  if (!skill || skill.length < 1) {
    message = "Skill is required. <br />";
  }
  if (!years || years.length <= 0) {
    message += "Years of Experience is required. <br />";
  }  
  if ( !$.isNumeric(years) ) {
    message += "Years of experience must be numeric.";
  }

  return message;
}

/*
  Executed when user clicks on add skill link 
  will update the user's collection of skills
*/
function  watchAddSkillButtonClick() {       
  $('.js-add-skill').click(event => {  
      event.preventDefault();
      let skill = $('#newSkill').val();
      let years = $('#skillYears').val(); 

      if (userSkillsAreValid().length > 0) {
        $('#js-skills-error-message').html(userSkillsAreValid());
        $('#js-skills-error-message').prop("hidden", false);
        return;
      }

      if (!USER_PROFILE.skills) {
        USER_PROFILE.skills = []
      }
      USER_PROFILE.skills.push(JSON.parse(`{"skill": "${skill.trim()}","yearsOfExperience":"${years.trim()}"}`));       
      const userSkills = `{"id": "${userProfileId}","skills": ${JSON.stringify(USER_PROFILE.skills)}}`;                         

      setTimeout(putCareerStrategyAPI(pathUserProfile, JSON.parse(userSkills), userProfileId, function(data) {                        
         refreshUserProfile();   
        // Clear out the input fields
        $('#newSkill').html();
        $('#skillYears').html(); 
        $(".js-form").prop("hidden", true); 
      }), 3000);                                     
    });  
} 

/*
  Executed when user clicks on link to add a new job prospect
  will call function to display the input form
*/
function watchAddJobProspectClick(){
  $('.js-add-prospect').click(event => {  
    event.preventDefault();
    displayProspectsSummaryForm(); 
   }); 
}

/*
  Executed when user clicks on link to edit an existing job prospect
  will call function to display the input form with current data 
*/
function watchEditJobProspectClick(){
  $('.js-edit-prospect').click(event => {  
    event.preventDefault();
    const id = `#${event.currentTarget.id}`; 
    const prospectId =`#Prospect-${id.split('-')[1]}`;
    const prospectKey = $(prospectId).text();

    setTimeout( findCareerStrategyAPI(pathJobProspects, "", prospectKey,
     displayProspectsSummaryForm), 5000);     
  }); 
}

/*
  Executed when user clicks on link to delete a job prospect
  will call API delete method to remove the job prospect
*/
function watchDeleteJobProspectClick(){
  $('.js-delete-prospect').click(event => {  
    event.preventDefault();
    const id = `#${event.currentTarget.id}`; 
    const prospectId =`#Prospect-${id.split('-')[1]}`;
    const prospectKey = $(prospectId).text();
    setTimeout(deleteCareerStrategyAPI(pathJobProspects, "", prospectKey, refreshUserProfile), 5000);     
  }); 
}

 
function  watchAddMasterSkillButtonClick() {       
  $('.js-master-skill').click(event => {  
      event.preventDefault();
      const id = `#${event.currentTarget.id}`; 
      let skill = $(id).text();
              
      // setup the skill input field
      $("#newSkill").val(skill);
      $("#skillYears").val("");                                
    });  
} 

/*
  Executed when user clicks link to edit and existing user skill
  will put the existing skill data in the input fields for the user to edit
*/
function  watchEditSkillButtonClick() {       
  $('.js-edit-skill').click(event => {  
      event.preventDefault();
      const id = `#${event.currentTarget.id}`; 
      const skillId =`#UserSkill-${id.split('-')[1]}`;
      const expId =`#UserExp-${id.split('-')[1]}`;
      let skill = $(skillId).text();  
      let experience = $(expId).text();  

      // setup the skill input field
      $("#newSkill").val(skill);
      $("#skillYears").val(experience);  
    
    });  
}

/*
  Executed when user clicks link to delete an existing user skill
  will remove the skill from the user's collection of skills
  and call the API put method to update the database
*/
function  watchDeleteSkillButtonClick() {       
  $('.js-delete-skill').click(event => {  
      event.preventDefault();
      const id = `#${event.currentTarget.id}`; 
      const skillId =`#UserSkill-${id.split('-')[1]}`;
      let skill = $(skillId).text();
      let skillIndex = -1;
      
      for(let idx=0; idx< USER_PROFILE.skills.length ; idx++)
      {
          if (USER_PROFILE.skills[idx].skill == skill) {
          skillIndex = idx;
          break;
         }
      }
      USER_PROFILE.skills.splice( $.inArray(skillIndex, USER_PROFILE.skills), 1 );      
      const userSkills = `{"id": "${userProfileId}","skills": ${JSON.stringify(USER_PROFILE.skills)}}`;                         
      
      setTimeout(putCareerStrategyAPI(pathUserProfile, JSON.parse(userSkills), function(data) {                  
        refreshUserProfile()}), 3000);
    });  
}

/*
  Executed when user clicks the submit button for user profile form or job prospect form
  will call the correct function to complete the validation of inputs and submit the updates
*/
function watchFormSubmitButtonClick() { 
  $('#submitEvent').click(event => {
    event.preventDefault();  
    const id = `#${event.currentTarget.id}`; 
    $(".js-edit-form:visible").each(function() {     
      const formId = $( this ).attr('id')         
      switch (formId) {
        case "editProfile":{          
          const profileKey = $('#ProfileEditKey').val();
            validateProfileForm(profileKey);
            break;}
        case "editProspect": {     
          const prospectKey = $('#ProspectEditKey').val();
            validateProspectForm(prospectKey);
            break; }
        }       
    });    
  });  
}

/*
  Executed when user clicks the cancel button for user profile form or job prospect form
  will close the form
*/
function watchFormCancelClick() { 
  $('#cancelEvent').click(event => {
    event.preventDefault();  
    $(".js-form").prop("hidden", "true");
    $(".js-edit-form").prop("hidden", "true"); 
    $('#js-error-message').empty();
    $('#js-error-message').prop("hidden", true);      
  });  
}

function setupHandleEvents() {  
  refreshUserProfile();   
  watchEditUserProfile();
  watchAddSkillButtonClick();
  watchAddMasterSkillButtonClick();
  watchDeleteSkillButtonClick();
  watchEditSkillButtonClick();
  watchFormSubmitButtonClick();
  watchEditJobProspectClick();
  watchDeleteJobProspectClick();
  watchAddJobProspectClick();
  watchFormCancelClick();
}

$(setupHandleEvents);