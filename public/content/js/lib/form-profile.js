
'use strict'
function profileInputsAreInValid() {

 // clear form of error messages
 $( ".form-error" ).remove();
 // check for validation errors
 displayError(validateField($("#profileFirst").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-firstname');
 displayError(validateField($("#profileLast").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-lastname');
 displayError(validateField($("#profileEmail").val(), ['required', 'nonEmpty', 'isTrimmed', 'isEmailFormatValid']), 'js-input-email');
 displayError(validateField($("#profilePhone").val(), ['required', 'nonEmpty', 'isTrimmed', 'isPhoneFormatValid']), 'js-input-phone'); 

 // check if errors found in form
 const errors = $('.form-error');
 return !errors && errors.length === 0;
} 

/*
  Validate the input data from the user profile form
*/
function validateProfileForm(profileId) {
 if (profileInputsAreInValid()) return;
 
  props.userId = localStorage.getItem('userId');  
  const firstName = $('#profileFirst').val();  
  const lastName =  $('#profileLast').val();  
  const email =  $('#profileEmail').val(); 
  const phone =  $('#profilePhone').val(); 
  let userProfile = ""; 

  if (profileId && profileId != undefined) {
    // update the user profile document for this user
    userProfile = `{"id": "${profileId}", "firstName": "${firstName}", "lastName": "${lastName}", "email": "${email}", "phone": "${phone}"}`; 
    setTimeout(putCareerStrategyAPI(pathUserProfile, 
      JSON.parse(userProfile), profileId, renderSecureContent),  3000);
  }
  else{        
    // create the user profile document for this user  
    userProfile = `{"firstName": "${firstName}","lastName": "${lastName}","email": "${email}", "phone": "${phone}", "userId": "${props.userId}" }`;    
    setTimeout(postCareerStrategyAPI(pathUserProfile, 
      JSON.parse(userProfile), "", function(data){
        if (data && data.id) {
          props.USER_PROFILE = (data && data.userProfile && data.userProfile.length > 0) ? data.userProfile[0] : [];
          props.userProfileId = props.USER_PROFILE && props.USER_PROFILE.id ? props.USER_PROFILE.id : "";                        
          renderSecureContent(); 
        }
        else if (data.responseJSON.error)
        {
          $('.js-error-message').html(data.responseJSON.error);
          $('.js-error-message').prop("hidden", false);
        }
        else {
          $('.js-error-message').html("Oops something went wrong. Please try again.");
          $('.js-error-message').prop("hidden", false);
        }
          
    }), 3000);
  }             
}
 
  /*
  Executed when user clicks the submit button for user profile form or job prospect form
  will call the correct function to complete the validation of inputs and submit the updates
*/
function submitProfileUpdates() {            
    const profileKey = $('#ProfileEditKey').val();
    validateProfileForm(profileKey);   
} 
/*
  Format the html to display the form to input data to edit or create user profile
*/
function renderUserProfileForm(data) { 
    if (canAccessProfile() === true)  {

    $('.js-page-content').html('');
   
      // set user profile json variable with default empty values
      let hiddenProfileId = "";
      let profile = {      
        "firstName": "",
        "lastName": "",      
        "email": "",    
        "phone": "",
        skills: []
      }; 
  
      // if user clicked edit button to edit existing user profile data then set user json variable with that data
      if (data && data.userProfile.length > 0) {
        profile = data.userProfile[[0]];
        hiddenProfileId = `<label for="ProfileEditKey" class="edit-label"></label><div class="td" hidden><input id="ProfileEditKey" type="text"value=${profile.id} hidden></input></div>`;       
      }
      else if (props.USER_PROFILE && props.USER_PROFILE != {} ) {
        profile = props.USER_PROFILE;
        hiddenProfileId = `<label for="ProfileEditKey" class="edit-label"></label><div class="td" hidden><input id="ProfileEditKey" type="text"value=${profile.id} hidden></input></div>`;       
      }
  
      // format the form html
      let formInputs = `
      <div class="col-6">       
        <form id="Profile" class="flex-container" method="post">      
            <fieldset class="edit-form">
                <legend><h2 tabindex="0">User Profile</h2></legend>
                <p> <label for="profileFirst" class="edit-label"><strong>First Name: </strong></label> <input type="text" id="profileFirst" class="js-input-firstname" value="${profile.firstName}" aria-required="true" required /></p>    
                <p> <label for="profileLast" class="edit-label"><strong>Last Name: </strong></label>  <input   type="text"  id="profileLast" class="js-input-lastname"  value="${profile.lastName}" aria-required="true" required /></p>
                <p> <label for="profileEmail" class="edit-label"><strong>Email: </strong></label>  <input   type="text"  id="profileEmail" class="js-input-email" value="${profile.email}" aria-required="true" required /></p>
                <p> <label for="profilePhone" class="edit-label"><strong>Phone: </strong></label>  <input   type="text"  id="profilePhone" class="js-input-phone"  value="${profile.phone}" /></p>
                ${hiddenProfileId}
            </fieldset>
        </form>
        <button type="submit" id="submitProfile" class="js-edit-event js-edit-button" >Submit</button>  
      </div> `;
  
      // display the form
      $('.js-page-content').html(formInputs);        
    }
  } 