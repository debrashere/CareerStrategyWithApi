'use strict'  
/*
  Executed when user clicks on add skill link 
  will update the job prospect's collection of skills
*/
function  addSkillToUserProfile() {       
      let skill = $('#newJobSkill').val();
      let years = $('#jobSkillYears').val();
      let skillIndex = -1; 

      if (jobSkillsAreValid().length > 0) {
        $('#js-job-skills-error-message').html(jobSkillsAreValid());
        $('#js-job-skills-error-message').prop("hidden", false);
        return;
      }

      if (!JOB_SKILLS) {
        JOB_SKILLS = []
      }

    
      // Check if the job skill already exists if so update instead of add
      for(let idx=0; idx< JOB_SKILLS.length ; idx++)
      {
          if (JOB_SKILLS[idx].skill == skill) {
          skillIndex = idx;
          break;
          }
      }  

      if (skillIndex > -1) {
        JOB_SKILLS[skillIndex].yearsOfExperience = years;
      }
      else {     
        JOB_SKILLS.push(JSON.parse(`{"skill": "${skill.trim()}","yearsOfExperience":"${years.trim()}"}`));       
      }

      // refresh the job skills dom element
      renderJobSkills(JOB_SKILLS);

      // Clear out the input fields
      $('#newJobSkill').html();
      $('#jobSkillYears').html();                                     
} 

/*
  Executed when user clicks link to edit and existing job skill
  will put the existing skill data in the input fields for the user to edit
*/
function  editUserProfileSkill() {        
    const id = `#${event.currentTarget.id}`; 
    let skill = $(id).parent().parent().children('.js-job-skill-text').text();
    let experience = $(id).parent().parent().children('.js-job-skill-years').text();

    // setup the skill input field
    $("#newJobSkill").val(skill);
    $("#jobSkillYears").val(experience);   
}

/*
  Executed when user clicks link to delete an existing job skill
  will remove the skill from the job prospect's collection of skills
*/
function  deleteSkillFromUserProfile() {        
    const id = `#${event.currentTarget.id}`; 
    let skill = $(id).parent().parent().children('.js-job-skill-text').text();
    let skillIndex = -1;

    for(let idx=0; idx< JOB_SKILLS.length ; idx++)
    {
        if (JOB_SKILLS[idx].skill == skill) {
        skillIndex = idx;
        break;
        }
    }  

    JOB_SKILLS.splice( skillIndex, 1 );          
    renderJobSkills(JOB_SKILLS);  
} 
/*     
   render job skills
*/
function renderJobSkills(data) {
    let skills = "";
    $(".js-job-prospects-skills-form").html('');
  
      let skillHeader = ` 
      <div class="flex-item-skills">
        <div class="section-header"><h3 tabindex="0">Job Skills</h3></div>
        <output><div id="js-job-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
        <div class="table">
          <div class="tr th"> 
            <div class="td">Skill</div> 
            <div class="td experience">Years</div>
            <div class="td"> </div>     
          </div>
          <div class="tr">  
            <div class="td" data-header="Skill"><input type="text" id="newJobSkill"></input></div>
            <div class="td" data-header="Experience"> <input type="text" id="jobSkillYears"></input></div>
            <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-job-skill"><img id="addNewJobSkill" alt="add job skill" src="./images/icon-add.png">(Add)</a></div>
          </div>
        </div>            
        <div class="items flex-item-skillset">`;
  
      skills = skillHeader;
          
      // format the job skills
      if (data.length > 0) {
          data.map( function(skill, index) {          
          skills +=
          `<p class="item job-skill js-job-skillset"> 
              <span  tabindex="0" id="JobSkill-${index}" class="js-job-skill js-job-skill-text" data-header="Skill">${skill.skill}</span>
              <span  tabindex="0" id="JobExp-${index}" class="js-job-skill js-job-skill-years" data-header="Experience">${skill.yearsOfExperience}</span>
              <span  tabindex="0"><a id="EditJobSkill-${index}" href=# class="js-edit-job-skill"><img alt="edit job skill" src="./images/icon-edit.png" /></a></span>
              <span  tabindex="0"><a id="DeleteJobSkill-${index}" href=# class="js-delete-job-skill"><img alt="delete job skill" src="./images/icon-delete.png" /></a></span>           
            </p> `;        
        });
        skills += '</div></div>';     
        }  
  
      $( ".js-page-content").html(skills);     
}  


