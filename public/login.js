'use strict'
const CAREER_STRATEGY_URL = 'http://localhost:8080/api';
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
    error: function () {
      console.log('We are sorry but our servers are having an issue right now');
    }
  });
}

function registerUserAPI(path, update, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      location.href = "./login.html";    
    },
    data: JSON.stringify(update),
    error: function () {
      console.log('We are sorry but our servers are having an issue right now');
    }
  });
}
 
function loginIsInValid() {
  let message = "";
  const userName =  $('#UserId').val();
  const password = $("#userPassword").val();
  if (!userName || userName.length < 8) {
    message += "User name is required. <br>";
  }
  if (!password || password.length < 6) {
    message += "Password is required and must be at least 6 characters.";
  }
  return message;
}
function watchSubmitLoginClick() {       
  $('#submitLogin').click(event => {
    event.preventDefault(); 
    if (loginIsInValid()) {
      $('.js-login-response').html(loginIsInValid());
      return;
    }
    const userName =  $('#UserId').val();
    const password = $("#userPassword").val(); 
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}"}`);        
    
  setTimeout(loginUserAPI(pathAuth, loginJson, function(data) {    
   
      localStorage.setItem('token', data.userAuth.authToken);
      localStorage.setItem('userProfileId', data.userAuth.profileId);
      localStorage.setItem('userId', data.userAuth.id);
      location.href = "./userProfile/userProfile.html";
    }), 3000);
  }); 
}

function registrationIsInValid() {
  let message = "";
  const userName =  $('#userName').val();
  const password = $("#password").val();
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();    
 
  if (!userName || userName.length < 8) {
    message += "User name is required. <br>";
  }
  if (!password || password.length < 6) {
    message += "Password is required and must be at least 6 characters.";
  }
  if (!firstName || firstName.length < 2) {
    message += "First name is required and must be at least 2 characters.";
  }
  if (!lastName || lastName.length < 2) {
    message += "Last name is required and must be at least 2 characters.";
  }
  return message;
}
function watchSubmitRegistrationClick() {       
  $('#submitReg').click(event => {
    event.preventDefault(); 
    if (registrationIsInValid()) {
      $('.js-login-response').html(registrationIsInValid());
      return;
    }  
     const userName =  $('#userName').val();
     const password = $("#password").val();
     const firstName = $("#firstName").val();
     const lastName = $("#lastName").val();    
    
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}","firstName": "${firstName}", "lastName": "${lastName}"}`);    
    registerUserAPI(pathUsers, loginJson, function(data) {  
      return data;
    });
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