'use strict';
let masterSkills = [];
//const pathSkills = "skills";

function renderMasterSkillsList(callback) {
    findCareerStrategyAPI(pathSkills, "",  "", callback);
}
 
function  deleteMasterSkill() {        
  const selectedSkill = $('#newSkill').val();               
  const skillToRemove = masterSkills.filter( skill => skill.skill === selectedSkill);
  // delete this skill
  deleteCareerStrategyAPI(pathSkills, "",  skillToRemove.id, displaySkillsMasterList);                                   
}

function  editMasterSkill(event) {        
  const id = `#${event.currentTarget.id}`; 
  let skill = $(id).text();                
  // setup the skill input field
  $("#newSkill").val(skill);
  $("#skillYears").val("");    
  
}

function  addMasterSkill() {        
  const skillToAdd = $('#newSkill').val(); 
  // find skill in master skills list  
  const masterSkill = masterSkills.filter( skill => skill.skill === skillToAdd);
  if (masterSkill && masterSkill.length > 0) {
    const editedSkill = masterSkill[0];
    editedSkill.skill = skillToAdd;
    putCareerStrategyAPI(pathSkills, editedSkill, editedSkill.id, displaySkillsMasterList);
  }
  else {""
    const newSkill = `{"skill": "${skillToAdd}", "description": ""}`;       
    postCareerStrategyAPI(pathSkills, newSkill,  "", displaySkillsMasterList);
  }
}

/*
  After find method is executed to find the master list of skills 
  if data is returned then setup html to display master list of skills  
*/
function displaySkillsMasterList(data) {
    if (apiReturnedError(data)) return;
    masterSkills = data.skill;
    let skillHeader = `
    <div class="flex-item-skills">
      <div class="section-header"><h3 tabindex="0">Your Skills</h3></div>
      <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
      <div class="table">
        <div class="tr th"> 
          <div class="td">Skill</div>       
          <div class="td"> </div>  
          <div class="td"> </div>      
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newSkill"></input></div>
           <div class="td" data-header=""><a id="AddSkill" href="#" class="js-add-master-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Update)</a></div>
          <div class="td" data-header=""><a id="DeleteSkill" href="#" class="js-delete-master-skill"><img id="deleteSkill" alt="delete skill" src="./images/icon-delete.png">(Delete)</a>
        </div>
      </div>              
      <p class="items flex-item-skillset">`;

  
    $('.js-page-content').html('');
  
    let skillDetailsHeader = `
    <div flex-item>
      <div class="skills-header"><h3 tabindex="0">Master list of skills</h3> <em> (click on a skill to edit or delete it)</em></div>   
      <p flex-item-skills">`;
    let skills = skillDetailsHeader;
             
    data.skill.map( function(skill, index) {           
        skills +=  `<a href=# id="masterSkill${index}" class="master-skill-link js-edit-master-skill">${skill.skill}</a>`;     
       });
       skills += '</p>';           
   
    $('.js-page-content').append(`${skillHeader}`);  
    $('.js-page-content').append(`${skills}`);        
  }  