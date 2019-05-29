
function generateContacts(prospect) {  
    let contactsList = '';
  
    prospect.contacts.map( function(contact, index) { 
      contactsList += ` 
      <div class="flex-item-widget">  
        <div class="form-field">
            <div class="widget-label">First name: </div>
            <div class="widget-texbox"  tabindex="0">${contact.firstName}</div>
        </div>
        <div class="form-field">
            <div class="widget-label">Last name: </div>
            <div class="widget-texbox"  tabindex="0">${contact.lastName}</div>
        </div>
        <div class="form-field">
            <div class="widget-label">Email: </div>
            <div class="widget-texbox"  tabindex="0">${contact.email}</div>
        </div>
        <div class="form-field">
            <div class="widget-label">Phone: </div>
            <div class="widget-texbox"  tabindex="0">${contact.phone}</div>
        </div>
      </div> `;
    });
      
    let contactDetails =  `  
    <div class="input-form-body">
      <div class="flex-container">
        ${contactsList}   
      </div>        
    </div>`;
   
    return contactDetails;
  }