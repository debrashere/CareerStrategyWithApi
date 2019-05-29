'use strict';
/*
    Display master set of skills that the user can click on to add it to their skillset
    When a user types in a skill that is not in the master skillset, it will automatically
    bee added to the skillset.
*/
function displayMasterSkills(data) {
  if (apiReturnedError(data)) return;

  let skills = `
  <div flex-item>
    <div class="section-header"><h3 tabindex="0">Master list of skills</h3> <em> (click on a skill to add it to your skills)</em></div>   
    <p flex-item-skills">`; 
           
  data.skill.map( function(skill, index) {           
      skills +=  `<a href=# id="masterSkill${index}" class="widget-button-one js-add-master-skill-to-user">${skill.skill}</a>`;     
     });
     skills += '</p>';           
  
 $('.js-page-content').append(`${skills}`);        
}  


/*
  Executed when user clicks on skill in master list of skills
  will update the user's collection of skills
*/
function  addMasterSkillToMySkills(event) {       
    const id = `#${event.currentTarget.id}`; 
    let skill = $(id).text();

      let skillIndex = -1;
      if (!props.USER_PROFILE.skills) {
        props.USER_PROFILE.skills = []
      }

      // check if skill already exists in the user's skill collection
      // if so then update instead of add
      for(let idx=0; idx< props.USER_PROFILE.skills.length ; idx++)
      {
          if (props.USER_PROFILE.skills[idx].skill == skill) {
          skillIndex = idx;
          break;
         }
      }

      if (skillIndex > -1)
      {
        props.USER_PROFILE.skills[skillIndex].yearsOfExperience = 1;
      }
      else {
        props.USER_PROFILE.skills.push(JSON.parse(`{"skill": "${skill.trim()}","yearsOfExperience":"1"}`));       
      }

      // create json object to update the user skills
      const userSkills = `{"id": "${props.userProfileId}","skills": ${JSON.stringify(props.USER_PROFILE.skills)}}`;                         

      setTimeout(putCareerStrategyAPI(pathUserProfile, JSON.parse(userSkills), props.userProfileId, function(data) {                                        
        renderUserSkills();
      }), 3000);                                       
} 

function setupMySkillsMasterHandlers() {
 $(document).on('click','.js-add-master-skill-to-user',function(e){e.preventDefault(); addMasterSkillToMySkills(e); });      

}
$(setupMySkillsMasterHandlers);
