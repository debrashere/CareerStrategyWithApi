'use strict' 
 
function isProspectFormValid() {

  // clear form of error messages
  $( ".form-error" ).remove();

  // check for validation errors
  checkProspectSummaryForErrors();
  checkStatusHistoryForErrors();
  checkContactsListForErrors();
  
  // check if errors found in form
  const errors = $('.form-error');
  if (errors.length > 0)
  {
    /*
      Since content is tabbed, display page level message 
      for each tab that has errors
    */
      let errorList = '';
      for (let index=0; index < errors.length; index++) 
      {
        // get form fieldSet that this error will display in 
          let tabName = '';
          let form = $(errors[index]).parents('form');    
          let classList = $(form[0])[0].classList;  
          for ( let idx=0; idx<classList.length; idx++) {
              if (classList[idx].indexOf("js-tab") > -1) {
                tabName = classList[idx].split('-')[2];
              }
          }
          if (errorList.indexOf(`Click ${tabName}`) === -1)
            errorList += `<div>Click ${tabName} to view errors found in this section</div>`;
      }
      displayPageMessageFailure(errorList);
      return false;
  }

  // no errors found return true
  return true;
}

 function generateProspectForms(prospect, profile) {

  return ` 
  <div class="header">
    <h1>Career Strategy</h1>
    <h3>Select each tab to enter all information. After you are done click "Submit" to complete your edits or new job prospect entry.</h3>
    <button type="submit" id="submitProspect" class="btn js-edit-button" >Submit</button>      
    <a id="DeleteThisProspect" href="#" class="form-link-black js-delete-job-prospect"><img alt="delete job status" src="../src/app/common/images/icon-delete.png"> (Delete this prospect)</a>
    <a href="*" class="form-link-black js-render-dashboard" > Cancel</a> 
    <h2 tabindex="0">${prospect.what}</h3>
    <h2 tabindex="0">${prospect.where}</h3>
  </div>
  <div class="responsive-tabs">
    <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
    <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
    <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
    <input class="state" type="radio" title="tab-five" name="tabs-state" id="tab-five" />
    <div class="tabs flex-tabs">
      <label for="tab-one" id="tab-one-label" class="tab">Summary</label>
      <label for="tab-two" id="tab-two-label" class="tab">Job Skills</label>
      <label for="tab-three" id="tab-three-label" class="tab">Contacts</label>
      <label for="tab-four" id="tab-four-label" class="tab">Status History</label>
      <label for="tab-five" id="tab-five-label" class="tab">Challenges</label>
      <div id="tab-one-panel"   class="panel active">${generateProspectSummaryForm(prospect)} </div>
      <div id="tab-two-panel"   class="panel"> ${generateUserAndJobSkillsForm(prospect, profile)} </div>
      <div id="tab-three-panel" class="panel"> ${generateContactsForm(prospect)} </div>
      <div id="tab-four-panel"  class="panel"> ${generateStatusHistoryForm(prospect)} </div>
      <div id="tab-five-panel"  class="panel"> ${generateChallengesForm(prospect)} </div>
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
    const companyUrl =  $('#prospectCompanyUrl').val();
    const dayToDay =  $('#prospectDayToDay').val();
    const contacts =  $('#prospectContacts').val();
    const comments =  $('#prospectComments').val();
    const details =  $('#prospectDetails').val(); 


    /* retrieve list of skills */
    const existingSkills = [];
    $('.js-job-skills-list').children('.widget-button-one').each(function(skill) {       
      existingSkills.push({
        "skill":  $(this)[0].text,
        "description" : "",
        "date" : new Date()
      });      
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

    /* retrieve list of challenges */
    const existingChallenges = [];
    const challengeType = $('.js-input-challenge-type');
    const dateRequested = $('.js-input-challenge-date-requested');
    const dateCompleted = $('.js-input-challenge-date-completed');
    const challengeComments = $('.js-input-challenge-comments');
    const results = $('.js-input-challenge-results');
    const url = $('.js-input-challenge-url');
    const challengeCompanyUrl = $('.js-input-challenge-companyurl');   
    const langquage = $('.js-input-challenge-langquage');
    for (let index=0; index< challengeType.length; index++) {
      existingChallenges.push({
        "challengeType":   challengeType[index].value,
        "dateRequested" :  dateRequested[index].value,
        "dateCompleted" :  dateCompleted[index].value,
        "comments" :  challengeComments[index].value,
        "results" :  results[index].value,
        "url" :  url[index].value,
        "companyUrl" :  challengeCompanyUrl[index].value,
        "langquage" :  langquage[index].value                 
      });
    }
  
    /* format json for submission to api */
    const jobSkills = JSON.stringify(existingSkills);
    const statusHistory = JSON.stringify(existingStatus);
    const contactsList = JSON.stringify(existingContacts);
    const challengesList = JSON.stringify(existingChallenges);
 
    /* submit new or existing job prospect */
    const prospectId =  $('#ProspectEditKey').val(); 

    // Creating new job prospect
    if (!prospectId || prospectId == undefined) {
    const jobProspect = `{"what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", 
    "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}", "companyUrl": "${companyUrl}",
    "dayToDay":  "${dayToDay}", "contact":  "${contacts}", "comments":  "${comments}", 
    "details":   "${details}",  "jobSkills": ${jobSkills}, 
    "statusHistory": ${statusHistory}, 
    "contacts": ${contactsList}
    "challenges": ${challengesList}}`; 

    setTimeout(postCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), props.userProfileId, function(data){  
        if (apiReturnedError(data)) return;                 
        renderJobsSummaries();
      }), 3000);      
  }
  else { 
    // Updating existing job prospect
    const jobProspect = `{"id":"${prospectId}","what": "${what}", "when": "${when}", "where": "${where}", "status": "${status}", "userId": "${props.userId}","source":  "${source}", "sourceUrl": "${sourceUrl}", "companyUrl": "${companyUrl}", "dayToDay":  "${dayToDay}", "contacts":  "${contacts}", "comments":  "${comments}", "details":   "${details}",  "jobSkills": ${jobSkills}, "statusHistory": ${statusHistory}, "contacts": ${contactsList}, "challenges": ${challengesList}}`;  
    setTimeout(putCareerStrategyAPI(pathJobProspects, 
      JSON.parse(jobProspect), prospectId, function(data){ 
        if (apiReturnedError(data)) return;
        refreshJobProspectDetails(prospectId);
    }), 3000);
  }  
            
}             

/*
  Delete this job prospect
*/
function submitProspectDelete() {
  /* submit delete API */
  const prospectId =  $('#ProspectEditKey').val();  

  setTimeout(deleteCareerStrategyAPI(pathJobProspects, 
    {}, prospectId, function(data){  
      renderJobsSummaries();
    }), 3000);              
}

/*
  Display the job prospect form for edits or to create a new job prospect
*/
function renderProspectForm(event, options) { 
  if (!isUserLoggedIn()) return;
  if (!canAccessProfile()) return; 

    $('.js-page-message').html();
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
        "companyUrl": "",
        "dayToDay": "",
        "contact": "",
        "comments": "",
        "details": "",
        "jobSkills": [],
        "contacts": [],
        "statusHistory": [],
        "challenges": []
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

function setupJobProspectHandlers() {
  $(document).on('click','.js-render-dashboard',function(e){e.preventDefault(); renderDashboard(); });             
  $(document).on('click','.js-delete-job-prospect',function(e){e.preventDefault(); submitProspectDelete(); });    
  $(document).on('click','#submitProspect',function(e){e.preventDefault(); submitProspectUpdates(); });        
}

$(setupJobProspectHandlers);