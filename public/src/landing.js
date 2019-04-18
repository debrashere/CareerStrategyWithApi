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
    let contacts = '';  
    prospects.map( function(thisProspect, index) {   
        thisProspect.contacts.map(function (contact, idx) {
            contacts += `
            <div class="flex-item">  
              <div class="border-solid border-solid background-color-sub-heading"><a href='#' title='Contact Name' class='js-prospects-by-contact'>Name: ${contact.firstName} ${contact.lastName}</a></div>        
              <div class="flex-item border-solid background-color-content">  
                <div>Email: ${contact.email}</div>
                <div>Phone: ${contact.phone}</div>
              </div>
              <div  hidden><span class="js-contactId" id="Contact-${index}" hidden>${contact._id}</span></div>
            </div>`;
        });                    
    });  
    
    let container =   `
        <div class="section-header"><h3 tabindex="0">Contacts</h3></div>    
            <div class="flex-container">   
                ${contacts}                                      
            </div>            
        </div> `;          
        return container;
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