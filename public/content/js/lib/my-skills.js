
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
          <div class="td experience">Years</div>
          <div class="td"> </div>     
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
          <div class="td" data-header="Experience"> <input type="text" id="skillYears"></input></div>
          <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add)</a></div>
        </div>
      </div>              
      <p class="items flex-item-skillset">`;
  
    let skills = skillHeader;
         
     // if the user has any skills then format the html to display them
    if (profile.skills) {
      profile.skills.map( function(skill, index) {          
        skills +=
         `<p class="item user-skill js-user-skillset"> 
            <span  tabindex="0" id="UserSkill-${index}" class="js-user-skill js-user-skill-text" data-header="Skill">${skill.skill}</span>
            <span  tabindex="0" id="UserExp-${index}" class="js-user-skill js-user-skill-years" data-header="Experience">${skill.yearsOfExperience}</span>
            <span  tabindex="0"><a id="EditSkill-${index}" href=# class="js-edit-skill"><img alt="edit skill" src="./images/icon-edit.png" /></a></span>
            <span  tabindex="0"><a id="DeleteSkill-${index}" href=# class="js-delete-skill"><img alt="delete skill" src="./images/icon-delete.png" /></a></span>           
          </p> `; 
       });
       skills += '</p></div> ';     
      }  
      return skills;
  } 

  
/*
  After find method is executed to find the master list of skills 
  if data is returned then setup html to display master list of skills  
*/
function displayMasterSkills(data) {
  if (apiReturnedError(data)) return;

  let skillDetailsHeader = `
  <div flex-item>
    <div class="skills-header"><h3 tabindex="0">Master list of skills</h3> <em> (click on a skill to add it to your skills)</em></div>   
    <p flex-item-skills">`;
  let skills = skillDetailsHeader;
           
  data.skill.map( function(skill, index) {           
      skills +=  `<a href=# id="masterSkill${index}" class="master-skill-link js-add-master-skill-to-user">${skill.skill}</a>`;     
     });
     skills += '</p>';           
 
  $('.js-page-content').append(`${skills}`);        
}  

/*
  Format the html to display the form to input data to edit or create user profile
*/
function renderUserSkills() { 
  if (!isUserLoggedIn()) return; 

  $('.js-page-content').html(''); 
  // display users skills and master list of skills  
  $('.js-page-content').append(generateUserSkills(props.USER_PROFILE));
  $('.js-page-content').append(renderMasterSkillsList(displayMasterSkills));        
} 


/*
  Executed when user clicks on skill in master list of skills
  will update the user's collection of skills
*/
function  addMasterSkillToMySkills() {       
    const id = `#${event.currentTarget.activeElement.id}`; 
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
