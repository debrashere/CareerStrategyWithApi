'use strict';
/* import { PromiseProvider } from "mongoose"; */
function isLoginFormValid() {

 // clear form of error messages
 $( ".form-error" ).remove();
 // check for validation errors
 displayError(validateField($("#UserId").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-username');
 displayError(validateField($("#userPassword").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-password'); 

 // check if errors found in form
 const errors = $('.form-error');
 return errors.length === 0;
} 

function loginThisUser() { 
    removeUserData();    
    // check if inputs are valid
    if (!isLoginFormValid()) return;

    const userName =  $('#UserId').val();
    const password = $("#userPassword").val(); 
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}"}`);        
    props.isLoggedIn = false;
    setTimeout(loginUserAPI(pathAuth, loginJson, function(data) {
    if (!apiReturnedErrorOnLogin(data)) {    
      localStorage.setItem('token', data.userAuth.authToken);
      localStorage.setItem('userId', data.userAuth.id);
      props.userId = localStorage.getItem('userId');
      props.isLoggedIn = true; 
      getUserProfile();      
    }
    }), 3000);
}
  
function getUserProfile() {
  if (!props.userId || props.userId === "") return ;

  const queryPath = `userId=${props.userId}`;
  setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , function(data) {      
    // render user information including profile info and the user's skills
    props.USER_PROFILE = data && data.userProfile ? data.userProfile[0] : {};
    props.userProfileId = props.USER_PROFILE && props.USER_PROFILE.userId ? props.USER_PROFILE.id : "";  
    props.userProfileId === "" ? setHasProfile(false) : setHasProfile(true);
    props.hasProfile === true ? renderLanding(props.USER_PROFILE) : renderUserProfileForm();
  }), 3000);   
}

function renderLoginForm() {    
  // format the form html
  const loginFields = ` 
  <fieldset class="flex-item">  
    <div class="form-field">
        <label  for="UserId"><span >User name</span></label>
        <input id="UserId" type="text" class="form-input  js-input-username" placeholder="User name" value="" aria-required="true" required>
    </div>
    <div class="form-field">
        <label for="userPassword"><span>Password</span></label>
        <input id="userPassword" type="password" class="form-input   js-input-password" placeholder="Password" value="" aria-required="true" required>
    </div>
    <div class="form-field">
      <button type="submit" id="submitLogin" class="btn js-edit-event js-edit-button" >Login</button>  
      <a class="form-link" href="#" id="menuItem-register" class="js-login-register-link" >Register</a> 
    </div>       
  </fieldset> `;
  
let loginForm =  `  
<div class="input-form-body">
  <form action="" method="post" class="flex-container form form-element">
    ${loginFields}     
  </form>         
</div>`;

$(".js-page-content").html(loginForm); 
} 