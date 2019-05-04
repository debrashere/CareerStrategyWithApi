'use strict';
/*     
   render navigation, user userId and name
*/
function renderHeader(data) { 
    $( ".header" ).html('');
    let userInfo = renderUserProfile(data);
    let menu = Navigation(props);
    let navigation =  
      `<!-- navigation -->
        ${menu}
      <!-- Logged In User -->
        ${userInfo}  `;  
          
    $('.header').append(`${navigation}`);     
  }
 
/*     
   render profile information (user name, email address, phone number)
*/
function renderUserProfile(userProfile) {
  if (!isUserLoggedIn() ) return "";
  if (!userProfile || userProfile === {}) return "";
  
 let userInfo =
    `<div class="section-header">
        <em><span  tabindex="0">${userProfile.firstName} ${userProfile.lastName}</span></em>   
    </div>  `;  
    
  return userInfo;
} 
  