/*     
   render user skills
*/
function generateUserSkills(profile) {  
    let skills = "";       
     // if the user has any skills, format the html to display them
    if (profile.skills) {
      profile.skills.map( function(skill, index) {          
        skills +=  `<span "userSkill${index}" class="widget-button-one">${skill.skill}</span>`;            
       });  
      } 
    
      let skillHeaderAndDetails = `
      <div class="flex-item-skills">          
        <div class="section-header"><h3 tabindex="0">Your Skills (go to <a href="#" id="menuitem-myskills" class="js-menuitem-myskills-details-link" title="My Skills">My Skills</a> to edit")</h3></div>                  
        <p class="items flex-item-skillset">
         ${skills}
        </p>
      </div>`;  
      
      return skillHeaderAndDetails;
  }