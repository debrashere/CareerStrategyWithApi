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
    $(document).on('click','.js-menuitem-summary',function(e){e.preventDefault(); setMenuItem(e); });       
    $(document).on('click','.js-menuButton',function(e){e.preventDefault(); menuFunction(); });          
    $(document).on('click','.js-render-landing',function(e){e.preventDefault(); renderLanding(); });          
   
    /* form functions */
    $(document).on('click','.js-login-image',function(e){e.preventDefault(); renderLoginForm(); });   
    $(document).on('click','#submitLogin',function(e){e.preventDefault(); loginThisUser(); });
    $(document).on('click','#submitProfile',function(e){e.preventDefault(); submitProfileUpdates(); }); 
    $(document).on('click','#submitProspect',function(e){e.preventDefault(); submitProspectUpdates(); });     
    $(document).on('click','.js-delete-job-prospect',function(e){e.preventDefault(); submitProspectDelete(); }); 
    $(document).on('click','.js-form-register-user',function(e){e.preventDefault(); submitRegistion(); });        
    $(document).on('click','.js-register-image',function(e){e.preventDefault(); renderRegistrationForm(); }); 
    $(document).on('click','.js-delete-job-status',function(e){e.preventDefault(); deleteJobStatusForm(e); });            
    $(document).on('click','.js-delete-job-contact',function(e){e.preventDefault(); deleteJobContactForm(e); });
    $(document).on('click','.js-add-job-status',function(e){e.preventDefault(); addJobStatusForm(e); });
    $(document).on('click','.js-add-job-contact',function(e){e.preventDefault(); addJobContactForm(e); });
    $(document).on('click','.js-prospect-add-job-skill',function(e){e.preventDefault(); addJobSkillProspectForm(e); });    
    $(document).on('click','.js-prospect-delete-job-skill',function(e){e.preventDefault(); deleteJobSkillProspectForm(e); });    
    $(document).on('click','.js-menuitem-myskills-prospect-link',function(e){e.preventDefault(); setMenuItem(e); });     
    $(document).on('click','.js-menuitem-myskills-details-link',function(e){e.preventDefault(); setMenuItem(e); });     
    $(document).on('click','#registerUser',function(e){e.preventDefault(); renderRegistrationForm(); }); 
    $(document).on('click','.js-register-login-link',function(e){e.preventDefault(); setMenuItem(e); }); 
    $(document).on('click','.js-login-register-link',function(e){e.preventDefault(); setMenuItem(e); }); 

    /* manage job prospects */ 
    $(document).on('click','.js-prospect-detail',function(e){renderJobProspectDetails(e); })   
    $(document).on('click','.js-add-new-job-prospect',function(e){e.preventDefault(); renderProspectForm(); }); 
    $(document).on('click','.js-delete-prospect',function(e){e.preventDefault(); deleteJobProspect(); });    
    $(document).on('click','.js-edit-prospect',function(e){e.preventDefault(); editJobProspect(); });   
    $(document).on('click','.js-edit-this-job-prospect',function(e){e.preventDefault(); editProspectForm(props.prospect); });   
   /* manage user skills */
    $(document).on('click','.js-edit-user-skill',function(e){e.preventDefault(); selectSkillFromUserSkills(e); });
    $(document).on('click','.js-add-user-skill',function(e){e.preventDefault(); addUserSkill(e); });
    $(document).on('click','.js-delete-user-skill',function(e){e.preventDefault(); deleteUserSkill(e); });
    $(document).on('click','.js-add-master-skill-to-user',function(e){e.preventDefault(); addMasterSkillToMySkills(e); });      

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
    ? props.hasProfile === true 
        ? continueToPage = true 
        : renderUserProfileForm()
    : renderLoginForm() 

    return continueToPage;
}