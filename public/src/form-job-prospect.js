'use strict'  
 
function isProspectFormValid() {

 // clear form of error messages
 $( ".form-error" ).remove();
 // check for validation errors
 displayError(validateField($("#prospectWhat").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-what');
 displayError(validateField($("#prospectWhen").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-when');
 displayError(validateField($("#prospectWhere").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-where');
 displayError(validateField($("#prospectStatus").val(), [ 'isTrimmed']), 'js-input-status'); 
 displayError(validateField($("#prospectSource").val(), [ 'isTrimmed']), 'js-input-source'); 
 displayError(validateField($("#prospectSourceUrl").val(), ['isUrlFormatValid', 'isTrimmed']), 'js-input-sourceurl'); 
 displayError(validateField($("#prospectDayToDay").val(), [ 'isTrimmed']), 'js-input-daytoday'); 
 displayError(validateField($("#prospectContacts").val(), [ 'isTrimmed']), 'js-input-contacts'); 
 displayError(validateField($("#prospectComments").val(), [ 'isTrimmed']), 'js-input-comments'); 
 displayError(validateField($("#prospectDetails").val(), [ 'isTrimmed']), 'js-input-details'); 

 // check if errors found in form
 const errors = $('.form-error');
 return !errors || errors.length === 0;
}

function isInputValid(value, validations, errorPosition) {
  // check for validation errors
  displayError(validateField(value, validations), errorPosition);
 
  // check if errors found in form
  const errors = $('.form-error');
  return errors.length === 0;
 } 

 function generateProspectForms(prospect, profile) {

  return ` 
  <div class="header">
    <h1>Career Strategy</h1>
    <h3>Select each tab to enter all information. After you are done click "Submit" to complete your edits or new job prospect entry.</h3>
    <button type="submit" id="submitProspect" class="js-edit-button" >Submit</button>  
    <a  href="*" class="form-link js-render-landing" >Cancel</a> 
  </div>
  <div class="responsive-tabs">
    <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
    <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
    <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />

    <div class="tabs flex-tabs">
      <label for="tab-one" id="tab-one-label" class="tab">Summary</label>
      <label for="tab-two" id="tab-two-label" class="tab">Job Skills</label>
      <label for="tab-three" id="tab-three-label" class="tab">Contacts</label>
      <label for="tab-four" id="tab-four-label" class="tab">Status History</label>
      <div id="tab-one-panel"   class="panel active">${generateProspectSummaryForm(prospect)} </div>
      <div id="tab-two-panel"   class="panel"> ${generateUserAndJobSkillsForm(prospect, profile)} </div>
      <div id="tab-three-panel" class="panel"> ${generateContactsForm(prospect)} </div>
      <div id="tab-four-panel"  class="panel"> ${generateStatusHistoryForm(prospect)} </div>
    </div>
  </div>`;
  }

/*
  Retrive the input from the job prospect form  
*/
function submitProspectUpdates() {
    if (!isProspectFormValid()) return;

    /* retrieve job prospect fields */
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


    /* retrieve list of skills */
    const existingSkills = [];
    $('.js-job-skills-list').children('.skill-link').each(function(skill) { 
      let testSkill = $(this)[0].text;         
      existingSkills.push({
        "skill":  $(this)[0].text,
        "description" : "",
        "date" : new Date()
      })      
    });
       
    /* retrieve list of contacts */
    const existingContacts = [];
    const firstname = $('.js-input-contact-firstname');
    const lastname = $('.js-input-contact-lastname');
    const email = $('.js-input-contact-email');
    const phone = $('.js-input-contact-phone');
    for (let index=0; index< firstname.length; index++) {
      existingContacts.push({
        "firstName":   firstname[index].value,
        "lastName" :   lastname[index].value,
        "email" :  email[index].value,
        "phone" :  phone[index].value        
      });
    }
       
    /* retrieve list of status */
    const existingStatus = [];
    const statusDate = $('.js-input-status-date');
    const statusStatus = $('.js-input-status-status');
    const statusComment = $('.js-input-status-comment');
    for (let index=0; index< statusDate.length; index++) {
      existingStatus.push({
        "date":   statusDate[index].value,
        "status" :  statusStatus[index].value,
        "comment" :  statusComment[index].value            
      });
    }
  
    /* format json for submission to api */
    const jobSkills = JSON.stringify(existingSkills);
    const statusHistory = JSON.stringify(existingStatus);
    const contactsList = JSON.stringify(existingContacts);

 
    /* submit new or existing job prospect */
    const prospectId =  $('#ProspectEditKey').val();  
    // Creating new job prospect
    if (!prospectId || prospectId == undefined) {
    const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", 
    "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}",
    "dayToDay":  "${dayToDay}", "contact":  "${contacts}", "comments":  "${comments}", 
    "details":   "${details}",  "jobSkills": ${jobSkills}, 
    "statusHistory": ${statusHistory}, 
    "contacts": ${contactsList}}`; 

    setTimeout(postCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), props.userProfileId, function(data){  
        renderJobsSummaries();
      }), 3000);      
  }
  else{ 
    // Updating existing job prospect
    const jobProspect = `{"id":"${prospectId}","what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}","dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}, "statusHistory": ${statusHistory}, "contacts": ${contactsList}}`;  
    setTimeout(putCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), prospectId, function(data){       
        renderJobsSummaries();
    }), 3000);
  }  
            
} 

/*     
   render job skills
*/
function generateUserAndJobSkillsForm(prospect, profile) {  
  let skills = '';  

  /* formats links for the existing job skills */
  if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) { 
      prospect.jobSkills.map( function(skill, index) {          
        skills +=  `<a href="#" id="jobSkill-${index}" class="skill-link js-edit-job-skill">${skill.skill}</a>`;            
      });    
  }  
  const jobSkills = `
    <fieldset id="skillsFieldset" class="flex-item js-skillsFieldset">  
      <div class="form-field">
          <label for="newJobSkill">
            <a id="AddJobSkill" href="#" class="form-link js-prospect-add-job-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
            <a id="DeleteMasterSkill" href="#" class="form-link js-prospect-delete-job-skill"><img id="deleteThisJobSkill" alt="delete job skill" src="./images/icon-delete.png">(Delete)</a>      
          </label>
          <input id="newJobSkill" type="text" class="form-input  js-input-skill" placeholder="skill" value="" >
          <div class="input-block"><p class="js-job-skills-list">${skills}</p></div>  
      </div>
    </fieldset>`;


  let userSkills = "";       
    // if the user has any skills, format the html to display them
   if (profile.skills) {
     profile.skills.map( function(skill, index) {          
      userSkills +=  `<span "userSkill${index}" class="skill-span js-edit-user-skill">${skill.skill}</span>`;            
      });  
     } 
   
     let userSkillsSection = `
     <div class="flex-item-skills">
       <div class="section-header"><h3 tabindex="0">Your Skills (go to "My Skills" to edit")</h3></div>             
       <div class="items flex-item-skillset">
        ${userSkills}
       </div>
     </div>`;

  let skillsForm =  `  
    <div class="input-form-body">
      <div>
          <div class="logo">Career Strategy</div>
          <div class="logo">Skills</div>
          <div class="form-item">
              <form action="" method="post" class="form flex-container">
              ${jobSkills}    
              </form>
              ${userSkillsSection}
          </div>      
    </div>
  </div>`;

  return skillsForm;
}


function generateContactsForm(prospect) {  
  let contactsList = '';

  prospect.contacts.map( function(contact, index) { 
    contactsList += ` 
    <fieldset id="contactFieldset-${index}" class="flex-item js-contactFieldset">  
    <div class="input-block">
          <a id="DeleteContact-${index}" href="#" class="form-link js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
    </div>
    <div class="form-field">
        <label  for="prospectContactFirstName-${index}"><span >First name</span></label>
        <input id="prospectContactFirstName-${index}" type="text" class="form-input  js-input-firstname" placeholder="Contact first name" value="${contact.firstName}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectContactLastName-${index}"><span>Last name</span></label>
        <input id="prospectContactLastName-${index}" type="text" class="form-input  js-input-lastname" placeholder="Contact last name" value="${contact.lastName}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectContactEmail-${index}"><span>Email</span></label>
        <input id="prospectContactEmail-${index}" type="text" class="form-input  js-input-email" placeholder="Contact email" value="${contact.email}" >
    </div>
    <div class="form-field">
        <label for="prospectContactPhone-${index}"><span>Phone</span></label>
        <input id="prospectContactPhone-${index}" type="text" class="form-input  js-input-phone" placeholder="Contact Phone" value="${contact.phone}">
    </div>
    </fieldset> `;
});


let newContactFields = `
<fieldset class="flex-item js-new-contact-form">  
  <a id="AddContact" href="#" class="form-link js-add-job-contact"><img id="addNewContact" alt="add status" src="./images/icon-add.png">(Add)</a>           
  <div class="form-field">
       <input id="prospectNewContactFirstName" type="text" class="form-input  js-prospectNewContactFirstName" placeholder="Contact first name" value="" aria-required="true" required>
  </div>
  <div class="form-field">
       <input id="prospectNewContactLastName" type="text" class="form-input  js-prospectNewContactLastName" placeholder="Contact last name" value="" aria-required="true" required>
  </div>
  <div class="form-field">
       <input id="prospectNewContactEmail" type="text" class="form-input  js-prospectNewContactEmai" placeholder="Contact email" value="" >
  </div>
  <div class="form-field">
       <input id="prospectNewContactPhone" type="text" class="form-input  js-prospectNewContactPhone" placeholder="Contact phone" value="">
  </div>
  </fieldset> `;
    
  let contactForms =  `  
  <div class="input-form-body flex-container">
    <form action="" method="post" class="form form-element">
      ${newContactFields}     
    </form>
    <form action="" method="post" class="form form-edit-element">
      ${contactsList}   
    </form>        
  </div>`;
 
  return contactForms;
}
  
function generateStatusHistoryForm(prospect) {  
  let statusList = '';
   
  prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);    
    let formattedDate =  `${dateStatus.getFullYear()}-${('0' + (dateStatus.getMonth()+1)).slice(-2)}-${('0' + (dateStatus.getDate())).slice(-2)}`;
      
     statusList += `
    <fieldset id="statusFieldset-${index}" class="flex-item js-statusFieldset">  
    <div>
      <a id="DeleteStatus-${index}" href="#" class="form-link js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
    </div>
    <div class="form-field">
        <label  for="prospectStatusDate-${index}">Date</label>
        <input id="prospectStatusDate-${index}" type="text" class="form-input  js-input-status-date" placeholder="Date" value="${formattedDate}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectStatusStatus-${index}">Status</label>
        <input id="prospectStatusStatus-${index}" type="text" class="form-input  js-input-status-status" placeholder="Status" value="${status.status}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectStatusComment-${index}">Comment</label>
        <input id="prospectStatusComment-${index}" type="text" class="form-input  js-input-status-comment" placeholder="Comment" value="${status.comment}" >
    </div>
    </fieldset> `;
});


let newStatusFields = `
<fieldset id="statusFieldset" class="flex-item js-new-status-form">   
<a id="AddStatus" href="#" class="form-link js-add-job-status"><img id="addNewSkill" alt="add status" src="./images/icon-add.png">(Add)</a>
<div class="form-field">
      <input id="prospectStatusDate" type="text" class="form-input js-prospectStatusDate" placeholder="Status Date" value="" aria-required="true" required>
  </div>
  <div class="form-field">
      <input id="prospectStatusStatus" type="text" class="form-input js-prospectStatusStatus" placeholder="Status" value="" aria-required="true" required>
  </div>
  <div class="form-field">
      <input id="prospectStatusComment" type="text" class="form-input js-prospectStatusComment" placeholder="Comment" value="" >
  </div>
  </fieldset> `;
    
  

  let statusForms =  `  
  <div class="input-form-body flex-container">
    <form action="" method="post" class="form form-element">
      ${newStatusFields}     
    </form>
    <form action="" method="post" class="form form-edit-element">
      ${statusList}   
    </form>        
  </div>`;
 
  return statusForms;
}
 
