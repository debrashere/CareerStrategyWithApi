'use strict';
  
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
        `<div class="job-skill js-job-skillset"> 
            <span  tabindex="0" id="JobSkill-${index}" class="js-job-skill js-job-skill-text" data-header="Skill">${skill.skill}</span>      
          </div> `;        
      });
      skills += '</div></div>';     
      }  
      return skills;
  } 
  