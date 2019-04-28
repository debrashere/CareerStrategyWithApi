'use strict';
function renderJobsSummaries() {
    if (!isUserLoggedIn()) return;
    if (!canAccessProfile()) return; 

    const queryPath = `userId=${props.userId}`;
    // function displayCareerStrategyResults will save user skills as part of USER_PROFILE
    setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
      props.PROSPECTS = data.prospect;
      renderJobProspects(data);
    }), 3000);
}

/*
  If user has not entered any job prospect yet display this content
*/
function generateNoProspectsMessage() {
  let message =  `
  <div class="flex-container section-block">  
    <div class="flex-item section-sub-header">Welcome to Career Strategy</div>
    <div> You have not entered any job prospects yet. You can do so now by going to <a href=# class="js-add-new-job-prospect"> new job prospect</a>.</div>   
  </div>`;
    
  return message;  
}

function generateJobSummaries(prospects) {
  if ( !props.PROSPECTS || props.PROSPECTS.length === 0) 
    return generateNoProspectsMessage();

  let summaries =  '';

  prospects.map( function(prospect, index) {
    const formattedDate = toDatetimeStringFormat(prospect.when);
    summaries += `
    <div class="flex-container section-block">  
      <div class="flex-item section-sub-header"><a id="prospectId-${index}" href=# class="js-prospect-detail">${prospect.what}</a></div>
      <div class="flex-item">${prospect.where}</div>   
      <div class="flex-item">${formattedDate}</div>
      <div class="flex-item">${prospect.status}</div>
      <div class="flex-item" hidden><span class="js-prospectId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
    </div>`;
  });    

  return summaries;  
}
 
function renderJobsSummariesByStatus(event) {
  if (!isUserLoggedIn()) return;

  const thisStatus = `${event.currentTarget.innerText.split(':')[0].trim()}`;       
  const filteredProspects = props.PROSPECTS.filter( s => s.status.trim() === thisStatus);                  
  $('.js-page-content').html(generateJobSummaries(filteredProspects));  
  $('.js-prospectId').hide();
}

function renderJobsSummariesByCompany(event) {
  if (!isUserLoggedIn()) return;

  const thisCompany = `${event.currentTarget.innerText.split(':')[0].trim()}`;      
  const filteredProspects = props.PROSPECTS.filter( s => s.where.trim() === thisCompany);                  
  $('.js-page-content').html(`${generateJobSummaries(filteredProspects)}`); 
  $('.js-prospectId').hide(); 
}

function renderJobsSummariesByContact(event) {
  if (!isUserLoggedIn()) return;

  const thisContact = `${event.currentTarget.innerText.trim()}`;   
  $( ".js-page-content" ).html('');

  let filteredProspects = [];
  props.PROSPECTS.forEach(function (prospect, index) {
    prospect.contacts.forEach(function (contact, index){
      if (`${contact.firstName.trim()} ${contact.lastName.trim()}` === thisContact)
        filteredProspects.push(prospect);
    })
  });
                
  $('.js-page-content').append(`${generateJobSummaries(filteredProspects)}`);  
  $('.js-prospectId').hide();
}

function renderJobProspects(data) {
    if (apiReturnedError(data)) return;
    
    if (!data || !data.prospect || data.prospect === []) {
      renderProspectForm();
      return;
    }
                 
    $('.js-page-content').html(`${generateJobSummaries(data.prospect)}`);  
    $('.js-prospectId').hide();
}
 