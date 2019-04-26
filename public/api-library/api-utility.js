function apiReturnedErrorOnLogin(data) {
    if (data) {
      if (data && data.userAuth) return false;
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


/*     
  Check if API response returned an error and set error message
*/
function apiReturnedError(data) {  
  if (data && data.status) {
    if (data.status == '400')  { 
      $('.js-page-message').html(data.statusText);
      $('.js-page-message').show();
      return true;
    } 
    if (data.responseJSON.error) {
      $('.js-page-message').html(data.responseJSON.error);
      $('.js-page-message').prop("hidden", false);
      return true;
    }
    else {
      $('.js-page-message').html("Oops something went wrong. Please try again.");
      $('.js-page-message').prop("hidden", false);
      return true;
    }
  }
}  
   