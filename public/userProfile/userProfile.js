'use strict'  
const CAREER_STRATEGY_URL = 'http://localhost:8080/api';
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
 
  console.log("findCareerStrategyAPI final url", url);
  const authToken = localStorage.getItem('token');  
  console.log("findCareerStrategyAPI authToken", authToken);

  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer' + authToken
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
      location.href = "../login.html";
    }  
    throw new Error(response.statusText);
  })
  .then(responseJson => callbackFn(responseJson))
  .catch(error => {  
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  }); 
} 

function postCareerStrategyAPI(path, query, id, callback) {
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  let url =  `${CAREER_STRATEGY_URL}/${path}`;
 
  console.log("postCareerStrategyAPI final url", url);
  const authToken = localStorage.getItem('token');
  console.log("postCareerStrategyAPI authToken", authToken);
  console.log("postCareerStrategyAPI authToken", query);

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',         
    data: JSON.stringify(query),
    headers: {
      "Authorization": `'Bearer '+ ${authToken}`
    },      
    success: callback,
    error:callback    
  });
}

function putCareerStrategyAPI(path, update, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  url = userProfileId == "" ? url: `${url}${userProfileId}/`;
  const authToken = localStorage.getItem('token');

  $.ajax({
    url: url,
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',    
    data: JSON.stringify(update), 
    headers: {
      "Authorization": `'Bearer '+ ${authToken}`
    },      
    success: callback,
    error: callback     
  });  
} 

function deleteCareerStrategyAPI(path, update, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  url = userProfileId == "" ? url: `${url}${userProfileId}/`;
  const authToken = localStorage.getItem('token');

  console.log("deleteCareerStrategyAPI final url", url);
  const settings = {
    url: url,
    data: update,
    dataType: 'json',
    type: 'DELETE',    
    headers: {
      "Authorization": `'Bearer '+ ${authToken}`
    },      
    success: callback,
    error:callback
  };
  $.ajax(settings);
}

function renderUserProfile(data) {
  console.log("renderUserProfile data", data);
  if (!data || !data.userProfile) {
    // do not display following until the user profile has been created
    $('.js-section-job-prospects').prop("hidden", true);    
    return;
  }  
  let userProfile = data.userProfile[0];
  userId = userProfile.userId;
  console.log("renderUserProfile userId", userId);

  $( ".js-user-skills" ).html('');
  $( ".js-user-profile" ).html(''); 

  let profileContent =  
    `<div class="flex-item">
          <div class="prospect-header"><em>${userProfile.firstName} ${userProfile.lastName}</em></div>
          <div> 
            <span>${userProfile.email}</span>  </br>          
            <span>${userProfile.phone}</span>  </br>   
          </div>                     
    </div> `;   
        
  $('.js-user-profile').append(`${profileContent}`);  
  $('.js-user-profile').prop("hidden", false); 
} 


function renderUserSkills(data) {
  console.log("renderUserSkills data", data);
  if (!data || !data.userProfile) {
    // do not display following until the user profile has been created
    $('.js-section-user-skills').prop("hidden", true);
    $('.js-section-master-skills').prop("hidden", true);    
    return;
  }  
  let userProfile = data.userProfile[0];;
  userId = userProfile.userId;
  console.log("renderUserSkills userId", userId);

  $( ".js-user-skills" ).html('');
  let counter = 0;
  let skillHeader = '<ul class="items flex-item-skills">';
  let skills = skillHeader;
          
  if (userProfile.skills){
      userProfile.skills.map( function(skill) {          
      skills +=
       `<li class="item js-user-skillset"> 
          <span  id="UserSkill-${counter}" class="js-user-skill js-user-skill-text" data-header="Skill">${skill.skill}</span>
          <span  id="UserExp-${counter}" class="js-user-skill js-user-skill-years" data-header="Experience">${skill.yearsOfExperience}</span>
          <span  data-header=""><a id="EditSkill-${counter}" href=# class="js-edit-skill"><img alt="edit skill" src="../images/icon-edit.png" /></a></span>
          <span  data-header=""><a id="DeleteSkill-${counter}" href=# class="js-delete-skill"><img alt="delete skill" src="../images/icon-delete.png" /></a></span>           
        </li> `;
        counter++; 
     });
     skills += '</ul>';     
    }

    $('.js-user-skills').append(`${skills}`);  
    $('.js-user-skills').prop("hidden", false); 
    $('.js-section-user-skills').prop("hidden", false); 
   
    watchDeleteSkillButtonClick();
    watchEditSkillButtonClick(); 
} 

