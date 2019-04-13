'use strict'
const CAREER_STRATEGY_URL_USERS ='https://sheltered-gorge-50174.herokuapp.com/api';
const pathUsers = "users";
const pathAuth = "auth/login";

/*    
  Retrieve data from Career Strategy API
*/
function loginUserAPI(path, input, callback) {
  let url =  `${CAREER_STRATEGY_URL_USERS}/${path}/`;
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

function registerUserAPI(path, input, callback) {
  let url =  `${CAREER_STRATEGY_URL_USERS}/${path}/`;
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
  