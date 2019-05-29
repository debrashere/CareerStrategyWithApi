/*     
   render informational data and links to login and register if user not logged in
*/
function renderBanner() { 
    $( ".banner" ).html('');
    if (props && props.isLoggedIn === true) return;
    if (props && props.route === 'login') return;
    let banner =  
      `<div>
        <span class="btn rounded js-login-image"> <img id="loginImage" alt="login image" src="../src/app/common/images/login-icon-small.png">
        <a href="#" title="login">  Login</a></span>
        <span class="btn rounded js-register-image"> <img id="regImage" alt="register image" src="../src/app/common/images/login-icon-small.png">
        <a href="#" title="register">  Register</a></span>
      </div>`;   
      
    $('.banner').append(`${banner}`);    
  }
  
function setupBannerHandlers() {
  $(document).on('click','.js-login-image',function(e){e.preventDefault(); renderLoginForm(); });      
  $(document).on('click','.js-register-image',function(e){e.preventDefault(); renderRegistrationForm(); });     
}

$(setupBannerHandlers);
  
