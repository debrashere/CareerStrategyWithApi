'use strict';

function generateContacts(prospect) {
  if (!prospect) return '';

  let contacts ='';
  prospect.contacts.map( function(contact, index) {   
     contacts += `
     <div class="flex-item background-color-white">  
       <div tabindex="0"><span class="inline-title">Type:</span> ${contact.contactType}</div>
       <div tabindex="0"><span class="inline-title">First name:</span> ${contact.firstName}</div>
       <div tabindex="0"><span class="inline-title">Last name:</span> ${contact.lastName}</div>
       <div tabindex="0"><span class="inline-title">Email:</span> ${contact.email}</div>
       <div tabindex="0"><span class="inline-title">Phone:</span> ${contact.phone}</div>
       <div hidden><span class="js-contactId" id="Contact-${index}" hidden>${prospect.id}</span></div>
     </div>`;
  });
     
  let contactsHeaderAndDetails = `
  <div class="flex-container">
    <div class="section-header"><h3 tabindex="0">Contacts</h3></div>         
      ${contacts}   
  </div> `;  
       
  return contactsHeaderAndDetails;
}

function generateStatusHistory(prospect) {
  let statusList = '';

  prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);
    let formattedDate = `${dateStatus.getMonth()}/${dateStatus.getDay()}/${dateStatus.getFullYear()}
     - ${dateStatus.getHours()}:${dateStatus.getMinutes()}:${dateStatus.getSeconds()} `;     

     statusList += `
     <div class="flex-item background-color-white">  
       <div tabindex="0"><span class="inline-title">Date: </span> ${formattedDate}</div>
       <div tabindex="0"><span class="inline-title">Status: </span> ${status.status}</div>
       <div tabindex="0"><span class="inline-title">Comment: </span> ${status.comment}</div>
       <div hidden><span class="js-statusId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
     </div>`;
    }); 
    
    let headerAndDetails = `
      <div class="flex-container">
        <div class="section-header"><h3 tabindex="0">Status History</h3></div>        
         ${statusList}   
      </div>`;
       
      return headerAndDetails;
}
  
