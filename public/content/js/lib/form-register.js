
 'use strict'
 function inputsAreValid() {
 
  // clear form of error messages
  $( ".form-error" ).remove();
  // check for validation errors
  displayError(validateField($("#firstName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-firstname');
  displayError(validateField($("#lastName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-lastname');
  displayError(validateField($("#userName").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-username');
  displayError(validateField($("#password").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-password'); 

  // check if errors found in form
  const errors = $('.form-error');
  return !errors && errors.length === 0;
} 

//
function submitRegistion() {         
    if (!inputsAreValid()) return;
    
    const userName =  $('#userName').val();
    const password = $("#password").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();    
    
    const loginJson = JSON.parse(`{"username": "${userName}","password": "${password}","firstName": "${firstName}", "lastName": "${lastName}"}`);    
    setTimeout(registerUserAPI(pathUsers, loginJson, function(data){
      $('.js-register-response').prop("hidden", false);
      if (!data.responseJSON)
      {
        $('.js-register-response').html('Registration was successful. Please <a href="#" class="js-menuitem-login">login</a>.');
      }
      else if (data.responseJSON && data.responseJSON.message)
      {
        $('.js-register-response').html(`Registration failed.  ${data.responseJSON.location} ${data.responseJSON.message}`);
      }
      else {
        $('.js-register-response').html("Oops something went wrong. Please try again.");
      }  
    }), 3000);  
  }
 

function renderRegistrationForm() {
    $(".js-page-content").html('');
    let registrationForm = `
      <div class="row">      
        <div class="header">  
          <h1  tabindex="0" class="section-header"> Career Strategy and Planning</h1> 
        </div>        
        <div class="col-6">  
          <form id="register" class="flex-container" method="post">
            <section class="js-register-form flex-item">
                <div><label>First Name:</label><br><input type="text" id="firstName" class="js-input-firstname"  placeholder="Your first name" required><br>
                    <label>Last Name:</label><br><input type="text" id="lastName" class="js-input-lastname"  placeholder="Your last name" required><br>
                    <label>User Id: </label><br><input type="text" id="userName" class="js-input-username"  placeholder="Your user id" required><br>           
                    <label>Password: </label><br><input type="password" id="password" class="js-input-password" placeholder="Your password" required><br>                           
                </div>
            </section>                  
          </form> 
          <button type="submit" id="submitLogin" class="js-edit-event js-edit-button" >Login</button>  
          <button type="submit" id="submitReg" class="js-edit-event js-edit-button">Submit</button>              
        </div>                
      </div>`;

        $(".js-page-content").html(registrationForm);         
}


 