'use strict';
/*     
   render user skills
*/
function generateUserSkills(profile) { 

    let skillHeader = `
    <div class="flex-item-skills">
      <div class="section-header"><h3 tabindex="0">Your Skills</h3></div>
      <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
      <div class="table">
        <div class="tr th"> 
          <div class="td">Skill</div> 
          <div class="td"> </div>     
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
          <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-user-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
          <a id="DeleteSkill" href="#" class="js-delete-user-skill"><img id="deleteThisSkill" alt="delete skill" src="./images/icon-delete.png">(Delete)</a></div>
        </div>
      </div>              
      <p class="items flex-item-skillset">`;
  
    let skills = skillHeader;
         
     // if the user has any skills, format the html to display them
    if (profile.skills) {
      profile.skills.map( function(skill, index) {          
        skills +=  `<a href=# id="userSkill${index}" class="skill-link js-edit-user-skill">${skill.skill}</a>`;            
       });
       skills += '</p></div> ';     
      }  
      return skills;
  }
  
  function selectSkillFromUserSkills(event) {
    const id = `#${event.currentTarget.id}`; 
    let skill = $(id).text();
    $("#newSkill").val(skill);
  }

  function addUserSkill(event) {    
    let skill = $('#newSkill').val();

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
/*
  Executed when user clicks link to delete an existing user skill
  will remove the skill from the user's collection of skills
  and call the API put method to update the database
*/  
  function deleteUserSkill(event) {
    const id = `#newSkill`; 
    let skill = $(id).val();

    let skillIndex = -1;
    if (!props.USER_PROFILE.skills) {
      props.USER_PROFILE.skills = []
    }

    // check if skill exists in the user's skill collection
    // if so then delete otherwise do nothing
    for(let idx=0; idx< props.USER_PROFILE.skills.length ; idx++)
    {
        if (props.USER_PROFILE.skills[idx].skill == skill) {
        skillIndex = idx;
        break;
       }
    }

    if (skillIndex > -1)
    {  
      // Remove this skill by splicing it from the collection of skills
      props.USER_PROFILE.skills.splice( skillIndex, 1 );  
      const skillsToKeep = `{"id": "${props.userProfileId}","skills": ${JSON.stringify(props.USER_PROFILE.skills)}}`;                         
      setTimeout(putCareerStrategyAPI(pathUserProfile, JSON.parse(skillsToKeep), props.userProfileId, function(data) {                                        
        renderUserSkills();
      }), 3000); 
    }
  }  
 
/*
    Display master set of skills that the user can click on to add it to their skillset
    When a user types in a skill that is not in the master skillset, it will automatically
    bee added to the skillset.
*/
function displayMasterSkills(data) {
  if (apiReturnedError(data)) return;

  let skillDetailsHeader = `
  <div flex-item>
    <div class="skills-header"><h3 tabindex="0">Master list of skills</h3> <em> (click on a skill to add it to your skills)</em></div>   
    <p flex-item-skills">`;
  let skills = skillDetailsHeader;
           
  data.skill.map( function(skill, index) {           
      skills +=  `<a href=# id="masterSkill${index}" class="skill-link js-add-master-skill-to-user">${skill.skill}</a>`;     
     });
     skills += '</p>';           
 
  $('.js-page-content').append(`${skills}`);        
}  

/*
  Format the html to display the form to input data to edit or update user skills
*/
function renderUserSkills() { 
  if (!isUserLoggedIn()) return; 

  // display users skills and master list of skills  
  $('.js-page-content').html(generateUserSkills(props.USER_PROFILE));
  $('.js-page-content').append(renderMasterSkillsList(displayMasterSkills));        
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
