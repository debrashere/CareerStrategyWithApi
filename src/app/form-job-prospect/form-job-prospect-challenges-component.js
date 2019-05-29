'use strict'; 
 
function generateChallengesForm(prospect) {  
 const currentDate = toDatetimeStringFormat(new Date());

    let challengeList = '';    
    if (prospect && prospect.challenges) {
    prospect.challenges.map( function(challenge, index) { 
      const formattedDateRequested = toDatetimeStringFormat(challenge.dateRequested);
      const formattedDateCompleted = toDatetimeStringFormat(challenge.dateCompleted);
      challengeList += ` 
      <fieldset id="challengesFieldset-${index}" class="flex-item js-challengesFieldset">  
      <div class="input-block">
            <a id="DeleteChallengs-${index}" href="#" class="form-link js-delete-job-challenge"><img  alt="delete job challenge" src="../src/app/common/images/icon-delete.png">(Delete)</a>
      </div>
      <div class="form-field">
          <label for="challengeType-${index}">Challenge Type</label>
          <input id="challengeType-${index}" type="text" class="form-input  js-input-challenge-type" placeholder="Date" value="${challenge.challengeType}" aria-required="true" required>
      </div>          
      <div class="form-field">
        <label for="dateRequested-${index}">Date Requested</label>
        <input id="dateRequested-${index}" type="datetime-local" class="form-input  js-input-challenge-date-requested" placeholder="Date Requested" value="${formattedDateRequested}" aria-required="true" required>
      </div>        
      <div class="form-field">
        <label for="dateCompleted-${index}">Date Completed</label>
        <input id="dateCompleted-${index}" type="datetime-local" class="form-input  js-input-challenge-date-completed" placeholder="Date Completed" value="${formattedDateCompleted}" aria-required="false" required>
      </div>    
      <div class="form-field">
          <label for="comments-${index}"><span>Comments</span></label>
          <input id="comments-${index}" type="text" class="form-input  js-input-challenge-comments" placeholder="Comments" value="${challenge.comments}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="url-${index}"><span>Url</span></label>
          <textarea id="url-${index}" class="form-input  js-input-challenge-url"  rows="4" cols="30" placeholder="Url"" value="${challenge.url}" >${challenge.url}</textarea>    
      </div>
      <div class="form-field">
          <label for="companyurl-${index}"><span>CompanyUrl</span></label>
          <textarea id="companyurl-${index}" class="form-input  js-input-challenge-companyurl"  rows="4" cols="30" placeholder="Company Url"" value="${challenge.results}" >${challenge.companyUrl}</textarea>    
      </div> 
      <div class="form-field">
          <label for="langquage-${index}"><span>Lanquage</span></label>
          <textarea id="langquage-${index}" class="form-input  js-input-challenge-langquage"  rows="4" cols="30" placeholder="Lanquage"" value="${challenge.langquage}" >${challenge.langquage}</textarea>    
      </div>                     
      </fieldset> `;
    });
  }
    let newChallengeFields = `
    <fieldset id="challengeFieldset" class="flex-item js-new-challenge-form">   
    <a id="AddChallenge" href="#" class="form-link js-add-job-challenge"><img id="addNewChallenge" alt="add challenge" src="../src/app/common/images//icon-add.png">(Add)</a>
    <div class="form-field">
            <input id="challengeType" type="text" class="form-input js-challengeType" placeholder="Challenge Type" value="" aria-required="true" required>
        </div>
        <div class="form-field">
            <input id="challengeDateRequested" type="datetime-local" class="form-input js-challengeDateRequested" placeholder="Date Requested"  value="${currentDate}" aria-required="true" required>
        </div>
        <div class="form-field">
            <input id="challengeDateCompleted" type="datetime-local" class="form-input js-challengeDateCompleted" placeholder="Date Completed" value="" >
        </div>
        <div class="form-field">
          <input id="challengeComments" type="text" class="form-input js-challengeComments" placeholder="Comments" value="" >
        </div>
        <div class="form-field">
          <input id="challengeResults" type="text" class="form-input js-challengeResults" placeholder="Results" value="" >
        </div>   
        <div class="form-field">
          <input id="challengeUrl" type="text" class="form-input js-challengeUrl" placeholder="Url" value="" >
        </div> 
        <div class="form-field">
        <input id="challengeLanguage" type="text" class="form-input js-challengeLanguage" placeholder="Language" value="" >
      </div> 
      <div class="form-field">
      <input id="challengeCompanyUrl" type="text" class="form-input js-challengeCompanyUrl" placeholder="Company Url" value="" >
    </div>              
        </fieldset> `;
        
        let challengesForms =  `  
        <div class="input-form-body">
          <form action="" method="post" class="form form-element flex-container js-tab-challenge">
            ${newChallengeFields}     
            ${challengeList}   
          </form>        
        </div>`;       
    
    return challengesForms;
}

