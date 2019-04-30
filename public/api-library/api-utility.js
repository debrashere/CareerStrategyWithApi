function apiReturnedErrorOnLogin(data) {
    if (data) {
      if (data && data.userAuth) return false;
      if (data.status == 401)
      {
        displayPageMessageFailure("Invalid username and/or password");    
        return true;
      }
      else {
        displayPageMessageFailure("Oops something went wrong. Please try again.");       
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
      displayPageMessageFailure(data.statusText);  
      return true;
    } 
    if (data.responseJSON && data.responseJSON.error) {
      displayPageMessageFailure(data.responseJSON.error);  
      return true;
    }
    else {
      displayPageMessageFailure("Oops something went wrong. Please try again.");
      return true;
    }
  }
}  
   