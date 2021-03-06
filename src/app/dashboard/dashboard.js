'use strict';
function renderDashboardPage(id) {  
    generateNonSecureData();
    if (props.isLoggedIn === true && props.hasProfile === true) {
        if (jQuery.isEmptyObject(props.PROSPECTS)) {  
            const queryPath = `userId=${props.userId}`; 
            setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
              if (apiReturnedError(data)) return;

              props.PROSPECTS = (data && data.prospect) ? data.prospect : [];        
              generateSecureData(props.PROSPECTS);
            }), 3000);
        }
        else
            generateSecureData(props.PROSPECTS); 
    }       
}
  
function updateCurrentStatusForEachProspect(prospects) {
  if (!prospects) return "";

  prospects.forEach(function (prospect) {
    let currentStatus = null;
    if (!prospect.statusHistory) prospect.statusHistory = [];
    prospect.statusHistory.forEach(function (status) {
      if (currentStatus == null)  
          currentStatus = status;
      else if (currentStatus.date < status.date)
        currentStatus = status;
      });

      prospect.status = currentStatus == null ? "NoStatus" : currentStatus.status;            
    });  
}

function generateStatusList(prospects) {
    let statusList = [];
    if (prospects) {
       updateCurrentStatusForEachProspect(prospects);
        statusList = groupBy(prospects, function(thisProspect)
        {
            return [thisProspect.status == null ? "" : thisProspect.status.trim()];         
        });  
    }
     
    let uniqueStatuses =  ''; 
    statusList.map( function(prospect, index) {       
        uniqueStatuses += `<span id="${prospect[0].status}" class='widget-button-one js-prospects-by-status'>
        <a href="#" title='prospect status'>${prospect[0].status} : ${prospect.length}</a></span> ` 
    });   
    return `<div class="section-header"><h2 tabindex="0">Prospect Status</h2></div><div>${uniqueStatuses}</div>`;
}

function generateCompanyList(prospects) { 
    let whereList = [];
    if (prospects ) {
        whereList = groupBy(prospects, function(thisProspect)
        {
            return [thisProspect.where];
        });  
    }
        
    let uniqueCompanies =  ''; 
    whereList.map( function(prospect, index) {       
        let plength = (prospect.length === 1) ? '' : `: ${prospect.length}`;
        uniqueCompanies += `<span class='widget-button-one js-prospects-by-company'>
        <a href="#" title='prospect company'>${prospect[0].where}${plength}</a></span> `         });      
         return `<div class="section-header"><h2 tabindex="0">Companies</h2></div><div>${uniqueCompanies}</div>`;
}

function generateContactList(prospects) {
  if (!prospects) return '';

  let contacts = '';
  prospects.map( function(thisProspect, index) {   
      thisProspect.contacts.map(function (contact, idx) {  
      contacts += ` 
    <div class="flex-item-widget">  
      <div class="form-field">
          <div class="widget-label">Name: </div>
          <div class="widget-texbox"  tabindex="0"><a href='#' title='Contact Name' id="ContactLink-${index}"  class='js-prospects-by-contact'>${contact.firstName} ${contact.lastName}</a></div>
      </div>
      <div class="form-field">
          <div class="widget-label">Email: </div>
          <div class="widget-texbox"  tabindex="0"><a href="mailto: ${contact.email}">${contact.email}</a></div>
      </div>
      <div class="form-field">
          <div class="widget-label">Phone: </div>
          <div class="widget-texbox"  tabindex="0"><a href="tel:${contact.phone}">${contact.phone}</a></div>
      </div>
      <div hidden><span class="js-contactId" id="Contact-${index}" hidden>${contact._id}</span></div>
    </div> `;
    });
  });
    
  let contactDetails =  `  
  <div class="section-header"><h2>Contacts</h2></div>
  <div class="input-form-body">
    <div class="flex-container">
      ${contacts}   
    </div>        
  </div>`;
 
  return contactDetails;
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
 
/*     
   render profile information (user name, email address, phone number)
*/
function generateSecureData(prospects) {         
    if (!prospects || prospects.length === 0) {
      displayPageMessageWarning(generateNoProspectsMessage());
      generateOverview()
      return;
    }

    let statusList = generateStatusList(prospects);
    let companyList = generateCompanyList(prospects);
    let contactsList = generateContactList(prospects);
    $('.js-page-content').append(`${statusList}`);   
    $('.js-page-content').append(`${companyList}`); 
    $('.js-page-content').append(`${contactsList}`); 
    $('.js-contactId').hide();                
  } 

/*     
   render profile information (user name, email address, phone number)
*/
function generateNonSecureData() {   
    $( ".js-page-content" ).html('');
    let dashboard =  
      `<div class="site-title">   
          <h1>Career Strategy and Planning</h1>          
        </div>
       `;   
      
    $('.js-page-content').append(`${dashboard}`);                 
  } 

function generateOverview() {   
  $( ".js-page-content" ).html('');
  let overview =  
    `<div>
      <h3>Example Summary of Job Prospects</h3>
      <img id="Prospect summary image" alt="login image" src="../src/app/common/images/CS_landingPageWithProspects.jpg">
    </div> `;   
    
  $('.js-page-content').append(`${overview}`); 
} 

function setupDashboardHandlers() {
    /* presentational only functions */
    $(document).on('click','.js-prospects-by-status',function(e){e.preventDefault(); renderJobsSummariesByStatus(e); }); 
    $(document).on('click','.js-prospects-by-company',function(e){e.preventDefault(); renderJobsSummariesByCompany(e); });
    $(document).on('click','.js-prospects-by-contact',function(e){e.preventDefault(); renderJobsSummariesByContact(e); });
    $(document).on('click','.js-add-new-job-prospect',function(e){e.preventDefault(); renderProspectForm(); });         
}

$(setupDashboardHandlers);