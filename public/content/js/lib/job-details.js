'use strict';

function generateContacts(prospect) {

  let tableRows ='';
 prospect.contacts.map( function(contact, index) {  
 
     tableRows += `
     <div class="tr">  
       <div class="td" data-header="Type">${contact.contactType}</div>
       <div class="td" data-header="First"> ${contact.firstName}</div>
       <div class="td" data-header="Last">${contact.lastName}</div>
       <div class="td" data-header="Email">${contact.email}</div>
       <div class="td" data-header="Phone">${contact.phone}</div>
       <div class="td" hidden><span class="js-contactId" id="Contact-${index}" hidden>${prospect.id}</span></div>
     </div>`;
 });
     
     let table =   `
     <div class="flex-item-status">
       <div class="section-header"><h3 tabindex="0">Contacts</h3></div>
       <output><div id="js-status-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
       <div class="table">
         <div class="tr th"> 
           <div class="td">Type</div> 
           <div class="td">First</div>
           <div class="td">Last</div>    
           <div class="td">Email</div>   
           <div class="td">Phone</div>                                     
         </div>
         ${tableRows}   
       </div> `;  
       
      return table;
}


function generateStatusHistory(prospect) {

  let tableRows ='';
 prospect.statusHistory.map( function(status, index) {  
    let dateStatus = new Date(status.date);
    let formattedDate = `${dateStatus.getMonth()}/${dateStatus.getDay()}/${dateStatus.getFullYear()}  - 
     ${dateStatus.getHours()}:${dateStatus.getMinutes()}:${dateStatus.getSeconds()} `;     

     tableRows += `
     <div class="tr">  
       <div class="td" data-header="Date">${formattedDate}</div>
       <div class="td" data-header="Status"> ${status.status}</div>
       <div class="td" data-header="Comment">${status.comment}</div>
       <div class="td" hidden><span class="js-statusId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
     </div>`;
 });
     
     let table =   `
     <div class="flex-item-status">
       <div class="section-header"><h3 tabindex="0">Status History</h3></div>
       <output><div id="js-status-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
       <div class="table">
         <div class="tr th"> 
           <div class="td">Date</div> 
           <div class="td">Status</div>
           <div class="td">Comment</div>    
         </div>
         ${tableRows}   
       </div> `;  
       
      return table;
}
 

function generateComments(prospect) {
  return `
    <div>Comments </div>           
    <div class="td"><em>Comments:</em><p tabindex="0">${prospect.comments}</p></div>  
 `;
}

function generateDaytoDayAndDetails(prospect) {
  return `
    <div>Details</div>
    <div class="td"><em>Details:</em><p tabindex="0">${prospect.details}</p></div> 
    <div class="td"><span tabindex="0"><em>Day to day:</em> ${prospect.dayToDay}</span></div>                                                   
  `;
}

function generateSource(prospect) {
  return `
    <div>Status History </div>
    <div class="td"><span tabindex="0"><em>Source:</em> ${prospect.source}</span></div>    
    <div class="td"><span tabindex="0"><em>Source Url:</em> <a href='${prospect.sourceUrl}' target=_blank>${prospect.sourceUrl}</a></span></div>              
   `;
}

function renderJobDetails() {
  if (!isUserLoggedIn()) return;
  const id = `#${event.currentTarget.activeElement.id}`;   
  let prospectId = $(id).parent().parent().find('.js-prospectId').text(); 
  let prospect = props.PROSPECTS.filter( id => id.id === prospectId)[0];
  $( ".js-page-content" ).html('');
        
  let index = 1;

    let dateWhen = new Date(prospect.when);
    let formattedDate = `${dateWhen.getMonth()}/${dateWhen.getDay()}/${dateWhen.getFullYear()}  - 
     ${dateWhen.getHours()}:${dateWhen.getMinutes()}:${dateWhen.getSeconds()} `;     

     let tableRows = `
     <div class="tr">  
       <div class="td" data-header="Title">${prospect.what}</div>
       <div class="td" data-header="Company"> ${prospect.where}</div>
       <div class="td" data-header="When">${formattedDate}</div>
       <div class="td" data-header="Status">${prospect.status}</div>
       <div class="td" hidden><span class="js-prospectId" id="Prospect-${index}" hidden>${prospect.id}</span></div>
     </div>`;
      
     
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
 $('.js-page-content').append(`${ generateJobSkills(prospect)}`); 
 $('.js-page-content').append(`${ generateUserSkills(props.USER_PROFILE)}`); 
 $('.js-page-content').append(`${ generateSource(prospect) }`); 
 $('.js-page-content').append(`${ generateDaytoDayAndDetails(prospect)}`); 
 $('.js-page-content').append(`${ generateStatusHistory(prospect)}`); 
 $('.js-page-content').append(`${ generateComments(prospect)}`); 
 $('.js-page-content').append(`${ generateContacts(prospect) }`); 
 $('.js-prospectId').hide();
}
 
 
/*     
   render job skills
*/
function generateJobSkills(prospect) {
  let skills = "";
 
    let skillHeader = ` 
    <div class="flex-item-skills">
      <div class="section-header"><h3 tabindex="0">Job Skills</h3></div>
      <output><div id="js-job-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
      <div class="table">
        <div class="tr th"> 
          <div class="td">Skill</div> 
          <div class="td experience">Years</div>
          <div class="td"> </div>     
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newJobSkill"></input></div>
          <div class="td" data-header="Experience"> <input type="text" id="jobSkillYears"></input></div>
          <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-job-skill"><img id="addNewJobSkill" alt="add job skill" src="./images/icon-add.png">(Add)</a></div>
        </div>
      </div>            
      <div class="items flex-item-skillset">`;

    skills = skillHeader;
        
    // format the job skills
    if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) {
      prospect.jobSkills.map( function(skill, index) {          
        skills +=
        `<p class="item job-skill js-job-skillset"> 
            <span  tabindex="0" id="JobSkill-${index}" class="js-job-skill js-job-skill-text" data-header="Skill">${skill.skill}</span>
            <span  tabindex="0" id="JobExp-${index}" class="js-job-skill js-job-skill-years" data-header="Experience">${skill.yearsOfExperience}</span>
            <span  tabindex="0"><a id="EditJobSkill-${index}" href=# class="js-edit-job-skill"><img alt="edit job skill" src="./images/icon-edit.png" /></a></span>
            <span  tabindex="0"><a id="DeleteJobSkill-${index}" href=# class="js-delete-job-skill"><img alt="delete job skill" src="./images/icon-delete.png" /></a></span>           
          </p> `;        
      });
      skills += '</div></div>';     
      }  
      return skills;
  }  