function displayCareerStrategyResults(data) {  
  if (!data || !data.userProfile || data.userProfile.length == 0) {
      displayUserProfileForm(null);
  }
  else {   
    USER_PROFILE = data.userProfile[0];
    userProfileId = USER_PROFILE.id;
    renderUserProfile(data);
    renderUserSkills(data);   
  }       
}

function displaySkillsMasterList(data) {
  $( ".js-masterlist-skills" ).html('');
  if (data == null || data.skill == null || data.skill.length == 0) {
    $('.js-section-master-skills').prop('hidden', true);
    return;
  }

  $('.js-section-master-skills').prop('hidden', false);
  let counter = 0;
  let skillHeader = '<ul class="items flex-item-skills">';
  let skills = skillHeader;
           
  data.skill.map( function(skill) {           
      skills +=
       `<li class="item"> 
          <span  data-header="Skill"><a href=# id="masterSkill${counter}" class="js-master-skill">${skill.skill}</a></span>
       </li> `;
        counter++; 
     });
     skills += '</ul>';    
     
    $('.js-masterlist-skills').append(`${skills}`);  
    $('.js-masterlist-skills').prop("hidden", false); 
    watchAddMasterSkillButtonClick();   
}  

function renderJobProspects(data) {
    if (data == null || data.prospect == null || data.prospect.length == 0) {
      if (userProfileId.length > 0)
        displayProspectsSummaryForm()
      return;
    }    
    $( ".js-section-job-prospects" ).html('');

    let counter = 0;       
    let prospects = "";

    function custom_sort(a, b) {
        return new Date(a.when).getTime() - new Date(b.when).getTime();
    }
    const sortedProspects = data.prospect.sort(custom_sort);
    sortedProspects.map( function(prospect) {          
      prospects +=
       `<div flex-item-job-prospect>
            <div class="prospect-header"><span id="prospect${counter}">${prospect.what}</span></div>
            <div class="td"><span><em>Where:</em> ${prospect.where}</span></div>            
            <div class="td"><span><em>When: </em>${prospect.when}</span></div>
            <div class="td"><span><em>Status:</em> ${prospect.status}</span></div>          
            <div class="td"><span><em>Source:</em> ${prospect.source}</span></div>    
            <div class="td"><span><em>Source Url:</em> ${prospect.sourceUrl}</span></div>              
            <div class="td"><span><em>Comments:</em> ${prospect.comment}</span></div>  
            <div class="td"><span><em>Details:</em> ${prospect.details}</span></div> 
            <div class="td"><span><em>Day to day:</em> ${prospect.dayToDay}</span></div>                                      
            <div class="td" hidden><input id="Prospect-${counter}" type="text"value=${prospect.id} hidden></input></div>
      </div>
      `; 
       counter++;       
     });    

    $('.js-section-job-prospects').append(`${prospects}`);  
    $('.js-section-job-prospects').prop("hidden", false); 
    $('.js-section-job-prospects').prop("hidden", false); 
    
    watchEditJobProspectClick();
    watchAddJobProspectClick();
}

