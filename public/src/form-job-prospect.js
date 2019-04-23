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
function generateJobSkillsForm(prospect) {  
  let skills = '';  

  /* formats links for the existing job skills */
  if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) { 
      prospect.jobSkills.map( function(skill, index) {          
        skills +=  `<a href="#" id="jobSkill-${index}" class="skill-link js-edit-job-skill">${skill.skill}</a>`;            
      });    
  }  
  const skillsList = `<div class="input-block"><p class="js-job-skills-list">${skills}</p></div>`; 

  let headerAndSkills = `
    <div class="flex-container">
      <fieldset class="edit-form"> 
        <div class="section-header"><h3 tabindex="0">Job skills</h3></div>             
            <label for="newJobSkill">  
              <a id="AddJobSkill" href="#" class="js-prospect-add-job-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
              <a id="DeleteMasterSkill" href="#" class="js-prospect-delete-job-skill"><img id="deleteThisJobSkill" alt="delete job skill" src="./images/icon-delete.png">(Delete)</a>
            </label>          
            <div class="input-block"><input type="text" id="newJobSkill"></input> </div>
          ${skillsList}      
      </fieldset> 
    </div> `; 

    let showHideJobSkills = `
    <div class="toggle">
    <input type="checkbox" value="selected" id="skillsToggle" class="toggle__input">
    <label for="skillsToggle" class="toggle__label"><span class="toggle__more"> Show Job Skills</span> <span class="toggle__less">Hide Job Skills</span></label>                            
    <div class="toggle__content">
      ${headerAndSkills}
    </div>     
  </div>`;

  return showHideJobSkills; 
}

function generateContactsForm(prospect) {


  let contactsList ='';
  prospect.contacts.map( function(contact, index) {    
      contactsList += `
      <div id="contactFieldset-${index}" class="flex-item background-color-white js-contactFieldset">  
      <fieldset class="edit-form js-contacts-input-form">    
        <div class="input-block">
          <a id="DeleteContact-${index}" href="#" class="js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
        </div>
        <p class="input-block"><label for="prospectContactFirstName-${index}"  class="edit-label"><strong>First name: </strong><input type="text"  id="prospectContactFirstName-${index}" class="js-input-contact-firstname" value="${contact.firstName}"></input></p>
        <p class="input-block"><label for="prospectContactLastName-${index}"   class="edit-label"><strong>Last name: </strong> <input type="text"  id="prospectContactLastName-${index}"  class="js-input-contact-lastname" value="${contact.lastName}"></input></p> 
        <p class="input-block"><label for="prospectContactEmail-${index}"      class="edit-label"><strong>Email: </strong>     <input type="email" id="prospectContactEmail-${index}"     class="js-input-contact-email" value="${contact.email}"></input></p>
        <p class="input-block"><label for="prospectContactPhone-${index}"      class="edit-label"><strong>Phone: </strong>     <input type="phone" id="prospectContactPhone-${index}"     class="js-input-contact-phone" value="${contact.phone}"></input></p>
        </fieldset">
      </div>`;
  });

  let newContactFields = `
      <div class="flex-item background-color-white js-new-contact-form">  
        <fieldset class="edit-form">   
          <a id="AddContact" href="#" class="js-add-job-contact"><img id="addNewContact" alt="add status" src="./images/icon-add.png">(Add)</a> 
          <p class="input-block"><label for="prospectNewContactFirstName"  class="edit-label js-prospectNewContactFirstName"><strong>First name: </strong><input type="text"  id="prospectNewContactFirstName"  value=""></input></p>
          <p class="input-block"><label for="prospectNewContactLastName"   class="edit-label js-prospectNewContactLastName"><strong>Last name: </strong> <input type="text"  id="prospectNewContactLastName"   value=""></input></p> 
          <p class="input-block"><label for="prospectNewContactEmail"      class="edit-label js-prospectNewContactEmail"><strong>Email: </strong>     <input type="email" id="prospectNewContactEmail"      value=""></input></p>
          <p class="input-block"><label for="prospectNewContactPhone"      class="edit-label js-prospectNewContactPhone"><strong>Phone: </strong>     <input type="phone" id="prospectNewContactPhone"      value=""></input></p>
        </fieldset">
      </div>`; 
        
  let headerAndContacts = `
    <div class="flex-container js-contacts-container">
      <div class="section-header"><h3 tabindex="0">Contacts</h3></div> 
      ${newContactFields}
      ${contactsList}
    </div> `;  
       
    let showHideContacts = `
    <div class="toggle">
    <input type="checkbox" value="selected" id="contactsToggle" class="toggle__input">
    <label for="contactsToggle" class="toggle__label"><span class="toggle__more"> Show Contacts</span> <span class="toggle__less">Hide Contacts</span></label>                            
    <div class="toggle__content">
      ${headerAndContacts}
    </div>     
  </div>`;

    return showHideContacts;
}

