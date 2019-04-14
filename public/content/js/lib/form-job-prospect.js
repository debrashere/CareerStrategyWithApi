'use strict'  
 
function isProspectFormValid() {

 // clear form of error messages
 $( ".form-error" ).remove();
 // check for validation errors
 displayError(validateField($("#prospectWhat").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-what');
 displayError(validateField($("#prospectWhen").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-when');
 displayError(validateField($("#prospectWhere").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-where');
 displayError(validateField($("#prospectStatus").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-status'); 
 displayError(validateField($("#prospectSource").val(), [ 'isTrimmed']), 'js-input-source'); 
 displayError(validateField($("#prospectSourceUrl").val(), ['isUrlFormatValid', 'isTrimmed']), 'js-input-sourceurl'); 
 displayError(validateField($("#prospectDayToDay").val(), [ 'isTrimmed']), 'js-input-daytoday'); 
 displayError(validateField($("#prospectContacts").val(), [ 'isTrimmed']), 'js-input-contacts'); 
 displayError(validateField($("#prospectComments").val(), [ 'isTrimmed']), 'js-input-comments'); 
 displayError(validateField($("#prospectDetails").val(), [ 'isTrimmed']), 'js-input-details'); 

 // check if errors found in form
 const errors = $('.form-error');
 return !errors && errors.length === 0;
}  

/*
  Retrive the input from the job prospect form  
*/
function submitProspectUpdates() {
    if (!isProspectFormValid()) return;

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
    const jobSkills = JSON.stringify(props.props.JOB_SKILLS);
 
    const prospectId =  $('#ProspectEditKey').val();  
    // Creating new job prospect
    if (!prospectId || prospectId == undefined) {
    const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contact":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}}`;            
    setTimeout(postCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), props.userProfileId, function(data){  
        refreshUserProfile();
      }), 3000);      
  }
  else{ 
    // Updating existing job prospect
    const jobProspect = `{"id":"${prospectId}","what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}}`;  
    setTimeout(putCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), prospectId, function(data){       
        refreshUserProfile();
    }), 3000);
  }               
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
  
      $( ".js-job-prospects-skills-form").html(skills); 
  
} 
 
/*
  Display the job prospect form to edit or create job prospect
*/
function displayProspectsSummaryForm(data) { 
  if (!isUserLoggedIn()) return;
    $('.js-page-content').html();
   
      // create json variable with default empty values for creating a new job prospect
      props.JOB_SKILLS = [];
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
        props.JOB_SKILLS = data.prospect.jobSkills
      }
    
      renderJobSkills(props.JOB_SKILLS);    
  
      // Format the input form for job prospect
      let formInputs = `
        <form id="Login" class="flex-container" method="post">
            <fieldset class="edit-form">
            <legend>Job Prospect</h2></legend>
                <p> <label for="'js-input-what'" class="edit-label"><strong>What: </strong></label> <input type="text" id="prospectWhat" class="js-input-what" value="${prospect.what}" aria-required="true" required /></p>    
                <p> <label for="prospectWhere" class="edit-label"><strong>Company: </strong></label>  <input   type="text"  id="prospectWhere" class="js-input-where"   value="${prospect.where}" aria-required="true" required /></p>
                <p> <label for="prospectWhen" class="edit-label"><strong>When: </strong></label>  <input type="datetime"  id="prospectWhen" class="js-input-when" role="datetime"  value="${prospect.when}" aria-required="true" required /></p>                   
                <p> <label for="prospectStatus"  class="edit-label"><strong>Status: </strong></label>  <input type="text"  id="prospectStatus" class="js-input-status"  value=" ${prospect.status}" /></p>    
                <p> <label for="prospectSource" class="edit-label"><strong>Source: </strong></label>  <input   type="text"  id="prospectSource" class="js-input-source"  value="${prospect.source}" /></p>
                <p> <label for="prospectSourceUrl" class="edit-label"><strong>Source Url: </strong></label>  <input   type="text"  id="prospectSourceUrl" class="js-input-sourceurl"  value="${prospect.sourceUrl}" /></p>
                <p> <label for="prospectDayToDay" class="edit-label"><strong>Day to Day: </strong></label>  <textarea  rows="4" cols="50" id="prospectDayToDay" class="js-input-daytoday"  value="${prospect.dayToDay}" >${prospect.dayToDay}</textarea></p>
                <p> <label for="prospectContacts" class="edit-label"><strong>Contacts : </strong></label>  <textarea   rows="2" cols="50"  id="prospectContacts" class="js-input-contacts"  value="${prospect.contact}" >${prospect.contact}</textarea></p>
                <p> <label for="prospectComments" class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50"  id="prospectComments" class="js-input-comments""  value="${prospect.comments}" >${prospect.comments}</textarea></p> 
                <p> <label for="prospectDetails"  class="edit-label"><strong>Details: </strong></label>  <textarea   rows="4" cols="50"   id="prospectDetails" class="js-input-details"  value=" ${prospect.details}" >${prospect.details}</textarea></p>            
                ${hiddenProspectId}
            </fieldset>
          </form>
            <button type="submit" id="submitProspect" class="js-edit-button" >Submit</button>  
            <button type="cancel" id="cancelProspect" class="js-edit-button" >Cancel</button>   <br /> <br />                                           
          `    
  
      // display the job prospect form
      $(".js-page-content").html(formInputs);          
  } 