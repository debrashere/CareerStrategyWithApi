'use strict';
function renderLandingPage(id) {  
    generateNonSecureData();
    if (props.isLoggedIn === true && props.hasProfile === true) {
        if (jQuery.isEmptyObject(props.PROSPECTS)) {  
            const queryPath = `userId=${props.userId}`;
            // function displayCareerStrategyResults will save user skills as part of variable USER_PROFILE
            setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
            props.PROSPECTS = data.prospect;
            if (apiReturnedError(data)) return;
            generateSecureData(props.PROSPECTS);
            }), 3000);
        }
        else
            generateSecureData(props.PROSPECTS); 
    }       
}
  
function groupBy( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );  
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group]; 
  })
}

function generateStatusList(prospects) {
    let statusList = [];
    if (prospects) {
        statusList = groupBy(prospects, function(thisProspect)
        {
            return [thisProspect.status];
        });  
    }
     
    let uniqueStatuses =  ''; 
    statusList.map( function(prospect, index) {       
        uniqueStatuses += `<span id="${prospect[0].status}" class='user-skill js-prospects-by-status'>
        <a href="#" title='prospect status'>${prospect[0].status} : ${prospect.length}</a></span> ` 
    });   
    return `<div class="section-header"><h3 tabindex="0">Prospect Status</h3></div><div>${uniqueStatuses}</div>`;
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
        uniqueCompanies += `<span class='user-skill js-prospects-by-company'>
        <a href="#" title='prospect company'>${prospect[0].where}${plength}</a></span> `         });      
         return `<div class="section-header"><h3 tabindex="0">Companies</h3></div><div>${uniqueCompanies}</div>`;
}

function generateContactList(prospects) {
  if (!prospects) return '';

  let contacts = '';
  prospects.map( function(thisProspect, index) {   
      thisProspect.contacts.map(function (contact, idx) {  
      contacts += ` 
    <div class="flex-item-widget">  
      <div class="form-field">
          <div class="widget-label">First name: </div>
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
  <div class="section-header"><h3>Contacts</h3></div>
  <div class="input-form-body">
    <div class="flex-container">
      ${contacts}   
    </div>        
  </div>`;
 
  return contactDetails;
}
 

function generateContactListOLD(prospects) {
    if (!prospects) return '';
  
    let contacts = '';
    prospects.map( function(thisProspect, index) {   
        thisProspect.contacts.map(function (contact, idx) {  
        contacts += `
        <div class="flex-item background-color-white"> 
            <div tabindex="0"><span class="inline-title">Name: </span><a href='#' title='Contact Name' id="ContactLink-${index}"  class='js-prospects-by-contact'>${contact.firstName} ${contact.lastName}</a></div>  
            <div tabindex="0"><span class="inline-title">Email:</span> <a href="mailto: ${contact.email}">${contact.email}</a></div>
            <div tabindex="0"><span class="inline-title">Phone:</span> <a href="tel:${contact.phone}">${contact.phone}</a></div>
            <div hidden><span class="js-contactId" id="Contact-${index}" hidden>${contact._id}</span></div>
        </div>`;
        });
    });
       
    let contactsHeaderAndDetails = `
    <div class="flex-container">
      <div class="section-header"><h3 tabindex="0">Contacts</h3></div>         
        ${contacts}   
    </div> `;  
         
    return contactsHeaderAndDetails;
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
    $( ".js-page-content" ).html('');
    if (!prospects || prospects.length === 0) {
        $('.js-page-content').append(generateNoProspectsMessage());
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
    let landing =  
      `<div class="sidesection w3-light-grey" style="margin-left:auto;margin-right:auto;max-width:230px">
            <div class="w3-container w3-dark-grey">
                <h1>Careeer Strategy and Planning</h1>
            </div>     
        </div>
       `;   
      
    $('.js-page-content').append(`${landing}`);                 
  } 