function generateStatusHistoryForm(prospect) {

  let statusList ='';
 prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);    
    let formattedDate =  `${dateStatus.getFullYear()}-${('0' + (dateStatus.getMonth()+1)).slice(-2)}-${('0' + (dateStatus.getDate())).slice(-2)}`;
      
     statusList += `
     <div id="statusFieldset-${index}" class="flex-item background-color-white js-statusFieldset"> 
     <fieldset class="edit-form"> 
        <div>
          <a id="DeleteStatus-${index}" href="#" class="js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
        </div>
        <div class="input-block"><label for="prospectStatusDate-${index}"     class="edit-label"><strong>Date: </strong><input type="date" id="prospectStatusDate-${index}"   class="js-input-status-date" value="${formattedDate}" ></input></div>
        <div class="input-block"><label for="prospectStatusStatus-${index}"   class="edit-label"><strong>Status: </strong><input type="text" id="prospectStatusStatus-${index}"  class="js-input-status-status" value="${status.status}"></input></div>
        <div class="input-block"><label for="prospectStatusComment-${index}"  class="edit-label"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50" id="prospectStatusComment-${index}"  class="js-input-status-comment"  value="${status.comment}">${status.comment}</textarea></div>  
      </fieldset">
     </div>`;
 });


  let newStatus = `
     <div id="statusFieldset" class="flex-item background-color-white js-new-status-form"> 
      <fieldset class="edit-form"> 
        <a id="AddStatus" href="#" class="js-add-job-status"><img id="addNewSkill" alt="add status" src="./images/icon-add.png">(Add)</a>
        <div class="input-block"><label for="prospectStatusDate"     class="edit-label  js-prospectStatusDate"><strong>Date: </strong><input type="date" id="prospectStatusDate" ></input></div>
        <div class="input-block"><label for="prospectStatusStatus"   class="edit-label  js-prospectStatusStatus"><strong>Status: </strong><input type="text" id="prospectStatusStatus" value=""></input></div>
        <div class="input-block"><label for="prospectStatusComment"  class="edit-label  js-prospectStatusComment"><strong>Comments: </strong></label>  <textarea   rows="4" cols="50" id="prospectStatusComment" value=""></textarea></div>  
      </fieldset">
     </div>`; 
     
 let headerAndStatus = `
  <div class="flex-container js-status-container">
    <div class="section-header"><h3 tabindex="0">Status History</h3></div> 
    ${newStatus}
    ${statusList}
  </div> `;  
       
  let showHideStatus = `
  <div class="toggle">
    <input type="checkbox" value="selected" id="statusToggle" class="toggle__input">
    <label for="statusToggle" class="toggle__label">
       <span class="toggle__more"> Show Status History</span> <span class="toggle__less">Hide Status History</span></label>                            
    <div class="toggle__content">
      ${headerAndStatus}
    </div>     
  </div>`;

  return showHideStatus;
}    

/*
  Display the job prospect form to edit or create job prospect
*/
function generateProspectForm(prospect) { 
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
      let formInputs = `
      <button type="submit" id="submitProspect" class="js-edit-button" >Submit</button>  
      <button type="cancel" id="cancelProspect" class="js-edit-button" >Cancel</button>   <br /> <br />                                                   
        <form id="Login" class="flex-container" method="post">        
            <legend>Job Prospect</h2></legend>
              <div class="flex-container">
                <fieldset class="edit-form">
                  <p> <label for="'js-input-what'" class="edit-label"><strong>What: </strong></label> <input type="text" id="prospectWhat" class="js-input-what" value="${prospect.what}" aria-required="true" required /></p>    
                  <p> <label for="prospectWhere" class="edit-label"><strong>Company: </strong></label>  <input   type="text"  id="prospectWhere" class="js-input-where"   value="${prospect.where}" aria-required="true" required /></p>
                  <p> <label for="prospectWhen" class="edit-label"><strong>When: </strong></label>  <input type="date"  id="prospectWhen" class="js-input-when" role="datetime"  value="${formattedDate}" aria-required="true" required /></p>                   
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
          `    
  
      // display the job prospect form
      $(".js-page-content").html(formInputs);  
      $('#ProspectEditKey').hide();       
  } 

/*
  Display the job prospect form to edit or create job prospect
*/
function renderProspectForm() { 
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
           
      generateProspectForm(prospect)        
  } 

/*
  Display the job prospect form to edit or create job prospect
*/
function editProspectForm(prospect) { 
  if (!isUserLoggedIn()) return;
  
  $('.js-page-content').html();   
  generateProspectForm(prospect)                        
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
       <a id="DeleteStatus-${index}" href="#" class="js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
     </div>
     <div class="input-block"><label for="prospectStatusDate-${index}"     class="edit-label"><strong>Date: </strong><input type="date" id="prospectStatusDate-${index}" class="js-input-status-date" value="${thisDate.value}" ></input></div>
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
  <div id="contactFieldset-${index}" class="flex-item background-color-white js-contactFieldset">  
    <fieldset class="edit-form js-contacts-input-form">      
      <div class="input-block">
        <a id="DeleteContact-${index}" href="#" class="js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <p class="input-block"><label for="prospectContactFirstName-${index}"  class="edit-label"><strong>First name: </strong><input type="text"  id="prospectContactFirstName-${index}"  class="js-input-contact-firstname" value="${thisFirstname.value}"></input></p>
      <p class="input-block"><label for="prospectContactLastName-${index}"   class="edit-label"><strong>Last name: </strong> <input type="text"  id="prospectContactLastName-${index}"   class="js-input-contact-lastname" value="${thisLastname.value}"></input></p> 
      <p class="input-block"><label for="prospectContactEmail-${index}"      class="edit-label"><strong>Email: </strong>     <input type="email" id="prospectContactEmail-${index}"      class="js-input-contact-email" value="${thisEmail.value}"></input></p>
      <p class="input-block"><label for="prospectContactPhone-${index}"      class="edit-label"><strong>Phone: </strong>     <input type="phone" id="prospectContactPhone-${index}"      class="js-input-contact-phone" value="${thisPhone.value}"></input></p>
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
 
