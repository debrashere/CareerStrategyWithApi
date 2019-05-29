'use strict';
/*     
   render user skills
*/
function generateMyUserSkills(profile) { 
    let skillsList = '';
     // if the user has any skills, format the html to display them
    if (profile.skills) {
        profile.skills.map( function(skill, index) {          
        skillsList +=  `<a href=# id="userSkill${index}" class="js-edit-widget-button-one js-edit-user-skill widget-button-one">${skill.skill}</a>`;            
       });       
      } 
      
      let skills = `
      <div class="flex-item-skills">
        <div class="section-header"><h3 tabindex="0">Your Skills</h3></div>
        <div class="table">
          <div class="tr th"> 
            <div class="td">Skill</div> 
            <div class="td"> </div>     
          </div>
          <div class="tr">  
            <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
            <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-widget-button-one"><img id="addNewSkill" alt="add skill" src="../src/app/common/images/icon-add.png">(Add/Edit)</a>
            <a id="DeleteSkill" href="#" class="js-delete-widget-button-one"><img id="deleteThisSkill" alt="delete skill" src="../src/app/common/images/icon-delete.png">(Delete)</a></div>
          </div>
        </div>              
        <div class="items flex-item-skillset">${skillsList}</div>
      </div>`;

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

  function setupMySkillsHandlers() {
       /* manage user skills */
       $(document).on('click','.js-edit-widget-button-one',function(e){e.preventDefault(); selectSkillFromUserSkills(e); });
       $(document).on('click','.js-add-widget-button-one',function(e){e.preventDefault(); addUserSkill(e); });
       $(document).on('click','.js-delete-widget-button-one',function(e){e.preventDefault(); deleteUserSkill(e); });
  }

  $(setupMySkillsHandlers);
  
  