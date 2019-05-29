
/*     
   render job skills
*/
function generateJobSkills(prospect) {  
    let skills = '';
   
    /* formats links for the existing job skills */
    if (prospect && prospect.jobSkills && prospect.jobSkills.length > 0) {
      skills += '<p class="items flex-item-skillset">';
      prospect.jobSkills.map( function(skill, index) {          
        skills +=  `<a href="#" id="jobSkill${index}" class="widget-button-one js-edit-job-skill">${skill.skill}</a>`;            
        });  
      skills += '</p>';   
    }  
  
    let headerAndSkills = `
      <div class="flex-item-skills js-master-skills">
        <div class="section-header"><h3 tabindex="0">Job skills</h3></div>  
        ${skills}
      </div> `; 
  
    return headerAndSkills; 
  }
  