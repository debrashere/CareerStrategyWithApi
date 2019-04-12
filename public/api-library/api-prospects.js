'use strict' 
const CAREER_STRATEGY_URL ='https://sheltered-gorge-50174.herokuapp.com/api';
const pathUser = "user";
const pathUserProfile  = "userprofiles";
const pathJobProspects  = "prospects";
 
/*     
  Retrieve data from Career Strategy API
*/
function findCareerStrategyAPI(path, query, id,  callbackFn) {  
  $('.js-error-message').empty();
  $('.js-error-message').prop("hidden", true);
  const encodedQuery = encodeURIComponent(query);
  let url =  `${CAREER_STRATEGY_URL}/${path}`;
  url = id == "" ? url: `${url}/${id}/`;
  url = query == "" ? url: `${url}?${query}`;  
 
  const authToken = localStorage.getItem('token'); 
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then(response => {
       
    if (response.ok) {  
      if (response.status == 204) {
         return null;
      }   
      return response.json();
    }
    else if (response.status == 401) {
      // Redirect the to the login page.
      //location.href = "./login.html";
      renderLoginForm();
    }  
    throw new Error(response.statusText);
  })
  .then(responseJson => callbackFn(responseJson))
  .catch(error => { 

    $('.js-error-message').prop("hidden", false);
    $('.js-error-message').text(`Something went wrong: ${error}`);
  }); 
} 

/*     
  Post data via Career Strategy API
*/
function postCareerStrategyAPI(path, query, id, callback) {
  $('.js-error-message').empty();
  $('.js-error-message').prop("hidden", true);
  let url =  `${CAREER_STRATEGY_URL}/${path}`; 
  const authToken = localStorage.getItem('token');

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',         
    data: JSON.stringify(query),
    headers: {
      "Authorization": `Bearer ${authToken}`
    },      
    success: callback,
    error: callback    
  });
}

/*     
  Update data via Career Strategy API
*/
function putCareerStrategyAPI(path, update, id, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  url = id == "" ? url: `${url}/${id}/`;
  const authToken = localStorage.getItem('token');

  $.ajax({
    url: url,
    type: 'put',
    dataType: 'json',
    contentType: 'application/json',    
    data: JSON.stringify(update), 
    headers: {
      "Authorization": `Bearer ${authToken}`
    },     
    success: callback,
    error: callback     
  });  
} 

/*     
  Delete data via Career Strategy API
*/
function deleteCareerStrategyAPI(path, update, id, callback) {
  let url =  `${CAREER_STRATEGY_URL}/${path}/`;
  url = id == "" ? url: `${url}${id}/`;
  const authToken = localStorage.getItem('token');

  const settings = {
    url: url,
    data: update,
    dataType: 'json',
    type: 'DELETE',    
    headers: {
      "Authorization": `Bearer ${authToken}`
    },      
    success: callback,
    error:callback
  };
  $.ajax(settings);
}
 