/*     
   render user skills
*/
function generateUserSkillsForProspect(profile) { 

  let skills = "";       
   // if the user has any skills, format the html to display them
  if (profile.skills) {
    profile.skills.map( function(skill, index) {          
      skills +=  `<span "userSkill${index}" class="skill-span js-edit-user-skill">${skill.skill}</span>`;            
     });  
    } 
  
    let skillHeaderAndDetails = `
    <div class="flex-item-skills">
      <div class="section-header"><h3 tabindex="0">Your Skills (go to "My Skills" to edit")</h3></div>             
      <p class="items flex-item-skillset">
       ${skills}
      </p>
    </div>`;  

    return skillHeaderAndDetails;
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
      <div class="table">
        <div class="tr th"> 
          <div class="td">Skill</div> 
          <div class="td"> </div>     
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newJobSkill"></input></div>
          <div class="td" data-header=""><a id="AddJobSkill" href="#" class="js-add-job-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
          <a id="DeleteMasterSkill" href="#" class="js-delete-job-skill"><img id="deleteThisJobSkill" alt="delete job skill" src="./images/icon-delete.png">(Delete)</a></div>
        </div>
      </div>
      ${skills}
    </div> `; 

  return headerAndSkills; 
}

function generateSourceDayToDayComments(prospect) {
  return `
    <div class="flex-container background-color-white">
      <div class="flex-item">
        <div class="section-header"><h3 tabindex="0">Source and Details </h3></div>
        <div tabindex="0"><span class="inline-title">Source: </span> ${prospect.source}</span></div>    
        <div tabindex="0"><span class="inline-title">Source Url: </span> <a href='${prospect.sourceUrl}' target=_blank>${prospect.sourceUrl}</a></span></div>                                     
        <div tabindex="0"><span class="inline-title">Details: </span> ${prospect.details}</span></div> 
        <div tabindex="0"><span class="inline-title">Day to day: </span> ${prospect.dayToDay}</span></div> 
        <div tabindex="0"><span class="inline-title">Comments: </span> ${prospect.comments}</span></div>          
      </div>
    </div>
  `;
}

function generateWhatWhereDate(prospect) {      
  let index = 1;
  let dateWhen = new Date(prospect.when);

  let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
    ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;     

    let whatWhereDate = `
    <div class="tr">  
      <div class="td" data-header="Title">${prospect.what}</div>
      <div class="td" data-header="Company"> ${prospect.where}</div>
      <div class="td" data-header="When">${formattedDate}</div>
      <div class="td" data-header="Status">${prospect.status}</div>
      <div class="td" hidden><span class="js-prospectId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
    </div>`;
    
    
    let headerAndDetails = `
    <div class="flex-item-skills">
      <div class="section-header"><h3 tabindex="0">Job Prospects <img  class="js-edit-this-job-prospect" alt="edit job prospect" src="./images/icon-add.png">(Edit)</a></h3></div>
      <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
      <div class="table">
        <div class="tr th"> 
          <div class="td">Title</div> 
          <div class="td">Company</div>
          <div class="td">When</div> 
          <div class="td">Status</div>    
        </div>
        ${whatWhereDate}   
      </div> `; 

  return headerAndDetails;            

}

function renderJobProspectDetails(event) {
  if (!isUserLoggedIn()) return;
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

  $('.js-page-content').html('');  
  $('.js-page-content').append(`${ generateWhatWhereDate(prospect)}`);
  $('.js-page-content').append(`${ generateJobSkills(prospect)}`); 
  $('.js-page-content').append(`${ generateUserSkillsForProspect(props.USER_PROFILE)}`); 
  $('.js-page-content').append(`${ generateSourceDayToDayComments(prospect) }`);  
  $('.js-page-content').append(`${ generateStatusHistory(prospect)}`); 
  $('.js-page-content').append(`${ generateContacts(prospect) }`); 
  $('.js-prospectId').hide();
  $('.js-contactId').hide();
  $('.js-statusId').hide(); 
}

  
function  deleteSkillFromJobProspect() {        
    let skill = $(`#newJobSkill`).val();

    let skillIndex = -1;
    if (!props.prospect.jobSkills) {
      props.prospect.jobSkills = []
    }

    // check if skill exists in the user's skill collection
    // if so then delete otherwise do nothing
    for(let idx=0; idx<props.prospect.jobSkills.length ; idx++)
    {
        if (props.prospect.jobSkills[idx].skill == skill) {
        skillIndex = idx;
        break;
       }
    }

    if (skillIndex > -1)
    {  
      // Remove this skill by splicing it from the collection of skills
      props.prospect.jobSkills.splice( skillIndex, 1 );  
      const skillsToKeep = `{"id": "${props.prospectId}","jobSkills": ${JSON.stringify(props.prospect.jobSkills)}}`;                         
      setTimeout(putCareerStrategyAPI(pathJobProspects, JSON.parse(skillsToKeep), props.prospectId, function(data) {                                        
        refreshJobProspectDetails(props.prospectId);
      }), 3000); 
    }    
}
 
function  editSkillForJobSprospect(event) {        
  const id = `#${event.currentTarget.id}`; 
  let skill = $(id).text();                
  // setup the skill input field
  $("#newJobSkill").val(skill);     
}

function  addSkillToJobProspect() {        
  let skill = $('#newJobSkill').val();

  let skillIndex = -1;
  if (!props.prospect.skills) {
    props.prospect.skills = []
  }

  // check if skill already exists in the job skill collection
  // if so then update instead of add
  for(let idx=0; idx< props.prospect.jobSkills.length ; idx++)
  {
      if (props.prospect.jobSkills[idx].skill == skill) {
      skillIndex = idx;
      break;
     }
  }

  if (skillIndex > -1)
  {
    props.prospect.jobSkills[skillIndex].yearsOfExperience = 1;
  }
  else {
    props.prospect.jobSkills.push(JSON.parse(`{"skill": "${skill.trim()}","yearsOfExperience":"1"}`));       
  }

  // create json object to update the user skills
  const jobSkills = `{"id": "${props.prospectId}","jobSkills": ${JSON.stringify(props.prospect.jobSkills)}}`;                         

  setTimeout(putCareerStrategyAPI(pathJobProspects, JSON.parse(jobSkills), props.prospectId, function(data) {                                        
    renderUserSkills();
  }), 3000); 
}