function generateProspectSummaryForm(prospect) {  
  $('.js-page-content').html();
           
  let hiddenProspectId = "";
  let dateStatus = new Date();    
  let formattedDate =  `${dateStatus.getFullYear()}-${('0' + (dateStatus.getMonth()+1)).slice(-2)}-${('0' + (dateStatus.getDate())).slice(-2)}`;    
 
  // If user clicked edit for an existing job prospect then save the id for that prospect in hidden form element 
  if (prospect && prospect.id && prospect.id != '') {  
    hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
    dateStatus = new Date(prospect.when);
    formattedDate =  `${dateStatus.getFullYear()}-${('0' + (dateStatus.getMonth()+1)).slice(-2)}-${('0' + (dateStatus.getDate())).slice(-2)}`;    
  }  

    // Format the input form for job prospect
    let prospectSummary = `  
    <fieldset>  
    <div>
      <a id="DeleteStatus" href="#" class="form-link js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
    </div>
    <div class="form-field">
        <label  for="prospectWhat">What</label>
        <input id="prospectWhat" type="text" class="form-input  js-input-whate" placeholder="What" value="${prospect.what}" aria-required="true" required>
    </div>    
    <div class="form-field">
        <label  for="prospectWhere">Where</label>
        <input id="prospectWhere" type="text" class="form-input  js-input-where" placeholder="Where" value="${prospect.where}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectWhen">Date</label>
        <input id="prospectWhen" type="text" class="form-input  js-input-when" placeholder="Date" value="${status.formattedDate}" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="prospectStatus">Status</label>
        <input id="prospectStatus" type="text" class="form-input  js-input-status" placeholder="Status" value="${prospect.status}" >
    </div>    
    <div class="form-field">
        <label for="prospectSource">Source</label>
        <input id="prospectSource" type="text" class="form-input js-input-source" placeholder="Source" value="${prospect.source}" >
    </div>
    <div class="form-field">
      <label for="prospectSourceUrl">Source URL</label>
      <input id="prospectSourceUrl" type="text" class="form-input  js-input-sourceurl" placeholder="Source Url" value="${prospect.sourceUrl}" >
    </div>
    <div class="form-field">
      <label for="prospectDayToDay">Day to Day</label>
      <textarea id="prospectDayToDay" class="form-input js-input-daytoday"  rows="4" cols="40" placeholder="Day to Day" value="${prospect.dayToDay}" >${prospect.dayToDay}</textarea>
    </div>
    <div class="form-field">
      <label for="prospectContacts">Contact</label>
      <textarea id="prospectContacts" class="form-input js-input-contacts"  rows="2" cols="40" placeholder="Contacts" value="${prospect.contact}" >${prospect.contact}</textarea>
    </div>
    <div class="form-field">
      <label for="prospectComments">Comments</label>
      <textarea id="prospectComments" class="form-input js-input-comments"  rows="4" cols="40"  placeholder="Comments" value="${prospect.comments}" >${prospect.comments}</textarea>
    </div>
    <div class="form-field">
      <label for="prospectDetails">Details</label>
      <textarea id="prospectDetails" class="form-input js-input-details" rows="4" cols="40" placeholder="Details" value="${prospect.details}" >${prospect.details}</textarea>
    </div>
    </fieldset> `; 
    
    let prospectForm =  `  
    <div class="input-form-body">
      <div>
          <div class="form-item">
              <form action="" method="post" class="form flex-container">
              ${prospectSummary}
              ${hiddenProspectId}
              </form>
          </div>
    </div>
  </div>`;

  return prospectForm;
} 