function deleteJobChallengeForm(event) {
    const id = `#${event.currentTarget.id}`; 
    const index = id.split('-')[1];
    const toRemove = `challengeFieldset-${index}`;
    $(`#${toRemove}`).detach();
  }
  
function addJobChallengeForm(event) {
  const existingChallenge = $('.js-challengeFieldset');
  let index = 0;
  let lastChallenge = $('.js-new-challenge-form')[0];

  if (existingChallenge && existingChallenge.length > 0) {
    lastChallenge = existingChallenge.last()[0];
    index =  parseInt(lastChallenge.id.split('-')[1]);
    index = index + 1;
  }

    /* retrive the input fields for a new challenge */
  const thisChallengeType = $('#challengeType')[0];
  const thisDateRequested = $('#challengeDateRequested')[0];
  const thisDateCompleted = $('#challengeDateCompleted')[0];
  const thisComments = $('#challengeComments')[0];
  const thisResults = $('#challengeResults')[0];
  const thisUrl = $('#challengeUrl')[0];
  const thisCompanyUrl = $('#challengeCompanyUrl')[0];
  const thisLanguage = $('#challengeLanguage')[0];

    /* check each input field for errors */
    // clear form of error messages
    $( ".form-error" ).remove();
    let allPassed = [];
    allPassed.push(!isInputValid(thisDateRequested.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-challengeDateRequested')); 
    allPassed.push(!isInputValid(thisChallengeType.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-challengeType'));
    allPassed.push(!isInputValid(thisDateCompleted.value, ['nonEmpty', 'isTrimmed'], 'js-challengeDateCompleted'));
    
  /* if any errors return */
  if (jQuery.inArray(true, allPassed) !== -1) return;

  const newChallenge =`
    <div id="challengeFieldset-${index}" class="flex-item js-challengeFieldset"> 
    <fieldset id="challengeFieldset-${index}" class="flex-item js-challengeFieldset">  
      <div>
        <a id="DeleteChallengs-${index}" href="#" class="form-link js-delete-job-challenge"><img alt="delete job challenge" src="../src/app/common/images/icon-delete.png">(Delete)</a>
      </div>  
      <div class="form-field">
          <label  for="challengeType-${index}">Date Requested</label>
          <input id="challengeType-${index}" type="text" class="form-input  js-input-challenge-type" placeholder="Challenge Type" value="${thisChallengeType.value}" aria-required="true" required>
      </div>      
      <div class="form-field">
          <label  for="challengedaterequested-${index}">Date Requested</label>
          <input id="challengedaterequested-${index}" type="text" class="form-input  js-input-challenge-date-requested" placeholder="Date Requested" value="${thisDateRequested.value}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="challengedatecompleted-${index}">Date Completed</label>
          <input id="challengedatecompleted-${index}" type="text" class="form-input  js-input-challenge-date-completed" placeholder="Date Completed" value="${thisDateCompleted.value}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="challengecomments-${index}">Comments</label>
          <input id="challengecomments-${index}" type="text" class="form-input  js-input-challenge-comments" placeholder="Comments" value="${thisComments.value}" >
      </div>
      <div class="form-field">
          <label for="challengeresults-${index}">Results</label>
          <input id="challengeresults-${index}" type="text" class="form-input  js-input-challenge-results" placeholder="Results" value="${thisResults.value}" >
      </div>  
      <div class="form-field">
        <label for="challengeresults-${index}">Url</label>
        <input id="challengeresults-${index}" type="text" class="form-input  js-input-challenge-url" placeholder="Url" value="${thisUrl.value}" >
       </div>
      <div class="form-field">
        <label for="challengeresults-${index}">Company Url</label>
        <input id="challengeresults-${index}" type="text" class="form-input  js-input-challenge-comments" placeholder="Company Url" value="${thisCompanyUrl.value}" >
      </div>
      <div class="form-field">
        <label for="challengeresults-${index}">Language</label>
        <input id="challengeresults-${index}" type="text" class="form-input  js-input-challenge-language" placeholder="Language" value="${thisLanguage.value}" >
      </div>   
    </fieldset> `;
  
  
  /* add this new challenge to the challenge list */
  $( newChallenge ).insertAfter( lastChallenge);   
  
  /* clear the input fields */ 
  const formattedDate = toDatetimeStringFormat(new Date());
  $('#challengeDateRequested').val(formattedDate);
  $('#challengeDateRComplete').val("");
  $('#challengeComments').val("");
}

function setupChallengeHandlers() {
  $(document).on('click','.js-delete-job-challenge',function(e){e.preventDefault(); deleteJobChallengeForm(e); });            
  $(document).on('click','.js-add-job-challenge',function(e){e.preventDefault(); addJobChallengeForm(e); });
  
}

$(setupChallengeHandlers);