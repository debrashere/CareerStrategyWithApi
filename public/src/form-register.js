
'use strict';
 function isRegisterFormInValid() {
 
  // clear form of error messages
  $( ".form-error" ).remove();
  // check for validation errors
  displayError(validateField($("#firstName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-firstname');
  displayError(validateField($("#lastName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-lastname');
  displayError(validateField($("#userName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-username');
  displayError(validateField($("#password").val(), ['required', 'nonEmpty', 'isTrimmed', 'validationIsLength']), 'js-input-password'); 

  // check if errors found in form
  const errors = $('.form-error');
  return errors && errors.length > 1;
} 

//
function submitRegistion() {         
    if (isRegisterFormInValid()) return;
    
    const userName = $('#userName').val();
    const password = $("#password").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();    
    
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}","firstName": "${firstName}", "lastName": "${lastName}"}`);    
    setTimeout(registerUserAPI(pathUsers, loginJson, function(data){
      $('.js-page-message').prop("hidden", false);
      if (!data.responseJSON)
      {
        $('.js-page-message').html('Registration was successful. Please <a href="#" class="js-menuitem-login">login</a>.');
      }
      else if (data.responseJSON && data.responseJSON.message)
      {
        $('.js-page-message').html(`Registration failed.  ${data.responseJSON.location} ${data.responseJSON.message}`);
      }
      else {
        $('.js-page-message').html("Oops something went wrong. Please try again.");
      }  
    }), 3000);  
  }

function renderRegistrationForm(data) {  
  
    // format the form html
    const registrationFields = ` 
    <fieldset class="flex-item">  
      <div class="form-field">
          <label  for="firstName"><span >First name</span></label>
          <input id="firstName" type="text" class="form-input  js-input-firstname" placeholder="Your first name" value="" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="lastName"><span>Last name</span></label>
          <input id="lastName" type="text" class="form-input  js-input-lastname" placeholder="Your last name" value="" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="userName"><span>Email</span></label>
          <input id="userName" type="text" class="form-input  js-input-usernam" placeholder="User name" value="" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="password"><span>Password</span></label>
          <input id="password" type="password" class="form-input   js-input-password" placeholder="Password"value="" aria-required="true" required>
      </div>
      <div class="form-field">
      <button type="submit" id="submitReg" class="js-edit-event js-edit-button  js-form-register-user" >Register</button>            
      <a  href="#" id="menuItem-login" class="js-register-login-link">Login</a>  
   </div>        
    </fieldset> `;
    
  let profileForm =  `  
  <div class="input-form-body">
    <form action="" method="post" class="flex-container form form-element">
      ${registrationFields}     
    </form>         
  </div>`;
 
  $(".js-page-content").html(profileForm); 
} 