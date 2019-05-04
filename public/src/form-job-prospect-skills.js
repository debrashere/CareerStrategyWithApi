
/*     
   render job skills
*/
function generateUserAndJobSkillsForm(prospect, profile) {  
    let skills = '';  
  
    /* formats links for the existing job skills */
    if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) { 
        prospect.jobSkills.map( function(skill, index) {          
          skills +=  `<a href="#" id="jobSkill-${index}" class="widget-button-one js-edit-job-skill">${skill.skill}</a>`;            
        });    
    }  
    const jobSkills = `
      <fieldset id="skillsFieldset" class="flex-item js-skillsFieldset">  
        <div class="form-field">
            <label for="newJobSkill">
              <a id="AddJobSkill" href="#" class="form-link js-prospect-add-job-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
              <a id="DeleteMasterSkill" href="#" class="form-link js-prospect-delete-job-skill"><img id="deleteThisJobSkill" alt="delete job skill" src="./images/icon-delete.png">(Delete)</a>      
            </label>
            <input id="newJobSkill" type="text" class="form-input  js-input-skill" placeholder="skill" value="" >
            <div class="input-block"><p class="js-job-skills-list">${skills}</p></div>  
        </div>
      </fieldset>`;
  
  
      let userSkills = "";       
      // if the user has any skills, format the html to display them
     if (profile.skills) {
       profile.skills.map( function(skill, index) {          
        userSkills +=  `<span "userSkill${index}" class="widget-button-one">${skill.skill}</span>`;            
        });  
       } 
     
       const userSkillsSection = `
       <div class="flex-item-skills">
         <div class="section-header"><h3 tabindex="0">Your Skills (go to <a href="#" id="menuitem-myskills" class="js-menuitem-myskills-prospect-link" title="My Skills">My Skills"</a> to edit")</h3></div>             
         <div class="items flex-item-skillset">
          ${userSkills}
         </div>
       </div>`;
  
       const skillsForm =  `  
      <div class="input-form-body">
        <div>
            <div class="logo">Career Strategy</div>
            <div class="logo">Skills</div>
            <div class="form-item">
                <form action="" method="post" class="form flex-container  js-tab-JobSkills">
                ${jobSkills}    
                </form>
                ${userSkillsSection}
            </div>      
      </div>
    </div>`;
  
    return skillsForm;
}


function deleteJobSkillProspectForm(e) {
    /* get the skill value from input box */
    const thisSkill = $('#newJobSkill');  
    
    /* find the skill in the list of job skills */
    if (thisSkill) {
      const skillElements = $('.widget-button-one');
      const skillToRemove = $.grep(skillElements, function(e){ return e.text === thisSkill[0].value; });
      /* remove the skill from the list of job skills */
      if (skillToRemove && skillToRemove.length > 0) 
        $(skillToRemove[0]).detach();
    }
  }
  
function addJobSkillProspectForm(e) {
    /* get the skill value from input box */
    const thisSkill = $('#newJobSkill');  
    
    /* find the skill in the list of job skills */
    if (thisSkill) {
      const skillElements = $('.widget-button-one');
  
      /* check if the skill already exists in the list of skills before adding it */
      const skillInList = $.grep(skillElements, function(e){ return e.text === thisSkill[0].value; });    
      if (!skillInList || skillInList.length === 0) {
        let newSkill = '';
        let lastSkill = null;
        let index = 0;
        if (skillElements && skillElements.length > 0) {              
          lastSkill = skillElements.last();
          index = parseInt(lastSkill[0].id.split('-')[1]);
          index = index + 1;
          newSkill = `<a href="#" id="jobSkill-${index}" class="widget-button-one js-edit-job-skill">${thisSkill[0].value}</a>`;
          /* insert the newSkill after the last skill in the list of existing skills */
          $( newSkill ).insertAfter( lastSkill);  
        }
        else {      
          newSkill = `<a href="#" id="jobSkill-0" class="widget-button-one js-edit-job-skill">${thisSkill[0].value}</a>`;    
          /*  add newSkill in the job skills div*/
          $('.js-job-skills-list').html( newSkill );  
        }     
      }
    }
}
  