'use strict';
let props = {"route":"home", 
 "isLoggedIn": false, 
 "hasProfile": false, 
 "userId" : "",
 "userProfileId" : "",
 "USER_PROFILE" : {},
 "JOB_SKILLS" : [],
 "MASTER_SKILLS" : [],
 "PROSPECTS" : {},
 "prospect" : {},
 "prospectId" : ""};
 
   /* appending event listeners to dynamic content */
 function  executeHandlers() {  
    /* Menu functions */ 
    $(document).on('click','.js-menuitem-myskills',function(e){e.preventDefault(); setMenuItem(e); });      
    $(document).on('click','.js-menuitem-home',function(e){e.preventDefault(); setMenuItem(e); });      
    $(document).on('click','.js-menuitem-login',function(e){e.preventDefault(); setMenuItem(e); });       
    $(document).on('click','.js-menuitem-prospect',function(e){e.preventDefault(); setMenuItem(e); });     
    $(document).on('click','.js-menuitem-register',function(e){e.preventDefault(); setMenuItem(e); });     
    $(document).on('click','.js-menuitem-profile',function(e){e.preventDefault(); setMenuItem(e); }) 
    $(document).on('click','.js-menuitem-skills',function(e){e.preventDefault(); setMenuItem(e); })     
    $(document).on('click','.js-menuitem-logout',function(e){e.preventDefault(); setMenuItem(e); });        
    $(document).on('click','#menuitem-summary',function(e){e.preventDefault(); setMenuItem(e); });       
    $(document).on('click','#menuButton',function(e){e.preventDefault(); menuFunction(); });          
    /* form functions */
    $(document).on('click','.js-login-image',function(e){e.preventDefault(); renderLoginForm(); });   
    $(document).on('click','#submitLogin',function(e){e.preventDefault(); loginThisUser(); });
    $(document).on('click','#submitProfile',function(e){e.preventDefault(); submitProfileUpdates(); }); 
    $(document).on('click','#submitProspect',function(e){e.preventDefault(); submitProspectUpdates(); });     
    $(document).on('click','#registerUser',function(e){e.preventDefault(); renderRegistrationForm(); }); 
    $(document).on('click','.js-form-register-user',function(e){e.preventDefault(); submitRegistion(); });        
    $(document).on('click','.js-register-image',function(e){e.preventDefault(); renderRegistrationForm(); }); 
    $(document).on('click','.js-edit-profile',function(e){e.preventDefault(); renderUserProfileForm(); });      
    /* manage job prospects */ 
    $(document).on('click','.js-prospect-detail',function(e){renderJobProspectDetails(e); }); 
    $(document).on('click','#cancelProspectEvent',function(e){e.preventDefault(); renderProspectForm(); });     
    $(document).on('click','.js-delete-prospect',function(e){e.preventDefault(); deleteJobProspect(); });    
    $(document).on('click','.js-edit-prospect',function(e){e.preventDefault(); editJobProspect(); });   
    $(document).on('click','.js-edit-this-job-prospect',function(e){e.preventDefault(); editProspectForm(props.prospect); });   
   /* manage user skills */
    $(document).on('click','.js-edit-user-skill',function(e){e.preventDefault(); selectSkillFromUserSkills(e); });
    $(document).on('click','.js-add-user-skill',function(e){e.preventDefault(); addUserSkill(e); });
    $(document).on('click','.js-delete-user-skill',function(e){e.preventDefault(); deleteUserSkill(e); });
    $(document).on('click','.js-add-master-skill-to-user',function(e){e.preventDefault(); addMasterSkillToMySkills(e); });      
    /* manage skills for job prospect */   
    $(document).on('click','.js-add-job-skill',function(e){e.preventDefault(); addSkillToJobProspect(e); });
    $(document).on('click','.js-edit-job-skill',function(e){e.preventDefault(); editSkillForJobSprospect(e); });
    $(document).on('click','.js-delete-job-skill',function(e){e.preventDefault(); deleteSkillFromJobProspect(); });           
    /* manage master list of skills */                 
    $(document).on('click','.js-add-master-skill',function(e){e.preventDefault(); addMasterSkill(e); });      
    $(document).on('click','.js-delete-master-skill',function(e){e.preventDefault(); deleteMasterSkill(); }); 
    $(document).on('click','.js-edit-master-skill',function(e){e.preventDefault(); editMasterSkill(e); });
    /* presentational only functions */
    $(document).on('click','.js-prospects-by-status',function(e){e.preventDefault(); renderJobsSummariesByStatus(e); }); 
    $(document).on('click','.js-prospects-by-company',function(e){e.preventDefault(); renderJobsSummariesByCompany(e); });
    $(document).on('click','.js-prospects-by-contact',function(e){e.preventDefault(); renderJobsSummariesByContact(e); });           
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