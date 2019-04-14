'use strict'
/* import { PromiseProvider } from "mongoose"; */
function loginInputsAreValid() {

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
    // check if inputs are valid
    if (!loginInputsAreValid()) return;

    const userName =  $('#UserId').val();
    const password = $("#userPassword").val(); 
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}"}`);        
    
    setTimeout(loginUserAPI(pathAuth, loginJson, function(data) {
    if (!apiReturnedErrorOnLogin(data)) {
      localStorage.setItem('token', data.userAuth.authToken);
      localStorage.setItem('userId', data.userAuth.id);
      props.userId = localStorage.getItem('userId'); 
      getUserProfile();      
    }
    }), 3000);
}
  
function getUserProfile() {
  if (!props.userId || props.userId === "") return ;

  const queryPath = `userId=${props.userId}`;
  setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , function(data) {      
    // render user information including profile info and the user's skills
    props.USER_PROFILE = (data && data.userProfile && data.userProfile.length > 0) ? data.userProfile[0] : {};
    props.userProfileId = props.USER_PROFILE && props.USER_PROFILE.id ? props.USER_PROFILE.id : "";  
    if (props.userProfileId !== "") setHasProfile(true);
    renderLanding(props.USER_PROFILE);
  }), 3000);   
}
  
function renderLoginForm() {  
  $(".js-page-content").html('');
  let loginForm = `
  <div class="row">      
    <div class="header">  
      <h1  tabindex="0" class="section-header"> Career Strategy and Planning</h1>    
    </div>        
    <div class="col-6"> 
      <form id="Login" class="flex-container" method="post">
          <section class="js-login-form flex-item">
            <div><label>User Id:</label><br><input type="text" id="UserId" class="js-input-username" placeholder="Your user id" required><br>
                <label>Password:</label><br> <input type="password" id="userPassword" class="js-input-password" placeholder="Your password" required><br>        
                <div class=" error-message js-login-response" aria-hidden="true" hidden></div>
            </div>
          </section>                 
      </form> 
          <button type="submit" id="submitLogin" class="js-edit-event js-edit-button" >Login</button>  
          <button type="submit" id="registerUser" class="js-edit-event js-edit-button" >Register</button>                                         
          <button type="submit" id="submitReg" class="js-edit-event js-edit-button" hidden>Submit</button>              
    </div>                
  </div>`;

  $(".js-page-content").html(loginForm);
}
  


 