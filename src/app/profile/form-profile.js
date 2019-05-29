'use strict';
function isProfileFormValid() {

 // clear form of error messages
 $( ".form-error" ).remove();
 // check for validation errors
 displayError(validateField($("#profileFirst").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-firstname');
 displayError(validateField($("#profileLast").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-lastname');
 displayError(validateField($("#profileEmail").val(), ['required', 'nonEmpty', 'isTrimmed', 'isEmailFormatValid']), 'js-input-email');
 displayError(validateField($("#profilePhone").val(), ['isTrimmed']), 'js-input-phone'); 

 // check if errors found in form
 const errors = $('.form-error');
 return !errors || errors.length === 0;
} 

/*
  Validate the input data from the user profile form
*/
function validateProfileForm(profileId) {
 if (!isProfileFormValid()) return;
 
  props.userId = localStorage.getItem('userId');  
  const firstName = $('#profileFirst').val();  
  const lastName =  $('#profileLast').val();  
  const email =  $('#profileEmail').val(); 
  const phone =  $('#profilePhone').val(); 
  let userProfile = ""; 

  if (profileId && profileId != undefined && profileId != "") {
    // update the user profile document for this user
    userProfile = `{"id": "${profileId}", "firstName": "${firstName}", "lastName": "${lastName}", "email": "${email}", "phone": "${phone}"}`; 
    setTimeout(putCareerStrategyAPI(pathUserProfile, 
      JSON.parse(userProfile), profileId, refreshUserProfile),  3000);
  }
  else{        
    // create the user profile document for this user  
    userProfile = `{"firstName": "${firstName}","lastName": "${lastName}","email": "${email}", "phone": "${phone}", "userId": "${props.userId}" }`;    
    setTimeout(postCareerStrategyAPI(pathUserProfile, 
      JSON.parse(userProfile), "", function(data){
        if (data && data.id) {
          props.USER_PROFILE = data;
          props.userProfileId = props.USER_PROFILE && props.USER_PROFILE.userId ? props.USER_PROFILE._id : "";                        
          props.userProfileId === "" ? setHasProfile(false) : setHasProfile(true);
          displayPageMessageSuccess("Update was successful");
        }
        else if (data.responseJSON.error)
        {
          displayPageMessageFailure(data.responseJSON.error);    
        }
        else {
          displayPageMessageFailure("Oops something went wrong. Please try again.");        
        }
          
    }), 3000);
  }             
}
 
  /*
  Executed when user clicks the submit button for user profile form or job prospect form
  will call the correct function to complete the validation of inputs and submit the updates
*/
function submitProfileUpdates() {            
    const profileKey = $('#profileEditKey')[0].textContent
    validateProfileForm(profileKey);   
} 

/*
  Format the html to display the form to input data to edit or create user profile
*/ 

function renderUserProfileForm() {  
  /* user can access profile form if they are logged in */
  if (!isUserLoggedIn()) return;

  $('.js-page-content').html('');
  
    // set user profile json variable with default empty values
    let hiddenProfileId = `<span id="profileEditKey" class="js-profileEditKey" value="" hidden></span>`;       
    ;
    let profile = {      
      "firstName": "",
      "lastName": "",      
      "email": "",    
      "phone": "",
      skills: []
    }; 

    if (props.USER_PROFILE && props.USER_PROFILE.userId ) {
      profile = props.USER_PROFILE;
      hiddenProfileId = `<span id="profileEditKey" class="js-profileEditKey" value="${profile.id}" hidden>${profile.id}</span>`;       
    }

    // format the form html
    const profileFields = ` 
    <fieldset class="flex-item js-new-contact-form">  
       <div class="form-field">
          <label  for="profileFirst"><span >First name</span></label>
          <input id="profileFirst" type="text" class="form-input  js-profileFirst" placeholder="Your first name" value="${profile.firstName}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="profileLast"><span>Last name</span></label>
          <input id="profileLast" type="text" class="form-input  js-profileLast" placeholder="Your last name" value="${profile.lastName}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="profileEmail"><span>Email</span></label>
          <input id="profileEmail" type="text" class="form-input  js-profileEmail" placeholder="email" value="${profile.email}" >
      </div>
      <div class="form-field">
          <label for="profilePhone"><span>Phone</span></label>
          <input id="profilePhone" type="text" class="form-input  js-profilePhone" placeholder="Phone" value="${profile.phone}">
      </div>
      <div class="form-field">
        <button type="submit" id="submitProfile" class="btn js-edit-event js-edit-button  js-form-profile-update" >Submit</button>            
        <a  href="*" class="form-link js-render-dashboard" >Cancel</a>  
      </div>         
    </fieldset> `;
    
  let profileForm =  `  
  <div class="input-form-body">
    <form action="" method="post" class="flex-container form form-element">
      ${profileFields} 
      ${hiddenProfileId}      
    </form>         
  </div>`;
 
  $(".js-page-content").html(profileForm); 
  $('.js-profileEditKey').hide();
}

function refreshUserProfile(data) {
  if (apiReturnedError(data)) {
    return;
  }

  const queryPath = `userId=${props.userId}`;
  setTimeout(findCareerStrategyAPI(pathUserProfile, queryPath, "" , function(data) {
    const userProfile = (data && data.userProfile && data.userProfile.length > 0) ? data.userProfile[0]  : {};
    props.userProfileId  = userProfile ? userProfile.id : "";
    props.USER_PROFILE = userProfile; 
    displayPageMessageSuccess("Profile update/submission successful.");
    renderUserProfileForm();
  }), 3000); 
} 

function setupUserProfileHandlers() {
  $(document).on('click','.js-render-dashboard',function(e){e.preventDefault(); renderDashboard(); });             
  $(document).on('click','#submitProfile',function(e){e.preventDefault(); submitProfileUpdates(); });    
}

$(setupUserProfileHandlers);
 
