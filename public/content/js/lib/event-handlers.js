 'use strict'
 let props = {"route":"home", "loggedIn": false, "hasProfile": false} 
 
 function  executeHandlers() {   
    $(document).on('click','.js-menuitem-home',function(e){e.preventDefault(); renderLanding()});      
    $(document).on('click','.js-menuitem-login',function(e){e.preventDefault(); renderLoginForm()});       
    $(document).on('click','.js-login-image',function(e){e.preventDefault(); renderLoginForm()});   
    $(document).on('click','.js-menuitem-myskills',function(e){e.preventDefault(); renderUserSkills()});  
    $(document).on('click','#submitLogin',function(e){e.preventDefault(); loginThisUser()});
    $(document).on('click','.js-menuitem-logout',function(e){e.preventDefault(); logoutThisUser()});    
    $(document).on('click','#submitProfile',function(e){e.preventDefault(); submitProfileUpdates()}); 
    $(document).on('click','#submitProspect',function(e){e.preventDefault(); submitProspectUpdates()});     
    $(document).on('click','#registerUser',function(e){e.preventDefault(); renderRegistrationForm()}); 
    $(document).on('click','.js-register-image',function(e){e.preventDefault(); renderRegistrationForm()}); 
    $(document).on('click','#submitReg',function(e){e.preventDefault(); submitRegistion()});
    $(document).on('click','.js-prospect-detail',function(event){renderJobDetails()});    
    $(document).on('click','js-add-job-skill',function(e){e.preventDefault(); addSkillToUserProfile()});
    $(document).on('click','js-delete-job-skill',function(e){e.preventDefault(); deleteSkillFromUserProfile()});
    $(document).on('click','js-edit-job-skill',function(e){e.preventDefault(); editUserProfileSkill()});     
    $(document).on('click','.js-delete-prospect',function(e){e.preventDefault(); deleteJobProspect()});    
    $(document).on('click','.js-edit-prospect',function(e){e.preventDefault(); editJobProspect()}); 
    $(document).on('click','#cancelProspectEvent',function(e){e.preventDefault(); displayProspectsSummaryForm()});     
    $(document).on('click','.js-add-prospect',function(e){e.preventDefault(); displayProspectsSummaryForm()});     
    $(document).on('click','.js-edit-prospect',function(e){e.preventDefault(); displayProspectsSummaryForm()});     
    $(document).on('click','.js-menuitem-add-prospect',function(e){e.preventDefault(); displayProspectsSummaryForm()});     
    $(document).on('click','.js-menuitem-register',function(e){e.preventDefault(); renderRegistrationForm()});     
    $(document).on('click','#menuButton',function(e){e.preventDefault(); menuFunction()});  
    $(document).on('click','#menuitem-summary',function(e){e.preventDefault(); renderJobsSummaries()})       
    $(document).on('click','.js-menuitem-master-skiils',function(e){e.preventDefault(); renderMasterSkillsList(displaySkillsMasterList)})  
    $(document).on('click','.js-add-master-skill-to-user',function(e){e.preventDefault(); addMasterSkillToMySkills()})              
    $(document).on('click','.js-menuitem-profile',function(e){e.preventDefault(); renderUserProfileForm()})       
    $(document).on('click','.js-edit-profile',function(e){e.preventDefault(); renderUserProfileForm()})       
    $(document).on('click','.js-add-master-skill',function(e){e.preventDefault(); addMasterSkill()})       
    $(document).on('click','.js-edit-master-skill',function(e){e.preventDefault(); editMasterSkill()})   
    $(document).on('click','.js-delete-master-skill',function(e){e.preventDefault(); deleteMasterSkill()}) 
    
}
   
function setHasProfile(value) {
    props.hasProfile = value;
    if (props.hasProfile === true)
      props.loggedIn = true;
  }
  
// Called from secure pages
// If user is not logged in redirect them to the login or profile page
function isUserLoggedIn() { 
  let continueToPage = false;
  props.loggedIn === true 
    ? props.hasProfile === true
      ? continueToPage = true
      : renderUserProfileForm()    
    :
    renderLoginForm()

    return continueToPage;
}  

function canAccessProfile() {
  let continueToPage = false;
  props.loggedIn === true  
    ? continueToPage = true
    : renderLoginForm() 

    return continueToPage;
}