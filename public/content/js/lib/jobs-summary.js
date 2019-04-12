function renderJobsSummaries() {  
  if (!isUserLoggedIn()) return;
  const queryPath = `userId=${userId}`;
  // function displayCareerStrategyResults will save user skills as part of variable USER_PROFILE
  // user's skills will be accessed by function renderJobProspects
  setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
    PROSPECTS = data.prospect;
    renderJobProspects(data);
  }), 3000);
}

function renderJobProspects(data) {
    if (apiReturnedError(data)) return;
    
    if (!data || !data.prospect || data.prospect === []) {
      displayProspectsSummaryForm();
      return;
    }
      
    $( ".js-page-content" ).html('');
          
    let tableRows =  '';

    data.prospect.map( function(prospect, index) {  
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

   $('.js-page-content').append(`${table}`);  
}
 