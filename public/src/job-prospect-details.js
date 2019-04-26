'use strict';

function generatePropectDetails(prospect) {

    return `
    <div class="header">
      <h1>Career Strategy</h1>
      <h3 tabindex="0">Job Prospects <img  class="js-edit-this-job-prospect" alt="edit job prospect" src="./images/icon-add.png">(Edit)</a></h3>
      <h2 tabindex="0">${prospect.what}</h3>
      <h2 tabindex="0">${prospect.where}</h3>
    </div>
    <div class="responsive-tabs">
      <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
      <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
      <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
      <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
  
      <div class="tabs flex-tabs">
        <label for="tab-one" id="tab-one-label" class="tab">Summary</label>
        <label for="tab-two" id="tab-two-label" class="tab">Job Skills</label>
        <label for="tab-three" id="tab-three-label" class="tab">Contacts</label>
        <label for="tab-four" id="tab-four-label" class="tab">Status History</label>
        <div id="tab-one-panel"   class="panel active"> ${generateWhatWhereDate(prospect)} </div>
        <div id="tab-two-panel"   class="panel"> ${generateUserAndJobSkills(props.USER_PROFILE, prospect)} </div>
        <div id="tab-three-panel" class="panel"> ${generateContacts(prospect)} </div>
        <div id="tab-four-panel"  class="panel"> ${generateStatusHistory(prospect)} </div>
      </div>
    </div>`;
}


function generateContacts(prospect) {  
  let contactsList = '';

  prospect.contacts.map( function(contact, index) { 
    contactsList += ` 
    <div class="flex-item-widget">  
      <div class="form-field">
          <div class="widget-label">First name: </div>
          <div class="widget-texbox"  tabindex="0">${contact.firstName}</div>
      </div>
      <div class="form-field">
          <div class="widget-label">Last name: </div>
          <div class="widget-texbox"  tabindex="0">${contact.lastName}</div>
      </div>
      <div class="form-field">
          <div class="widget-label">Email: </div>
          <div class="widget-texbox"  tabindex="0">${contact.email}</div>
      </div>
      <div class="form-field">
          <div class="widget-label">Phone: </div>
          <div class="widget-texbox"  tabindex="0">${contact.phone}</div>
      </div>
    </div> `;
  });
    
  let contactDetails =  `  
  <div class="input-form-body">
    <div class="flex-container">
      ${contactsList}   
    </div>        
  </div>`;
 
  return contactDetails;
}
 
function generateStatusHistory(prospect) {
  let statusList = '';

  prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);
    let formattedDate = `${dateStatus.getMonth()}/${dateStatus.getDay()}/${dateStatus.getFullYear()}
     - ${dateStatus.getHours()}:${dateStatus.getMinutes()}:${dateStatus.getSeconds()} `;     

     statusList += ` 
     <div class="flex-item-widget">  
       <div class="form-field">
           <div class="widget-label">Date: </div>
           <div class="widget-texbox"  tabindex="0">${formattedDate}</div>
       </div>
       <div class="form-field">
           <div class="widget-label">Status: </div>
           <div class="widget-texbox"  tabindex="0">${status.status}</div>
       </div>
       <div class="form-field">
           <div class="widget-label">Comment: </div>
           <div class="widget-texbox"  tabindex="0">${status.comment}</div>
       </div>
      </div> `;
      });
    

      let headerAndDetails =  `  
      <div class="input-form-body">
        <div class="flex-container">
          ${statusList}   
        </div>        
      </div>`;

      return headerAndDetails;
}
  
/*     
   render user skills
*/
function generateUserAndJobSkills(profile, prospect) { 

  let skills = generateJobSkills(prospect);
      skills += generateUserSkills(profile);

    return skills;
}

/*     
   render job skills
*/
function generateJobSkills(prospect) {  
  let skills = '';
 
  /* formats links for the existing job skills */
  if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) {
    skills += '<p class="items flex-item-skillset">';
    prospect.jobSkills.map( function(skill, index) {          
      skills +=  `<a href="#" id="jobSkill${index}" class="skill-link js-edit-job-skill">${skill.skill}</a>`;            
      });  
    skills += '</p>';   
  }  

  let headerAndSkills = `
    <div class="flex-item-skills js-master-skills">
      <div class="section-header"><h3 tabindex="0">Job skills</h3></div>  
      ${skills}
    </div> `; 

  return headerAndSkills; 
}


