'use strict'  
const CAREER_STRATEGY_URL ='http://localhost:8080/api';
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
          <div class="section-header"><em>${userProfile.firstName} ${userProfile.lastName}</em> <a href=# class="js-edit-profile"><img alt="edit prospect" src="../images/icon-edit.png" /> (Edit)</a></div>
          <div> 
            <span>${userProfile.email}</span>  </br>          
            <span>${userProfile.phone}</span>  </br>   
          </div>                     
    </div> `;   
        
  $('.js-user-profile').append(`${profileContent}`);  
  $('.js-user-profile').prop("hidden", false); 

  watchEditUserProfile();
} 


function renderUserSkills(data) {
  if (!data || !data.userProfile) {
    // do not display following until the user profile has been created
    $('.js-section-user-skills').prop("hidden", true);
    $('.js-section-master-skills').prop("hidden", true);    
    return;
  }  
  let userProfile = data.userProfile[0];;
  userId = userProfile.userId;

  $('.js-section-user-skills').html('');
  let counter = 0;
  let skillHeader = `
  <div class="flex-item-skills">
    <div class="section-header"><h3>Your Skills</h3></div>
    <div class="table">
      <div class="tr th"> 
        <div class="td">Skill</div> 
        <div class="td experience">Years</div>
        <div class="td"> </div>     
      </div>
      <div class="tr">  
        <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
        <div class="td" data-header="Experience"> <input type="text" id="skillYears"></input></div>
        <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-skill"><img id="addNewSkill" alt="add skill" src="../images/icon-add.png">(Add)</a></div>
      </div>
    </div>              
    <ul class="items flex-item-skillset">`;

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
     skills += '</ul></div> ';     
    }

    $('.js-section-user-skills').append(`${skills}`);  
    $('.js-section-user-skills').prop("hidden", false); 
    $('.js-section-user-skills').prop("hidden", false); 
   
    watchAddSkillButtonClick();
    watchDeleteSkillButtonClick();
    watchEditSkillButtonClick(); 
} 

function displayCareerStrategyResults(data) {  
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

function displaySkillsMasterList(data) {
  if (data == null || data.skill == null || data.skill.length == 0) {
    $('.js-section-master-skills').prop('hidden', true);
    return;
  }
  $('.js-section-master-skills').html('');
  $('.js-section-master-skills').prop('hidden', false);
  let counter = 0;
  let skillHeader = `
  <div flex-item>
    <div class="skills-header"><h3>Master list of skills</h3> <em> (click on a skill to add it to your list of skills)</em></div>   
    <ul class="items flex-item-skills">`;
  let skills = skillHeader;
           
  data.skill.map( function(skill) {           
      skills +=
       `<li class="item"> 
          <span  data-header="Skill"><a href=# id="masterSkill${counter}" class="js-master-skill">${skill.skill}</a></span>
       </li> `;
        counter++; 
     });
     skills += '</ul></div>';    
     
    $('.js-section-master-skills').append(`${skills}`);  
    $('.js-section-master-skills').prop("hidden", false); 
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
      let dateWhen = new Date(prospect.when);
      let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
       ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;     
                                                 
      prospects +=
       `<div class="flex-item-job-prospect">
            <div class="section-header"><span id="prospect${counter}">${prospect.what}</span>  <br />
                    <a id="ProspectEdit-${counter}" href=# class="js-edit-prospect"><img alt="edit prospect" src="../images/icon-edit.png" />  (edit)</a>   
                    <a id="ProspectDelete-${counter}" href=# class="js-delete-prospect"><img alt="delete prospect" src="../images/icon-delete.png" /> (delete)</a>  </div>
            <div class="td"><span><em>Where:</em> ${prospect.where}</span></div>            
            <div class="td"><span><em>When: </em>${formattedDate}</span></div>
            <div class="td"><span><em>Status:</em> ${prospect.status}</span></div>          
            <div class="td"><span><em>Source:</em> ${prospect.source}</span></div>    
            <div class="td"><span><em>Source Url:</em> <a href='${prospect.sourceUrl}' target=_blank>${prospect.sourceUrl}<a></span></div>              
            <div class="td"><em>Contacts:</em><p>${prospect.contact}</p></div>            
            <div class="td"><em>Comments:</em><p>${prospect.comments}</p></div>  
            <div class="td"><em>Details:</em><p>${prospect.details}</p></div> 
            <div class="td"><span><em>Day to day:</em> ${prospect.dayToDay}</span></div>                                      
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

