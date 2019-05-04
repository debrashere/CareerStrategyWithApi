'use strict'  
 
function generateContactsForm(prospect) {  
    let contactsList = '';
  
    prospect.contacts.map( function(contact, index) { 
      contactsList += ` 
      <fieldset id="contactFieldset-${index}" class="flex-item js-contactFieldset">  
      <div class="input-block">
            <a id="DeleteContact-${index}" href="#" class="form-link js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <div class="form-field">
          <label  for="prospectContactFirstName-${index}"><span >First name</span></label>
          <input id="prospectContactFirstName-${index}" type="text" class="form-input  js-input-contact-firstname" placeholder="Contact first name" value="${contact.firstName}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="prospectContactLastName-${index}"><span>Last name</span></label>
          <input id="prospectContactLastName-${index}" type="text" class="form-input  js-input-contact-lastname" placeholder="Contact last name" value="${contact.lastName}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="prospectContactEmail-${index}"><span>Email</span></label>
          <input id="prospectContactEmail-${index}" type="text" class="form-input  js-input-contact-email" placeholder="Contact email" value="${contact.email}" >
      </div>
      <div class="form-field">
          <label for="prospectContactPhone-${index}"><span>Phone</span></label>
          <input id="prospectContactPhone-${index}" type="text" class="form-input  js-input-contact-phone" placeholder="Contact Phone" value="${contact.phone}">
      </div>
      </fieldset> `;
  });
  
  let newContactFields = `
  <fieldset class="flex-item js-new-contact-form">  
    <a id="AddContact" href="#" class="form-link js-add-job-contact"><img id="addNewContact" alt="add status" src="./images/icon-add.png">(Add)</a>           
    <div class="form-field">
         <input id="prospectNewContactFirstName" type="text" class="form-input  js-prospectNewContactFirstName" placeholder="Contact first name" value="" aria-required="true" required>
    </div>
    <div class="form-field">
         <input id="prospectNewContactLastName" type="text" class="form-input  js-prospectNewContactLastName" placeholder="Contact last name" value="" aria-required="true" required>
    </div>
    <div class="form-field">
         <input id="prospectNewContactEmail" type="text" class="form-input  js-prospectNewContactEmai" placeholder="Contact email" value="" >
    </div>
    <div class="form-field">
         <input id="prospectNewContactPhone" type="text" class="form-input  js-prospectNewContactPhone" placeholder="Contact phone" value="">
    </div>
    </fieldset> `;
      
    let contactForms =  `  
    <div class="input-form-body">
      <form action="" method="post" class="form form-element flex-container js-tab-Contacts">
        ${newContactFields}     
        ${contactsList}   
      </form>        
    </div>`;
   
    return contactForms;
  }
      
function deleteJobContactForm(event) {
  const id = `#${event.currentTarget.id}`; 
  const index = id.split('-')[1];
  const toRemove = `contactFieldset-${index}`;
  $(`#${toRemove}`).detach();
}

function addJobContactForm(event) { 
  const existingContacts =   $('.js-contactFieldset');
  let index = 0;
  let lastContact = $('.js-new-contact-form')[0];

  /* find the last contact in list of existing contacts 
     extract the id in order to retrive the index 
  */
  if (existingContacts && existingContacts.length > 0) {
    lastContact = existingContacts.last()[0];
    index =  parseInt(lastContact.id.split('-')[1]);
    index = index + 1;
  }
 
  /* retrive the input fields for a new contact */
  const thisFirstname = $('#prospectNewContactFirstName')[0];
  const thisLastname = $('#prospectNewContactLastName')[0];
  const thisEmail = $('#prospectNewContactEmail')[0];
  const thisPhone = $('#prospectNewContactPhone')[0];

  /* check each input field for errors */
    // clear form of error messages
    $( ".form-error" ).remove();
    let allPassed = [];
    allPassed.push(!isInputValid(thisFirstname.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectNewContactFirstName'));
    allPassed.push(!isInputValid(thisLastname.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectNewContactLastName'));
    allPassed.push(!isInputValid(thisEmail.value, ['isTrimmed', 'validationIsEmailFormatValid'], 'js-prospectNewContactEmail'));
    allPassed.push(!isInputValid(thisPhone.value, ['isTrimmed', 'validationIsPhoneFormatValid'], 'js-prospectNewContactPhone'));
 
  /* if any errors return */
  if (jQuery.inArray(true, allPassed) !== -1) return;

  const newContact = `
  <fieldset id="contactFieldset-${index}" class="flex-item js-contactFieldset">  
  <div class="input-block">
        <a id="DeleteContact-${index}" href="#" class="form-link js-delete-job-contact"><img  alt="delete job contact" src="./images/icon-delete.png">(Delete)</a>
  </div>
  <div class="form-field">
      <label  for="prospectContactFirstName-${index}"><span >First name</span></label>
      <input id="prospectContactFirstName-${index}" type="text" class="form-input  js-input-contact-firstname" placeholder="Contact first name" value="${thisFirstname.value}" aria-required="true" required>
  </div>
  <div class="form-field">
      <label for="prospectContactLastName-${index}"><span>Last name</span></label>
      <input id="prospectContactLastName-${index}" type="text" class="form-input  js-input-contact-lastname" placeholder="Contact last name" value="${thisLastname.value}" aria-required="true" required>
  </div>
  <div class="form-field">
      <label for="prospectContactEmail-${index}"><span>Email</span></label>
      <input id="prospectContactEmail-${index}" type="text" class="form-input  js-input-contact-email" placeholder="Contact email" value="${thisEmail.value}" >
  </div>
  <div class="form-field">
      <label for="prospectContactPhone-${index}"><span>Phone</span></label>
      <input id="prospectContactPhone-${index}" type="text" class="form-input  js-input-contact-phone" placeholder="Contact Phone" value="${thisPhone.value}">
  </div>
  </fieldset> `;

  /* add this new contract to the list of contracts */
  $( newContact ).insertAfter(lastContact)  
 
  /* clear the input fields */ 
  $('#prospectNewContactFirstName').val("");
  $('#prospectNewContactLastName').val("");
  $('#prospectNewContactEmail').val("");
  $('#prospectNewContactPhone').val("");  
}
 

function checkStatusHistoryForErrors() { 
  /* retrive the input fields for existing status */
 const thisFirstname = $('.js-input-contact-firstname');
 const thisLastname = $('.js-input-contact-lastname');
 const thisEmail = $('.js-input-contact-email');
 const thisPhone = $('.js-input-contact-phone');

 /* check each input field for errors */
 for (let index=0; index< thisFirstname.length; index++) {
   isInputValid(thisFirstname[index].value, ['required', 'nonEmpty', 'isTrimmed'], thisFirstname[index].id);
   isInputValid(thisLastname[index].value, ['required', 'nonEmpty', 'isTrimmed'], thisLastname[index].id);
   isInputValid(thisEmail[index].value, ['isTrimmed', 'validationIsEmailFormatValid'], thisEmail[index].id);
   isInputValid(thisPhone[index].value, ['isTrimmed', 'validationIsPhoneFormatValid'], thisPhone[index].id);
   
 }
}
