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
 
function watchSubmitLoginClick() {       
  $('#submitLogin').click(event => {
    event.preventDefault(); 
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

function watchSubmitRegistrationClick() {       
  $('#submitReg').click(event => {
    event.preventDefault();     
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