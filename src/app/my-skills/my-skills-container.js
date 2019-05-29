'use strict';  

/*
  Format the html to display the form to input data to edit or update user skills
*/
function renderUserSkills() { 
  if (!isUserLoggedIn()) return; 
  if (!canAccessProfile()) return; 

  // display users skills and master list of skills  
  $('.js-page-content').html(generateMyUserSkills(props.USER_PROFILE));
  generateMasterSkillsForUser();        
} 

function generateMasterSkillsForUser() {
  setTimeout(findCareerStrategyAPI(pathSkills, "",  "", function(data) {       
    displayMasterSkills(data)
  }), 3000); 
}