function displayUserProfileForm(data) { 

  $('.js-edit-profile-form').html();
 
    let hiddenProfileId = "";
    let profile = {      
      "firstName": "",
      "lastName": "",      
      "email": "",    
      "phone": ""
    }; 

    if (data && data.userProfile.length > 0) {
      profile = data.userProfile[[0]];
      hiddenProfileId = `<label for="ProfileEditKey" class="edit-label"></label><div class="td" hidden><input id="ProfileEditKey" type="text"value=${profile.id} hidden></input></div>`;       
    }

    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>User Profile</h2></legend>
        <p> <label for="profileFirst" class="edit-label"><strong>First Name: </strong></label> <input type="text" id="profileFirst" value="${profile.firstName}" aria-required="true" required /></p>    
        <p> <label for="profileLast" class="edit-label"><strong>Last Name: </strong></label>  <input   type="text"  id="profileLast" value="${profile.lastName}" aria-required="true" required /></p>
        <p> <label for="profileEmail" class="edit-label"><strong>Email: </strong></label>  <input   type="text"  id="profileEmail" value="${profile.email}" aria-required="true" required /></p>
        <p> <label for="profilePhone" class="edit-label"><strong>Phone: </strong></label>  <input   type="text"  id="profilePhone" value="${profile.phone}" /></p>
        ${hiddenProfileId}
      </fieldset>`;

    $(".js-edit-profile-form").html(formInputs);   
    $(".js-edit-profile-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);    
} 

function validateProfileForm(profileId) {
    const errors = profileEditsAreValid();
    if (errors != "") {
      $('#js-error-message').html(errors);
      $('#js-error-message').prop("hidden", false);
      return;
    } 

    userId = localStorage.getItem('userId');  
    if (!userId || userId.length == 0) {
      location.href = "../login.html";
    }
    USER_PROFILE.firstName =  $('#profileFirst').val();  
    USER_PROFILE.lastName =  $('#profileLast').val();  
    USER_PROFILE.email =  $('#profileEmail').val(); 
    USER_PROFILE.phone =  $('#profilePhone').val(); 
    let userProfile = ""; 

    if (profileId && profileId != undefined) {
      // update the user profile document for this user
      userProfile = `{"id": "${profileId}", "firstName": "${USER_PROFILE.firstName}", "lastName": "${USER_PROFILE.lastName}", "email": "${USER_PROFILE.email}", "phone": "${USER_PROFILE.phone}"}`; 
      setTimeout(putCareerStrategyAPI(pathUserProfile, 
        JSON.parse(userProfile), profileId, refreshUserProfile),  3000);
    }
    else{        
      // create the user profile document for this user  
      userProfile = `{"firstName": "${USER_PROFILE.firstName}","lastName": "${USER_PROFILE.lastName}","email": "${USER_PROFILE.email}", "phone": "${USER_PROFILE.phone}", "userId": "${userId}" }`;    
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

function displayProspectsSummaryForm(data) { 
  $('.js-job-prospects-form').html();
 
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
      "contacts": "",
      "comments": "",
      "details": "",
    }; 

    if (data && data != undefined) {
      prospect = data.prospect;
      hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
    }

    let formInputs = `
      <fieldset class="edit-form">
        <legend><h2>Job Prospect</h2></legend>
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

    $(".js-job-prospects-form").html(formInputs);   
    $(".js-job-prospects-form").prop("hidden", false);
    $(".js-form").prop("hidden", false);    
} 

function refreshUserProfile(id) {     
  userId = localStorage.getItem('userId');    
  if (!userId || userId.length == 0) {
    location.href = "../login.html";
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


function getMasterSkill(skill){
    const query = `skill=${skill}`;
    findCareerStrategyAPI(pathSkills, query, function(data) {  
      return data;
    });
  }

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

function validateProspectForm(prospectId) {

  const errors = prospectEditsAreValid();
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

function  watchEditUserProfile() {       
  $('.js-edit-profile').click(event => {  
    event.preventDefault();  
    userId = localStorage.getItem('userId');
    const queryPath = `userId=${userId}`;
    setTimeout( findCareerStrategyAPI(pathUserProfile, queryPath, "", displayUserProfileForm), 5000);     
  }); 
}

function  watchAddSkillButtonClick() {       
  $('.js-add-skill').click(event => {  
      event.preventDefault();
      let skill = $('#newSkill').val();
      let years = $('#skillYears').val();   
      if (!USER_PROFILE.skills)     {
        USER_PROFILE.skills = []
      }
      USER_PROFILE.skills.push(JSON.parse(`{"skill": "${skill}","yearsOfExperience":"${years}"}`));       
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
    const prospectKey = $(prospectId).text();

    setTimeout( findCareerStrategyAPI(pathJobProspects, "", prospectKey,
     displayProspectsSummaryForm), 5000);     
  }); 
}

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