function displayUserProfileForm(data) { 
  console.log("displayUserProfileForm data", data);
  
  $('.js-edit-profile-form').html();
 
    let profile = {      
      "firstName": "",
      "lastName": "",      
      "email": "",    
      "phone": ""
    }; 

    if (data && data.profile.length > 0) {
      profile = data.profile[[0]];
    }

    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>User Profile</h2></legend>
        <p> <label for="profileFirst" class="edit-label"><strong>First Name: </strong></label> <input type="text" id="profileFirst" value="${profile.firstName}" required /></p>    
        <p> <label for="profileLast" class="edit-label"><strong>Last Name: </strong></label>  <input   type="text"  id="profileLast" value="${profile.lastName}" required /></p>
        <p> <label for="profileEmail" class="edit-label"><strong>Email: </strong></label>  <input   type="text"  id="profileEmail" value="${profile.email}" required /></p>
        <p> <label for="profilePhone" class="edit-label"><strong>Phone: </strong></label>  <input   type="text"  id="profilePhone" value="${profile.phone}" /></p>
      </fieldset>`;

    $(".js-edit-profile-form").html(formInputs);   
    $(".js-edit-profile-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);    
} 


function validateProfileForm() {
    if (profileEditsAreValid()) {   
      USER_PROFILE.firstName =  $('#profileFirst').val();  
      USER_PROFILE.lastName =  $('#profileLast').val();  
      USER_PROFILE.email =  $('#profileEmail').val(); 
      USER_PROFILE.phone =  $('#profilePhone').val(); 
      let userProfile = ""; 

      if (userProfileId && userProfileId.length > 0) {
        userProfile = `{"userProfileId": "${userProfileId}", "firstName": "${USER_PROFILE.firstName}", "lastName": "${USER_PROFILE.lastName}", "email": "${USER_PROFILE.email}", "phone": "${USER_PROFILE.phone}"}`; 
        setTimeout(putCareerStrategyAPI(pathUserProfile, 
          JSON.parse(userProfile), "", function(data){
            console.log("validateProfileForm", data);
            refreshUserProfile(); 
        }), 3000);
      }
      else{
        
        // next update the user document for this user with the profile id 
        userId = localStorage.getItem('userId');   
        userProfile = `{"firstName": "${USER_PROFILE.firstName}","lastName": "${USER_PROFILE.lastName}","email": "${USER_PROFILE.email}", "phone": "${USER_PROFILE.phone}", "userId": "${userId}" }`;    

        setTimeout(postCareerStrategyAPI(pathUserProfile, 
          JSON.parse(userProfile), "", function(data){
            if (data && data.id) {
              userProfileId = data.id;           
              localStorage.setItem('userProfileId', userProfileId);
              refreshUserProfile(userProfileId); 
            }
            else
              refreshUserProfile(""); 
        }), 3000);
      } 
      
      $(".js-job-prospects-form").prop("hidden", true);
      $(".js-form").prop("hidden", true);     
  }
}

function displayProspectsSummaryForm(data) { 
  console.log("displayProspectsSummaryForm data", data);
  
  $('.js-job-prospects-form').html();
 
    let prospect = {      
      "what": "",
      "where": "",  
      "when": "",    
      "status": "",
      "source": "",
      "sourceUrl": "",
      "dayToDay": "",
      "contacts": "",
      "comments": "",
      "details": "",
    }; 

    if (data && data.prospect.length > 0) {
      prospect = data.prospect[[0]];
    }

    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>Job Prospect</h2></legend>
          <p> <label for="prospectWhat" class="edit-label"><strong>What: </strong></label> <input type="text" id="prospectWhat" value="${prospect.what}" required /></p>    
          <p> <label for="prospectWhere" class="edit-label"><strong>Company: </strong></label>  <input   type="text"  id="prospectCompany" value="${prospect.where}" /></p>
          <p> <label for="prospectWhen" class="edit-label"><strong>When: </strong></label>  <input type="datetime"  role="datetime" id="prospectWhen" value="${prospect.when}" /></p>                   
          <p> <label for="prospectStatus"  class="edit-label"><strong>Status: </strong></label>  <input type="text"  id="prospectStatus" value=" ${prospect.status}" /></p>    
          <p> <label for="prospectSource" class="edit-label"><strong>Source: </strong></label>  <input   type="text"  id="prospectSource" value="${prospect.source}" /></p>
          <p> <label for="prospectSourceUrl" class="edit-label"><strong>Source Url: </strong></label>  <input   type="text"  id="prospectSourceUrl" value="${prospect.sourceUrl}" /></p>
          <p> <label for="prospectDayToDay" class="edit-label"><strong>Day to Day: </strong></label>  <input   type="text"  id="prospectDayToDay" value="${prospect.dayToDay}" /></p>
          <p> <label for="prospectContacts" class="edit-label"><strong>Contacts : </strong></label>  <input   type="text"  id="prospectContacts" value="${prospect.contacts}" /></p>
          <p> <label for="prospectComments" class="edit-label"><strong>Comments: </strong></label>  <input   type="text"  id="prospectComments" value="${prospect.comments}" /></p> 
          <p> <label for="prospectDetails"  class="edit-label"><strong>Details: </strong></label>  <input type="text"  id="prospectDetails" value=" ${prospect.details}" /></p>    
      </fieldset>`;

    $(".js-job-prospects-form").html(formInputs);   
    $(".js-job-prospects-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);
    
} 

function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function refreshUserProfileOLD(id) {   
  userId = localStorage.getItem('userId');
  console.log("refreshUserProfile","start");
  let queryPath = `"userId=${userId}`;    
    
    if (userId && userId != undefined &&  userId.length > 0) {
     setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , displayCareerStrategyResults)
      , 3000);     
    }
    else {
      displayCareerStrategyResults(null);
    }
   
    findCareerStrategyAPI(pathSkills, "",  "", displaySkillsMasterList);
} 


