'use strict';
let masterSkills = [];
//const pathSkills = "skills";

function renderMasterSkillsList() {
  setTimeout(findCareerStrategyAPI(pathSkills, "",  "", function(data) {       
      displaySkillsMasterList(data)
  }), 3000); 
}
 
function  deleteMasterSkill() {        
  const selectedSkill = $('#newMasterSkill').val();               
  const skillToRemove = masterSkills.filter( skill => skill.skill === selectedSkill);
  const id = skillToRemove && skillToRemove.length > 0 ? skillToRemove[0].id : "";

  if (id === "") {
    displayError(`${selectedSkill} does not exist in the list of master skills.`,"js-page-message");;
  }
  else {
    // delete this skill 
    deleteCareerStrategyAPI( pathSkills, "",  id, refreshMasterSkillsList);     
  }
}

function  editMasterSkill(event) {        
  const id = `#${event.currentTarget.id}`; 
  let skill = $(id).text();                
  // setup the skill input field
  $("#newMasterSkill").val(skill);     
}

function  addMasterSkill() {        
  const skillToAdd = $('#newMasterSkill').val(); 
  // find skill in master skills list  
  const currentDate = new Date();
  const masterSkill = masterSkills.filter( skill => skill.skill === skillToAdd);
  if (masterSkill && masterSkill.length > 0) {
    const editedSkill = masterSkill[0];
    editedSkill.skill = skillToAdd;
      putCareerStrategyAPI(pathSkills, editedSkill, editedSkill.id, renderMasterSkillsList(displaySkillsMasterList));
  }
  else {  
    const newSkill = JSON.parse(`{"id": "${props.userId}","skill": "${skillToAdd.trim()}","description":"", "date":"${currentDate}"}`);           
      postCareerStrategyAPI(pathSkills, newSkill, "", refreshMasterSkillsList);     
  }
}

 /*
  After find method is executed to find the master list of skills 
  if data is returned then setup html to display master list of skills  
*/
function displaySkillsMasterList(data) { 
  if (apiReturnedError(data)) return;
  
  masterSkills = data && data.skill ? data.skill : [];
  let skills = '';

    // if any master skills exists, format the html to display them
  if (data && data.skill) {
    skills += '<p class="items flex-item-skillset">';
    data.skill.map( function(skill, index) {          
      skills +=  `<a href="#" id="masterSkill${index}" class="skill-link js-edit-master-skill">${skill.skill}</a>`;            
      });  
    skills += '</p>';   
  }  

  let headerAndSkills = `
    <div class="flex-item-skills js-master-skills">
      <div class="section-header"><h3 tabindex="0">Master list of skills</h3></div>
      <output><div id="js-skills-error-message" class="error-message" aria-live="assertive" hidden> </div></output>
      <div class="table">
        <div class="tr th"> 
          <div class="td">Skill</div> 
          <div class="td"> </div>     
        </div>
        <div class="tr">  
          <div class="td" data-header="Skill"><input type="text" id="newMasterSkill"></input></div>
          <div class="td" data-header=""><a id="AddMasterSkill" href="#" class="js-add-master-skill"><img id="addNewSkill" alt="add skill" src="./images/icon-add.png">(Add/Edit)</a>
          <a id="DeleteMasterSkill" href="#" class="js-delete-master-skill"><img id="deleteThisSkill" alt="delete skill" src="./images/icon-delete.png">(Delete)</a></div>
        </div>
      </div>
      ${skills}
    </div> `; 

  $('.js-page-content').html('');      
  $('.js-page-content').append(`${headerAndSkills}`);
      
  if (masterSkills === [])     
      displayInformation("Master list of skills is empty", 'js-page-message'); 
}