/*     
   render user skills
*/
function generateUserSkills(profile) {  
  let skills = "";       
   // if the user has any skills, format the html to display them
  if (profile.skills) {
    profile.skills.map( function(skill, index) {          
      skills +=  `<span "userSkill${index}" class="skill-span">${skill.skill}</span>`;            
     });  
    } 
  
    let skillHeaderAndDetails = `
    <div class="flex-item-skills">          
      <div class="section-header"><h3 tabindex="0">Your Skills (go to <a href="#" id="menuitem-myskills" class="js-menuitem-myskills-details-link" title="My Skills">My Skills"</a> to edit")</h3></div>                  
      <p class="items flex-item-skillset">
       ${skills}
      </p>
    </div>`;  
    
    return skillHeaderAndDetails;
}

function generateWhatWhereDate(prospect) {      
  let dateWhen = new Date(prospect.when);

  let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
    ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;     
      
      let summary = `  
      <div class="flex-item-widget">
        <div class="form-field">
            <div class="widget-label">What</div>
            <div class="widget-texbox">${prospect.what}</div>
        </div>    
        <div class="form-field">
            <div class="widget-label">Where</div>
            <div class="widget-texbox">${prospect.where}</div>
        </div>
        <div class="form-field">
            <div class="widget-label">Date</div>
            <div class="widget-texbox">${formattedDate}</div>
        </div>
        <div class="form-field">
            <div class="widget-label">Status</div>
            <div class="widget-texbox">${prospect.status}</div>
        </div>    
        <div class="form-field">
            <div class="widget-label">Source</div>
            <div class="widget-texbox">${prospect.source}</div>
        </div>
        <div class="form-field">
          <div class="widget-label">Source URL</div>
          <div class="widget-texbox">${prospect.sourceUrl}</div>
        </div>
      </div>`;

      summary += `
      <div class="flex-item-widget">
        <div class="form-field">
          <div class="widget-label">Day to Day</div>
          <textarea  rows="4" cols="40" alue="${prospect.dayToDay}" >${prospect.dayToDay}</textarea>
        </div>
        <div class="form-field">
          <div>Contact</div>
          <textarea rows="2" cols="40" value="${prospect.contact}" >${prospect.contact}</textarea>
        </div>
        <div class="form-field">
          <div>Comments</div>
          <textarea rows="4" cols="40" value="${prospect.comments}" >${prospect.comments}</textarea>
        </div>
        <div class="form-field">
          <div>Details</div>
          <textarea  rows="4" cols="40"  value="${prospect.details}" >${prospect.details}</textarea>
        </div>
      </div> `; 

    const summaryDetails = `
    <div class="input-form-body">
      <div class="flex-container">
        ${summary}   
      </div>        
    </div>`;

  return summaryDetails;            
}

function renderJobProspectDetails(event) {
  if (!isUserLoggedIn()) return;
  if (!canAccessProfile()) return; 

  const id = `#${event.currentTarget.id}`;   
  let prospectId = $(id).parent().parent().find('.js-prospectId').text(); 
  props.prospectId = prospectId;
  refreshJobProspectDetails(prospectId);
}
   
function refreshJobProspectDetails(prospectId) {   
    const queryPath = `userId=${props.userId}`;
    setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
      props.PROSPECTS = data.prospect;
      if (apiReturnedError(data)) return;

      generateJobProspectDetails(prospectId);
    }), 3000);  
}

function generateJobProspectDetails(prospectId) {  
    let prospect = props.PROSPECTS.filter( id => id.id === prospectId)[0];
    props.prospect = prospect;
  
    $('.js-page-content').html(`${ generatePropectDetails(prospect)}`);
    $('.js-prospectId').hide();
    $('.js-contactId').hide();
    $('.js-statusId').hide(); 
}
