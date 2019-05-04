'use strict';
let props = {};

function currentDateTimeLocal() {
    d = new Date();
    let formattedDate = new Date();
    formattedDate.setUTCFullYear(d.getFullYear());
    formattedDate.setUTCMonth(d.getMonth());
    formattedDate.setUTCDate(d.getDate());
    formattedDate.setUTCHours(d.getHours());
    formattedDate.setUTCMinutes(d.getMinutes());
    formattedDate.setUTCSeconds(d.getSeconds());  
    return formattedDate;
}

function toDatetimeStringFormat(date) {  
  const d = new Date(date);
  let formattedDate =  `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`; 
      formattedDate += `T${('0' + (d.getHours()+1)).slice(-2)}:${('0' + (d.getMinutes())).slice(-2)}`; 
  return formattedDate;
}  

function initializeProps() {
  props = {"route":"home", 
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
}

 
function removeUserData() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('userId');  
  props.isLoggedIn = false;   
  props.hasProfile = false; 
  setHasProfile(false); 
  initializeProps();
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
    renderLoginForm();

    return continueToPage;
}

function canAccessProfile() {
  let continueToPage = false;
  props.isLoggedIn === true  
    ? props.hasProfile === true 
        ? continueToPage = true 
        : renderUserProfileForm()
    : renderLoginForm(); 

  return continueToPage;
}