/*
  Display the job prospect form to edit or create job prospect
*/
function renderProspectForm(event, options) { 
  if (!isUserLoggedIn()) return;
  if (!canAccessProfile()) return; 

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
      $('.js-page-content').html(generateProspectForms(prospect, props.USER_PROFILE));   
      $('#ProspectEditKey').hide();      
  } 

/*
  Display the job prospect form to edit or create job prospect
*/
function editProspectForm(prospect) { 
  if (!isUserLoggedIn()) return;
  
  $('.js-page-content').html(generateProspectForms(prospect, props.USER_PROFILE));   
  $('#ProspectEditKey').hide();                        
} 

function deleteJobSkillProspectForm(e) {
  /* get the skill value from input box */
  const thisSkill = $('#newJobSkill');  
  
  /* find the skill in the list of job skills */
  if (thisSkill) {
    const skillElements = $('.skill-link');
    const skillToRemove = $.grep(skillElements, function(e){ return e.text === thisSkill[0].value; });
    /* remove the skill from the list of job skills */
    if (skillToRemove && skillToRemove.length > 0) 
      $(skillToRemove[0]).detach();
  }
}

function addJobSkillProspectForm(e) {
  /* get the skill value from input box */
  const thisSkill = $('#newJobSkill');  
  
  /* find the skill in the list of job skills */
  if (thisSkill) {
    const skillElements = $('.skill-link');

    /* check if the skill already exists in the list of skills before adding it */
    const skillInList = $.grep(skillElements, function(e){ return e.text === thisSkill[0].value; });    
    if (!skillInList || skillInList.length === 0) {
      let newSkill = '';
      let lastSkill = null;
      let index = 0;
      if (skillElements && skillElements.length > 0) {              
        lastSkill = skillElements.last();
        index = lastSkill[0].id.split('-')[1];
        index = index + 1;
        newSkill = `<a href="#" id="jobSkill-${index}" class="skill-link js-edit-job-skill">${thisSkill[0].value}</a>`;
        /* insert the newSkill after the last skill in the list of existing skills */
        $( newSkill ).insertAfter( lastSkill);  
      }
      else {      
        newSkill = `<a href="#" id="jobSkill-0" class="skill-link js-edit-job-skill">${thisSkill[0].value}</a>`;    
        /*  add newSkill in the job skills div*/
        $('.js-job-skills-list').html( newSkill );  
      }     
    }
  }
}

