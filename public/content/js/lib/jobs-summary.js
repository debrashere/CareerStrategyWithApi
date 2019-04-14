function renderJobsSummaries() {  
  if (!isUserLoggedIn()) return;
  const queryPath = `userId=${props.userId}`;
  // function displayCareerStrategyResults will save user skills as part of USER_PROFILE
  setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
    PROSPECTS = data.prospect;
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
  <div class="section-block">  
    <div class="section-sub-header"><a id="prospectId-${index}" href=# class="js-prospect-detail">${prospect.what}</a></div>
    <div>${prospect.where}</div>   
    <div>${formattedDate}</div>
    <div>${prospect.status}</div>
    <div hidden><span class="js-prospectId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
  </div>`;
  });    

  return summaries;  
}

function generateJobSummariesOLD(prospects) {        
  let tableRows =  '';

  prospects.map( function(prospect, index) {  
    let dateWhen = new Date(prospect.when);
    let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
     ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;            
      
  tableRows += `
  <div class="tr">  
    <div class="td" data-header="Title"><a id="prospectId-${index}" href=# class="js-prospect-detail">${prospect.what}</a></div>
    <div class="td" data-header="Company"> ${prospect.where}</div>
    <div class="td" data-header="When">${formattedDate}</div>
    <div class="td" data-header="Status">${prospect.status}</div>
    <div class="td" hidden><span class="js-prospectId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
  </div>`;
  });    

  let table =   `
  <div class="flex-item-skills">
    <div class="section-header"><h3 tabindex="0">Job Prospects</h3></div>
    <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
    <div class="table">
      <div class="tr th"> 
        <div class="td">Title</div> 
        <div class="td">Company</div>
        <div class="td">When</div> 
        <div class="td">Status</div>    
      </div>
      ${tableRows}   
    </div> `;

  return table;  
}

function renderJobsSummariesByStatus() {  
  if (!isUserLoggedIn() || !props.PROSPECTS) return;

  const thisStatus = `${event.currentTarget.activeElement.innerHTML.split(':')[0].trim()}`;       
  const filteredProspects = props.PROSPECTS.filter( s => s.status === thisStatus);                  
  $('.js-page-content').html(`${generateJobSummaries(filteredProspects)}`);  
  $('.js-prospectId').hide();
}

function renderJobsSummariesByCompany() {  
  if (!isUserLoggedIn() || !props.PROSPECTS) return;
  const thisCompany = `${event.currentTarget.activeElement.innerHTML.split(':')[0].trim()}`;      
  const filteredProspects = props.PROSPECTS.filter( s => s.where === thisCompany);                  
  $('.js-page-content').html(`${generateJobSummaries(filteredProspects)}`); 
  $('.js-prospectId').hide(); 
}

function renderJobsSummariesByContact() {  
  if (!isUserLoggedIn() || !props.PROSPECTS) return;

  const thisContact = `${event.currentTarget.activeElement.innerHTML.trim()}`;       
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
 