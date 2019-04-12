
'use strict'  
let userId = "";
let userProfileId = "";
let USER_PROFILE = {};
let JOB_SKILLS = [];
let MASTER_SKILLS = [];
let PROSPECTS = {};
const pathSkills = "skills";

function renderLanding(data) { 
  renderHeader(data);
  renderBanner();
  renderLandingPage(); 
}

function renderSecureContent() {
  renderHeader(USER_PROFILE);
  renderBanner();
  renderJobsSummaries(userId) ;
} 
 
function isUserLoggedIn() {
  userId = localStorage.getItem('userId');   
  return userId && userId.length > 0;
}

function userHasProfile() {
  if (!userId || userId === "") {
    props.hasProflie = false;
    return false;
  }
  let userProfileFound = false;
  if (!userProfileId || userProfileId === "" ) {  
    const queryPath = `userId=${userId}`;
    setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , function(data) {      
      // render user information including profile info and the user's skills
      USER_PROFILE = (data && data.userProfile && data.userProfile.length > 0) ? data.userProfile[0] : [];
      userProfileId = USER_PROFILE && USER_PROFILE.id ? USER_PROFILE.id : "";
      userProfileFound = userProfileId !== "";     

      if (userProfileFound === true) {
        props = {"route":"home", "loggedIn": true, "hasProflie": true} 
        renderSecureContent();
      }
      else {
        userId = "";
        //Clear auth token and settings
        //localStorage.removeItem('token'); 
        //localStorage.removeItem('userId');   
        props = {"route":"home", "loggedIn": false, "hasProfile": false} 
        renderLanding(); 
      }
    }), 3000); 
  } 
}

function renderContent() {
  if (isUserLoggedIn())
      userHasProfile() 
  else
    renderLanding();  
}

function setupHandleEvents() {  
  renderContent(); 
  executeHandlers();    
}

$(setupHandleEvents);