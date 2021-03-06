;  
const pathSkills = "skills";

function renderDashboard(data) { 
  renderHeader(data);
  renderBanner();
  renderDashboardPage(); 
}

function isUserLoggedIn() {
  props.userId = localStorage.getItem('userId');   
  return props.userId && props.userId.length > 0;
}

function userHasProfile() {
  if (!props.userId || props.userId === "") {
    props.hasProfile = false;
    return false;
  }
  let userProfileFound = false;
  if (!props.userProfileId || props.userProfileId === "" ) { 

    const queryPath = `userId=${props.userId}`;

    setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , function(data) {
      
      const userProfile = 
      (data && data.userProfile && data.userProfile.length > 0) 
        ? data.userProfile[0]  
        : {};

      const userProfileId = userProfile ? userProfile.id : "";
      userProfileFound = userProfileId !== "";     

      if (userProfileFound === true) 
        props = {
        "route":"home", 
        "isLoggedIn": true, 
        "hasProfile": true, 
        "userId" : "",
        "userProfileId" : userProfileId,
        "USER_PROFILE" : userProfile,
        "JOB_SKILLS" : [],
        "MASTER_SKILLS" : [],
        "PROSPECTS" : {} 
        };
      else 
        props = {
        "route":"home", 
        "isLoggedIn": false, 
        "hasProfile": false, 
        "userId": "", 
        "userProfileId" : "",
        "USER_PROFILE" : {},
        "JOB_SKILLS" : [],
        "MASTER_SKILLS" : [],
        "PROSPECTS" : {}
        };    

      renderDashboard(props.USER_PROFILE); 
    }), 3000); 
  } 
}

function renderContent() {
  if (isUserLoggedIn())
      userHasProfile() 
  else
    renderDashboard();  
}

function setupHandleEvents() {  
   renderContent(); 
  initializeProps();   
}

$(setupHandleEvents);