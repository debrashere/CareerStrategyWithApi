'use strict';
function renderJobsSummaries() {
    if (!isUserLoggedIn()) return;
      const queryPath = `userId=${props.userId}`;
      // function displayCareerStrategyResults will save user skills as part of USER_PROFILE
      setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
        props.PROSPECTS = data.prospect;
        renderJobProspects(data);
    }), 3000);
}

function generateJobSummaries(prospects) {
  let summaries =  '';

  prospects.map( function(prospect, index) {
    let dateWhen = new Date(prospect.when);
    let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
     ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;            
      
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
  if (!isUserLoggedIn() || !props.PROSPECTS) return;

  const thisStatus = `${event.currentTarget.innerText.split(':')[0].trim()}`;       
  const filteredProspects = props.PROSPECTS.filter( s => s.status === thisStatus);                  
  $('.js-page-content').html(generateJobSummaries(filteredProspects));  
  $('.js-prospectId').hide();
}

function renderJobsSummariesByCompany(event) {
  if (!isUserLoggedIn() || !props.PROSPECTS) return;
  const thisCompany = `${event.currentTarget.innerText.split(':')[0].trim()}`;      
  const filteredProspects = props.PROSPECTS.filter( s => s.where === thisCompany);                  
  $('.js-page-content').html(`${generateJobSummaries(filteredProspects)}`); 
  $('.js-prospectId').hide(); 
}

function renderJobsSummariesByContact(event) {
  if (!isUserLoggedIn() || !props.PROSPECTS) return;

  const thisContact = `${event.currentTarget.innerText.trim()}`;       
  $( ".js-page-content" ).html('');

  let filteredProspects = [];
  props.PROSPECTS.forEach(function (prospect, index) {
    prospect.contacts.forEach(function (contact, index){
      if (`${contact.firstName} ${contact.lastName}` === thisContact)
        filteredProspects.push(prospect);
    })
  });
                
  $('.js-page-content').append(`${generateJobSummaries(filteredProspects)}`);  
  $('.js-prospectId').hide();
}

function renderJobProspects(data) {
    if (apiReturnedError(data)) return;
    
    if (!data || !data.prospect || data.prospect === []) {
      displayProspectsSummaryForm();
      return;
    }
                 
    $('.js-page-content').html(`${generateJobSummaries(data.prospect)}`);  
    $('.js-prospectId').hide();
}
 