/*
  Display the job prospect form to edit or create job prospect
*/
function displayProspectsSummaryForm(data) { 
    $('.js-page-content').html();
   
      // create json variable with default empty values for creating a new job prospect
      JOB_SKILLS = [];
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
        "jobSkills": [],
      }; 
   
      // If user clicked edit for an existing job prospect then save the id for that prospect in hidden form element 
      if (data && data != undefined) {
        prospect = data.prospect;
        hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
      }
  
      // If job prospects does not have any job skills or creating a new job prospect
      if (data && data != undefined && data.prospect && data.prospect != undefined && data.prospect.jobSkills) {
        JOB_SKILLS = data.prospect.jobSkills
      }
    
      renderJobSkills(JOB_SKILLS);    
  
      // Format the input form for job prospect
      let formInputs = `
        <fieldset class="edit-form">
          <legend>Job Prospect</h2></legend>
            <p> <label for="prospectWhat" class="edit-label"><strong>What: </strong></label> <input type="text" id="prospectWhat" value="${prospect.what}" aria-required="true" required /></p>    
            <p> <label for="prospectWhere" class="edit-label"><strong>Company: </strong></label>  <input   type="text"  id="prospectWhere" value="${prospect.where}" aria-required="true" required /></p>
            <p> <label for="prospectWhen" class="edit-label"><strong>When: </strong></label>  <input type="datetime"  role="datetime" id="prospectWhen" value="${prospect.when}" aria-required="true" required /></p>                   
            <p> <label for="prospectStatus"  class="edit-label"><strong>Status: </strong></label>  <input type="text"  id="prospectStatus" value=" ${prospect.status}" /></p>    
            <p> <label for="prospectSource" class="edit-label"><strong>Source: </strong></label>  <input   type="text"  id="prospectSource" value="${prospect.source}" /></p>
            <p> <label for="prospectSourceUrl" class="edit-label"><strong>Source Url: </strong></label>  <input   type="text"  id="prospectSourceUrl" value="${prospect.sourceUrl}" /></p>
            <p> <label for="prospectDayToDay" class="edit-label"><strong>Day to Day: </strong></label>  <textarea  rows="4" cols="50" id="prospectDayToDay" value="${prospect.dayToDay}" >${prospect.dayToDay}</textarea></p>
            <p> <label for="prospectContacts" class="edit-label"><strong>Contacts : </strong></label>  <textarea   rows="2" cols="50"  id="prospectContacts" value="${prospect.contact}" >${prospect.contact}</textarea></p>
            <p> <label for="prospectComments" class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50"  id="prospectComments" value="${prospect.comments}" >${prospect.comments}</textarea></p> 
            <p> <label for="prospectDetails"  class="edit-label"><strong>Details: </strong></label>  <textarea   rows="4" cols="50"   id="prospectDetails" value=" ${prospect.details}" >${prospect.details}</textarea></p>            
            ${hiddenProspectId}
        </fieldset>`;      
  
      // display the job prospect form
      $(".js-page-content").html(formInputs);   
      $(".js-page-content").prop("hidden", false);     
  } 

/*
  Validate the input data from the user profile form
*/
function validateProfileForm(profileId) {
  const errors = profileEditsAreValid();
  if (errors != "") {
    $('.js-error-message').html(errors);
    $('.js-error-message').prop("hidden", false);
    return;
  } 

  userId = localStorage.getItem('userId');  
  if (!userId || userId.length == 0) {
    //location.href = "./login.html";
    renderLoginForm();
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
          $('.js-error-message').html(data.responseJSON.error);
          $('.js-error-message').prop("hidden", false);
        }
        else {
          $('.js-error-message').html("Oops something went wrong. Please try again.");
          $('.js-error-message').prop("hidden", false);
        }
          
    }), 3000);
  }             
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

  if (when || when.trim().length > 0) {    
    if (Date.parse(when)) {
      //Valid date
    } else {
      message += "When must be a valid date format <br/>";
    }
  }

  if (!where || where.trim().length == 0)
    message += "Where is required";  

  return message;
}

/*
  Retrive the input from the job prospect form and 
*/
function validateProspectForm(prospectId) {
  const errors = prospectEditsAreValid();
  // show error message if the form input is not  valie
  if (errors != "") {
    $('.js-error-message').html(errors);
    $('.js-error-message').prop("hidden", false);
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
    const jobSkills = JSON.stringify(JOB_SKILLS);
 
    // Creating new job prospect
    if (!prospectId || prospectId == undefined) {
    const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contact":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}}`;            
    setTimeout(postCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), userProfileId, function(data){  
        refreshUserProfile();
      }), 3000);      
  }
  else{ 
    // Updating existing job prospect
    const jobProspect = `{"id":"${prospectId}","what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}}`;  
    setTimeout(putCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), prospectId, function(data){       
        refreshUserProfile();
    }), 3000);
  }    
    
  $(".js-form").prop("hidden", true);      
} 
      
 
/*
  Executed when user clicks the submit button for user profile form or job prospect form
  will call the correct function to complete the validation of inputs and submit the updates
*/
function submitProspect() { 
    const id = `#${event.currentTarget.id}`;     
    const prospectKey = $('#ProspectEditKey').val();
    validateProspectForm(prospectKey);                    
}

/*
  Executed when user clicks on link to delete a job prospect
  will call API delete method to remove the job prospect
*/
function deleteJobProspect(){
    const id = `#${event.currentTarget.id}`; 
    let prospectId = $(id).parent().parent().find('.js-prospectId').text(); 
    setTimeout(deleteCareerStrategyAPI(pathJobProspects, "", prospectId, displayProspectsSummaryForm), 5000);       
}

/*
  Executed when user clicks on link to edit an existing job prospect
  will call function to display the input form with current data 
*/
function editJobProspect() {
  const id = `#${event.currentTarget.id}`;   
  let prospectId = $(id).parent().parent().find('.js-prospectId').text();   
  setTimeout( findCareerStrategyAPI(pathJobProspects,  "", prospectId,
  displayProspectsSummaryForm), 5000);  
}
