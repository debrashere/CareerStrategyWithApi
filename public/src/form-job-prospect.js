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
function generateJobSkillsForm(prospect) {  
  let skills = '';  

  /* formats links for the existing job skills */
  if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) {
    skills += '<p>';
    prospect.jobSkills.map( function(skill, index) {          
      skills +=  `<a href="#" id="jobSkill${index}" class="skill-link js-edit-job-skill">${skill.skill}</a>`;            
      });  
    skills += '</p>';   
  }  

  let headerAndSkills = `
    <div class="flex-container">
      <fieldset class="edit-form"> 
        <div class="section-header"><h3 tabindex="0">Job skills</h3></div> 
            <input type="text" id="newJobSkill"></input>  
            <div>
              <a id="AddJobSkill" href="#" class="js-add-job-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
              <a id="DeleteMasterSkill" href="#" class="js-delete-job-skill"><img id="deleteThisJobSkill" alt="delete job skill" src="./images/icon-delete.png">(Delete)</a>
            </div>     
        <div>
          ${skills}
        </div>
      </fieldset> 
    </div> `; 

  return headerAndSkills; 
}

function generateContactsForm(prospect) {


  let contactsList ='';
 prospect.contacts.map( function(contact, index) {    
    contactsList += `
    <div class="flex-item background-color-white">  
    <fieldset class="edit-form">    
      <div class="input-block">
        <a id="DeleteStatus" href="#" class="js-delete-job-status"><img  alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <p class="input-block"><label for="prospectContactFirstName-${index}"  class="edit-label"><strong>First name: </strong><input type="text"  id="prospectContactFirstName-${index}"  value="${contact.firstName}"></input></p>
      <p class="input-block"><label for="prospectContactLastName-${index}"   class="edit-label"><strong>Last name: </strong> <input type="text"  id="prospectContactLastName-${index}"   value="${contact.lastName}"></input></p> 
      <p class="input-block"><label for="prospectContactEmail-${index}"      class="edit-label"><strong>Email: </strong>     <input type="email" id="prospectContactEmail-${index}"      value="${contact.email}"></input></p>
      <p class="input-block"><label for="prospectContactPhone-${index}"      class="edit-label"><strong>Phone: </strong>     <input type="phone" id="prospectContactPhone-${index}"      value="${contact.phone}"></input></p>
      </fieldset">
    </div>`;
 });
     
 let headerAndContacts = `
  <div class="flex-container">
    <div class="section-header"><h3 tabindex="0">Contacts</h3><a id="AddContact" href="#" class="js-add-job-contact"><img id="addNewContact" alt="add status" src="./images/icon-add.png">(Add)</a></div> 
    ${contactsList}
  </div> `;  
       
  return headerAndContacts;
}

function generateStatusHistoryForm(prospect) {

  let statusList ='';
 prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);    
    let formattedDate =  `${dateStatus.getFullYear()}-${('0' + (dateStatus.getMonth()+1)).slice(-2)}-${('0' + (dateStatus.getDate())).slice(-2)}`;
      
     statusList += `
     <div class="flex-item background-color-white"> 
     <fieldset class="edit-form"> 
      <div>
        <a id="DeleteStatus" href="#" class="js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <div class="input-block"><label for="prospectStatusDate-${index}"     class="edit-label"><strong>Date: </strong><input type="date" id="prospectStatusDate-${index}" value="${formattedDate}" ></input></div>
      <div class="input-block"><label for="prospectStatusStatus-${index}"   class="edit-label"><strong>Status: </strong><input type="text" id="prospectStatusStatus-${index}" value="${status.status}"></input></div>
      <div class="input-block"><label for="prospectStatusComment-${index}"  class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50" id="prospectStatusComment-${index}" class="js-input-details"  value="${status.comment}">${status.comment}</textarea></div>  
      </fieldset">
     </div>`;
 });
     
 let headerAndStatus = `
  <div class="flex-container">
    <div class="section-header"><h3 tabindex="0">Status History</h3>         <a id="AddStatus" href="#" class="js-add-job-status"><img id="addNewSkill" alt="add status" src="./images/icon-add.png">(Add)</a></div> 
    ${statusList}
  </div> `;  
       
  return headerAndStatus;
}
 
 
/*
  Display the job prospect form to edit or create job prospect
*/
function generateProspectForm(prospect) { 
    $('.js-page-content').html();
             
    let hiddenProspectId = "";
   
    // If user clicked edit for an existing job prospect then save the id for that prospect in hidden form element 
    if (prospect && prospect.id && prospect.id != '') {  
      hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
    }  

      // Format the input form for job prospect
      let formInputs = `
        <form id="Login" class="flex-container" method="post">        
            <legend>Job Prospect</h2></legend>
              <div class="flex-container">
                <fieldset class="edit-form">
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
                </fieldset>  
              </div> 
              ${generateJobSkillsForm(prospect)}                                                    
              ${generateContactsForm(prospect)}   
              ${generateStatusHistoryForm(prospect)} 
              ${hiddenProspectId}                             
          </form>
            <button type="submit" id="submitProspect" class="js-edit-button" >Submit</button>  
            <button type="cancel" id="cancelProspect" class="js-edit-button" >Cancel</button>   <br /> <br />                                           
          `    
  
      // display the job prospect form
      $(".js-page-content").html(formInputs);              
  } 

/*
  Display the job prospect form to edit or create job prospect
*/
function renderProspectForm() { 
  if (!isUserLoggedIn()) return;
    $('.js-page-content').html();
   
      // create json variable with default empty values for creating a new job prospect
      props.prospect = {};
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
        "contacts": [],
        "statusHistory": []
      }; 
           
      generateProspectForm(prospect)        
  } 

/*
  Display the job prospect form to edit or create job prospect
*/
function editProspectForm(prospect) { 
  if (!isUserLoggedIn()) return;
  
  $('.js-page-content').html();   

  /*
  // If job prospects does not have any job skills or creating a new job prospect
  if (data && data != undefined && data.prospect && data.prospect != undefined && data.prospect.jobSkills) {
    props.JOB_SKILLS = data.prospect.jobSkills
  }
  */
  generateProspectForm(prospect)   
                     
}   
