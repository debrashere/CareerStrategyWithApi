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
  if (data && data.responseJSON) {
    if (data.responseJSON.error)
    {
      $('.js-error-message').html(data.responseJSON.error);
      $('.js-error-message').prop("hidden", false);
      return true;
    }
    else {
      $('.js-error-message').html("Oops something went wrong. Please try again.");
      $('.js-error-message').prop("hidden", false);
      return true;
    }
  }
}  
   