function deleteJobStatusForm(event) {
  const id = `#${event.currentTarget.id}`; 
  const index = id.split('-')[1];
  const toRemove = `statusFieldset-${index}`;
  $(`#${toRemove}`).detach();
}

function addJobStatusForm(event) {
  const existingStatus = $('.js-statusFieldset');
  let index = 0;
  let lastStatus = $('.js-new-status-form')[0];

  if (existingStatus && existingStatus.length > 0) {
    lastStatus = existingStatus.last()[0];
    index =  parseInt(lastStatus.id.split('-')[1]);
    index = index + 1;
  }

   /* retrive the input fields for a new status */
  const thisDate = $('#prospectStatusDate')[0];
  const thisStatus = $('#prospectStatusStatus')[0];
  const thisComment = $('#prospectStatusComment')[0];

    /* check each input field for errors */
    // clear form of error messages
    $( ".form-error" ).remove();
    let allPassed = [];
    allPassed.push(!isInputValid(thisDate.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectStatusDate'));
    allPassed.push(!isInputValid(thisStatus.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectStatusStatus'));
    allPassed.push(!isInputValid(thisComment.value, ['isTrimmed'], 'js-prospectStatusComment'));
    
  /* if any errors return */
  if (jQuery.inArray(true, allPassed) !== -1) return;

  const newStatus = `
  <div id="statusFieldset-${index}" class="flex-item background-color-white js-statusFieldset"> 
  <fieldset class="edit-form"> 
     <div>
       <a id="DeleteStatus-${index}" href="#" class="form-link js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
     </div>
     <div class="input-block"><label for="prospectStatusDate-${index}"     class="edit-label"><strong>Date: </strong><input type="datetime-local" id="prospectStatusDate-${index}" class="js-input-status-date" value="${thisDate.value}" ></input></div>
     <div class="input-block"><label for="prospectStatusStatus-${index}"   class="edit-label"><strong>Status: </strong><input type="text" id="prospectStatusStatus-${index}" class="js-input-status-status" value="${thisStatus.value}"></input></div>
     <div class="input-block"><label for="prospectStatusComment-${index}"  class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50" id="prospectStatusComment-${index}" class="js-input-status-comment"  value="${thisComment.value}">${thisComment.value}</textarea></div>  
   </fieldset">
  </div>`;
 
  /* add this new status to the list status list */
  $( newStatus ).insertAfter( lastStatus);   
  
    /* clear the input fields */   
    thisDate.val('');
    thisStatus.val('');
    thisComment.val(''); 
}

function deleteJobContactForm(event) {
  const id = `#${event.currentTarget.id}`; 
  const index = id.split('-')[1];
  const toRemove = `contactFieldset-${index}`;
  $(`#${toRemove}`).detach();
}


function addJobContactForm(event) { 
  const existingContacts =   $('.js-contactFieldset');
  let index = 0;
  let lastContact = $('.js-new-contact-form')[0];

  /* find the last contact in list of existing contacts 
     extract the id in order to retrive the index 
  */
  if (existingContacts && existingContacts.length > 0) {
    lastContact = existingContacts.last()[0];
    index =  parseInt(lastContact.id.split('-')[1]);
    index = index + 1;
  }
 
  /* retrive the input fields for a new contact */
  const thisFirstname = $('#prospectNewContactFirstName')[0];
  const thisLastname = $('#prospectNewContactLastName')[0];
  const thisEmail = $('#prospectNewContactEmail')[0];
  const thisPhone = $('#prospectNewContactPhone')[0];

  /* check each input field for errors */
    // clear form of error messages
    $( ".form-error" ).remove();
    let allPassed = [];
    allPassed.push(!isInputValid(thisFirstname.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectNewContactFirstName'));
    allPassed.push(!isInputValid(thisLastname.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectNewContactLastName'));
    allPassed.push(!isInputValid(thisEmail.value, [  'isTrimmed', 'validationIsEmailFormatValid'], 'js-prospectNewContactEmail'));
    allPassed.push(!isInputValid(thisPhone.value, [  'isTrimmed', 'validationIsPhoneFormatValid'], 'js-prospectNewContactPhone'));
 
  /* if any errors return */
  if (jQuery.inArray(true, allPassed) !== -1) return;

  const newContact = `  
  <div id="contactFieldset-${index}" class="js-contactFieldset">  
    <fieldset class="edit-form js-contacts-input-form">      
      <div class="input-block">
        <a id="DeleteContact-${index}" href="#" class="form-link js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <p class="input-block"><label for="prospectContactFirstName-${index}"  class="edit-label"><strong>First name: </strong><input type="text"  id="prospectContactFirstName-${index}"  class="js-input-contact-firstname" value="${thisFirstname.value}"></input></p>
      <p class="input-block"><label for="prospectContactLastName-${index}"   class="edit-label"><strong>Last name: </strong> <input type="text"  id="prospectContactLastName-${index}"   class="js-input-contact-lastname" value="${thisLastname.value}"></input></p> 
      <p class="input-block"><label for="prospectContactEmail-${index}"      class="edit-label"><strong>Email: </strong>     <input type="email" id="prospectContactEmail-${index}"      class="js-input-contact-email" value="${thisEmail.value}"></input></p>
      <p class="input-block"><label for="prospectContactPhone-${index}"      class="edit-label"><strong>Phone: </strong>     <input type="tel"   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="prospectContactPhone-${index}"      class="js-input-contact-phone" value="${thisPhone.value}"></input></p>
    </fieldset">
  </div>`;
 
  /* add this new contract to the list of contracts */
  $( newContact ).insertAfter(lastContact)  
 
  /* clear the input fields */ 
  $('.js-prospectNewContactFirstName').val('');
  $('.js-prospectNewContactLastName').val('');
  $('.js-prospectNewContactEmail').val('');
  $('.js-prospectNewContactPhone').val('');  
}
 
