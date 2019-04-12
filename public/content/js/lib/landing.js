function renderLandingPage(id) {  
    generateNonSecureData();
    if (props.loggedIn === true && props.hasProfile === true) {
        const queryPath = `userId=${userId}`;
        // function displayCareerStrategyResults will save user skills as part of variable USER_PROFILE
        // user's skills will be accessed by function renderJobProspects
        setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
        PROSPECTS = data.prospect;
        generateSecureData(data);
        }), 3000);
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
function generateStatusList(data) {
    let statusList = [];
    if (data && data.prospect ) {
        statusList = groupBy(data.prospect, function(thisProspect)
        {
            return [thisProspect.status];
        });  
    }
     
    let uniqueStatuses =  ''; 
    statusList.map( function(prospect, index) {       
        uniqueStatuses += `<span class='user-skill'>${prospect[0].status} : ${prospect.length}</span> ` 
    });   
    return `<div class="section-header"><h3 tabindex="0">Prospect Status List</h3></div><div>${uniqueStatuses}</div>`;
}

function generateCompanyList(data) { 
    let whereList = [];
    if (data && data.prospect ) {
        whereList = groupBy(data.prospect, function(thisProspect)
        {
            return [thisProspect.where];
        });  
    }
        
    let uniqueCompanies =  ''; 
    whereList.map( function(prospect, index) {       
        plength = (prospect.length === 1) ? '' : `: ${prospect.length}`;
        uniqueCompanies += `<span class='user-skill'>${prospect[0].where}${plength}</span> ` 
        });   
    return `<div class="section-header"><h3 tabindex="0">Companies</h3></div><div>${uniqueCompanies}</div>`;
}

function generateContactList(data) {      
    let tableRows = '';  
    data.prospect.map( function(thisProspect, index) {   
        thisProspect.contacts.map(function (contact, idx) {
            tableRows += `
            <div class="tr">  
              <div class="td" data-header="Type">${contact.firstName}</div>
              <div class="td" data-header="First"> ${contact.lastName}</div>
              <div class="td" data-header="Last">${contact.email}</div>
              <div class="td" data-header="Email">${contact.phone}</div>
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
            <div class="td">First</div>
            <div class="td">Last</div>    
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
function generateSecureData(data) { 
    if (apiReturnedError(data)) return;
       
    $( ".js-page-content" ).html('');
    let statusList = generateStatusList(data);
    let companyList = generateCompanyList(data);
    let contactsList = generateContactList(data);
    $('.js-page-content').append(`${statusList}`);   
    $('.js-page-content').append(`${companyList}`); 
    $('.js-page-content').append(`${contactsList}`);                
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
  
  
  
  