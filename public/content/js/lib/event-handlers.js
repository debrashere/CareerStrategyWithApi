 'use strict'
 let props = {"route":"home", 
 "isLoggedIn": false, 
 "hasProfile": false, 
 "userId" : "",
 "userProfileId" : "",
 "USER_PROFILE" : {},
 "JOB_SKILLS" : [],
 "MASTER_SKILLS" : [],
 "PROSPECTS" : {} };
 
 function  executeHandlers() {   
    $(document).on('click','.js-menuitem-myskills',function(e){e.preventDefault(); setMenuItem()});      
    $(document).on('click','.js-menuitem-home',function(e){e.preventDefault(); setMenuItem()});      
    $(document).on('click','.js-menuitem-login',function(e){e.preventDefault(); setMenuItem()});       
    $(document).on('click','.js-menuitem-prospect',function(e){e.preventDefault(); setMenuItem()});     
    $(document).on('click','.js-menuitem-register',function(e){e.preventDefault(); setMenuItem()});     
    $(document).on('click','.js-menuitem-profile',function(e){e.preventDefault(); setMenuItem()}) 
    $(document).on('click','.js-menuitem-skills',function(e){e.preventDefault(); setMenuItem()})     
    $(document).on('click','.js-menuitem-logout',function(e){e.preventDefault(); setMenuItem()});        
    $(document).on('click','#menuitem-summary',function(e){e.preventDefault(); setMenuItem()})       
    $(document).on('click','#menuButton',function(e){e.preventDefault(); menuFunction()});  
    
    $(document).on('click','.js-login-image',function(e){e.preventDefault(); renderLoginForm()});   
    $(document).on('click','#submitLogin',function(e){e.preventDefault(); loginThisUser()});
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
    $(document).on('click','.js-add-master-skill-to-user',function(e){e.preventDefault(); addMasterSkillToMySkills()})                    
    $(document).on('click','.js-edit-profile',function(e){e.preventDefault(); renderUserProfileForm()})       
    $(document).on('click','.js-add-master-skill',function(e){e.preventDefault(); addMasterSkill()})       
    $(document).on('click','.js-edit-master-skill',function(e){e.preventDefault(); editMasterSkill()})   
    $(document).on('click','.js-delete-master-skill',function(e){e.preventDefault(); deleteMasterSkill()}) 
    $(document).on('click','.js-prospect-by-status',function(e){e.preventDefault(); renderJobsSummariesByStatus()}) 
    $(document).on('click','.js-prospect-by-company',function(e){e.preventDefault(); renderJobsSummariesByCompany()}) 
    $(document).on('click','.js-prospect-by-contact',function(e){e.preventDefault(); renderJobsSummariesByContact()}) 
   
}
   
function setHasProfile(value) {
    props.hasProfile = value;
    if (props.hasProfile === true)
      props.isLoggedIn = true;
  }
  
// Called from secure pages
// If user is not logged in redirect them to the login or profile page
function isUserLoggedIn() { 
  let continueToPage = false;
  props.isLoggedIn === true 
    ? props.hasProfile === true
      ? continueToPage = true
      : renderUserProfileForm()    
    :
    renderLoginForm()

    return continueToPage;
}  

function canAccessProfile() {
  let continueToPage = false;
  props.isLoggedIn === true  
    ? continueToPage = true
    : renderLoginForm() 

    return continueToPage;
}