function refreshUserProfile(id) {   
  userId = localStorage.getItem('userId');
  console.log("refreshUserProfile","start");    
    
    if (userId && userId.length > 0) {
      const queryPath = `"userId=${userId}`;
      setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , displayCareerStrategyResults)
      , 3000);
            
      setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "", renderJobProspects)
     , 3000);      
    }
    else {
      displayCareerStrategyResults(null);
    }
   
    findCareerStrategyAPI(pathSkills, "",  "", displaySkillsMasterList);
} 


function getMasterSkill(skill){
    const query = `skill=${skill}`;
    findCareerStrategyAPI(pathSkills, query, function(data) {  
      return data;
    });
  }

function profileEditsAreValid() {
    return true;
}

function validateProspectForm(prospectId) {
  if (profileEditsAreValid()) {
     const what =  $('#prospectWhat').val();  
     const when =  $('#prospectWhen').val();  
     const where = $('#prospectWhere').val(); 
     const status =  $('#prospectStatus').val();  
     const source =  $('#prospectSource').val(); 
     const sourceUrl =  $('#prospectSourceUrl').val();
     const dayToDay =  $('#prospectDayToDay').val();
     const contacts =  $('#prospectContact').val();
     const comments =  $('#prospectComments').val();
     const details =  $('#prospectDetails').val(); 
    
      // Creating new job prospect
     if (prospectId == null || prospectId == undefined) {
      const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}"}`;          
      setTimeout(postCareerStrategyAPI(pathJobProspects, 
        JSON.parse(jobProspect), userProfileId, function(data){  
          refreshUserProfile();
       }), 3000);  
    }
    else{ 
      // Updating existing job prospect
      const jobProspect = `{"id","${prospectId}", what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}"}`;  
      setTimeout(putCareerStrategyAPI(pathJobProspects, 
        JSON.parse(jobProspect), prospectId, function(data){       
          refreshUserProfile();
      }), 3000);
    }    
       
    $(".js-job-prospects-form").prop("hidden", true);
    $(".js-form").prop("hidden", true);    
  }
} 

function  watchAddSkillButtonClick() {       
  $('.js-add-skill').click(event => {  
      event.preventDefault();
      let skill = $('#newSkill').val();
      let years = $('#skillYears').val();   
      if (!USER_PROFILE.skills)     {
        USER_PROFILE.skills = []
      }
      USER_PROFILE.skills.push(JSON.parse(`{"skill": "${skill}","yearsOfExperience":${years}}`));       
      const userSkills = `{"id": "${userProfileId}","skills": ${JSON.stringify(USER_PROFILE.skills)}}`;                         

      putCareerStrategyAPI(pathUserProfile, JSON.parse(userSkills), function(data) {        
           // refresh the profile information        
           setTimeout(refreshUserProfile, 3000);    
      }); 

      // Clear out the input fields
      $('#newSkill').html();
      $('#skillYears').html();                                      
    });  
} 

function watchAddJobProspectClick(){
  $('.js-add-prospect').click(event => {  
    event.preventDefault();
    displayProspectsSummaryForm(); 
   }); 
}

function watchEditJobProspectClick(){
  $('.js-edit-prospect').click(event => {  
    event.preventDefault();
    const id = `#${event.currentTarget.id}`; 
    const prospectId =`#Prospect-${id.split('-')[1]}`;
    const prospectKey = $(prospectId).val();
 
    const query = `userProfileId=${userProfileId}&id=${prospectKey}`;
    setTimeout( findCareerStrategyAPI(pathJobProspects, query, "", displayProspectsSummaryForm), 5000);     
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
      
      putCareerStrategyAPI(pathUserProfile, JSON.parse(userSkills), function(data) {        
        // refresh the profile information        
        setTimeout(refreshUserProfile, 3000);    
      }); 
    });  
}

function watchFormSubmitButtonClick() { 
  $('#submitEvent').click(event => {
    event.preventDefault();  
    console.log("watchFormSubmitButtonClick", "start");  
    $(".js-edit-form:visible").each(function() {     
      const formId = $( this ).attr('id')         
      switch (formId) {
        case "editProfile":{
            validateProfileForm();
            break;}
        case "editProspect": {
            validateProspectForm(null);
            break; }
        }       
    });    
  });  
}

function setupHandleEvents() {  
  refreshUserProfile();   
  watchAddSkillButtonClick();
  watchAddMasterSkillButtonClick();
  watchDeleteSkillButtonClick();
  watchEditSkillButtonClick();
  watchFormSubmitButtonClick();
  watchEditJobProspectClick();
  watchAddJobProspectClick();
}

$(setupHandleEvents);