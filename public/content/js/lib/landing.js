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
        uniqueStatuses += `<span id="${prospect[0].status}" class='user-skill js-prospect-by-status'>
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
        uniqueCompanies += `<span class='user-skill js-prospect-by-company'>
        <a href="#" title='prospect company'>${prospect[0].where}${plength}</a></span> `         });      
         return `<div class="section-header"><h3 tabindex="0">Companies</h3></div><div>${uniqueCompanies}</div>`;
}

function generateContactList(prospects) {          
    let tableRows = '';  
    prospects.map( function(thisProspect, index) {   
        thisProspect.contacts.map(function (contact, idx) {
            tableRows += `
            <div class="tr">  
              <div class="td" data-header="Name"><a href='#' title='Contact Name' class='js-prospect-by-contact'>${contact.firstName} ${contact.lastName}</a></div>        
              <div class="td" data-header="Email">${contact.email}</div>
              <div class="td" data-header="Phone">${contact.phone}</div>
              <div class="td" hidden><span class="js-contactId" id="Contact-${index}" hidden>${contact._id}</span></div>
            </div>`;
        });                    
    });  
    
    let table =   `
    <div class="flex-item-status">
        <div class="section-header"><h3 tabindex="0">Contacts</h3></div>
        <output><div id="js-status-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
        <div class="table">
        <div class="tr th"> 
            <div class="td">Name</div>          
            <div class="td">Email</div>   
            <div class="td">Phone</div>                                     
        </div>
        ${tableRows}   
        </div> `;  
        
        return table;
}
   
/*     
   render profile information (user name, email address, phone number)
*/
function generateSecureData(prospects) {         
    $( ".js-page-content" ).html('');
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