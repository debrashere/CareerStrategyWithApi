'use strict'
const CAREER_STRATEGY_URL ='https://sheltered-gorge-50174.herokuapp.com/api';
const pathUsers = "users";
const pathAuth = "auth/login";

/*    
  Retrieve data from Career Strategy API
*/
function loginUserAPI(path, input, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: callback, 
    data: JSON.stringify(input), 
    error: callback
  });
}

function registerUserAPI(path, update, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: callback,
    data: JSON.stringify(update),
    error: callback
  });
}
 
function apiReturnedError(data) {
  if (data) {
    if (data.status < 400) return false;
    if (data.status == 401)
    {
      $('.js-login-response').html("Invalid username and/or password");
      $('.js-login-response').prop("hidden", false);
      return true;
    }
    else {
      $('.js-login-response').html("Oops something went wrong. Please try again.");
      $('.js-login-response').prop("hidden", false);
      return true;
    }
  }
}

function watchSubmitLoginClick() {       
  $('#submitLogin').click(event => {
    event.preventDefault(); 
    const userName =  $('#UserId').val();
    const password = $("#userPassword").val(); 
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}"}`);        
    
    setTimeout(loginUserAPI(pathAuth, loginJson, function(data) {
    if (!apiReturnedError(data)) {
      localStorage.setItem('token', data.userAuth.authToken);
      localStorage.setItem('userId', data.userAuth.id);
      location.href = "./userProfile.html";
    }
    }), 3000);
  }); 
}
function submitFormIsValid() {
  let errMsg = "";
  const userName =  $('#userName').val();
  const password = $("#password").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  if (!userName || userName.trim().length <= 0 ) {
    errMsg += " Username is required.";
  }
  if (!password || password.trim().length <= 0 ) {
    errMsg += " Password is required. <br/>";
  }
  if (!firstName || firstName.trim().length <= 0 ) {
    errMsg += " First name is required. <br/>";
  }
  if (!lastName || lastName.trim().length <= 0 ) {
    errMsg += " Last Name is required";
  }
  return errMsg;
}

function watchSubmitRegistrationClick() {       
  $('#submitReg').click(event => {
    event.preventDefault(); 
    let errors = submitFormIsValid();
    if (errors.length > 0) {
      $('.js-signup-response').prop("hidden", false);
      $('.js-signup-response').html(errors);
      return;
    } 

     const userName =  $('#userName').val();
     const password = $("#password").val();
     const firstName = $("#firstName").val();
     const lastName = $("#lastName").val();    
    
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}","firstName": "${firstName}", "lastName": "${lastName}"}`);    
    setTimeout(registerUserAPI(pathUsers, loginJson, function(data){
      $('.js-signup-response').prop("hidden", false);
      if (!data.responseJSON)
      {
        $('.js-signup-response').html('Registration was successful. Please <a href="./login.html">login</a>.');
      }
      else if (data.responseJSON && data.responseJSON.message)
      {
        $('.js-signup-response').html(`Registration failed.  ${data.responseJSON.location} ${data.responseJSON.message}`);
      }
      else {
        $('.js-signup-response').html("Oops something went wrong. Please try again.");
      }        
    }), 3000);
  }); 
}
  
function watchRegisterClick() {       
  $('#registerUser').click(event => {
    event.preventDefault(); 
    $('.js-signup-form').prop("hidden", false);
    $('.js-login-form').prop("hidden", true);
    $('#submitLogin').prop("hidden", true);
    $('#registerUser').prop("hidden", true);
    $('#submitReg').prop("hidden", false);
  }); 
}

function setupHandleEvents() {  
  watchSubmitLoginClick();
  watchRegisterClick();  
  watchSubmitRegistrationClick();
}

$(setupHandleEvents);