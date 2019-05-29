
function generateProspectSummaryForm(prospect) {  
    $('.js-page-content').html();
             
    let hiddenProspectId = "";
    let formattedDate = toDatetimeStringFormat(new Date());
  
    // If user clicked edit for an existing job prospect then save the id for that prospect in hidden form element 
    if (prospect && prospect.id && prospect.id != '') {  
      hiddenProspectId = `<label for="ProspectEditKey" class="edit-label"></label><div class="td" hidden><input id="ProspectEditKey" type="text"value=${prospect.id} hidden></input></div>`;      
      formattedDate = toDatetimeStringFormat(prospect.when)
    }  
  
      // Format the input form for job prospect
      let prospectSummary = `  
      <fieldset>  
      <div class="form-field">
          <label  for="prospectWhat">What</label>
          <input id="prospectWhat" type="text" class="form-input  js-input-what" placeholder="What" value="${prospect.what}" aria-required="true" required>
      </div>    
      <div class="form-field">
          <label  for="prospectWhere">Where</label>
          <input id="prospectWhere" type="text" class="form-input  js-input-where" placeholder="Where" value="${prospect.where}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="prospectWhen">Date</label>
          <input id="prospectWhen" type="datetime-local" class="form-input  js-input-when" placeholder="Date" value="${formattedDate}" aria-required="true" required>
      </div>    
      <div class="form-field">
          <label for="prospectSource">Source</label>
          <text id="prospectSource" type="text" class="form-input js-input-source" placeholder="Source" value="${prospect.source}" >
      </div>
      <div class="form-field">
        <label for="prospectSourceUrl">Source URL</label>
        <textarea id="prospectSourceUrl" class="form-input js-input-sourceurl"  rows="4" cols="30" placeholder="Source Url" value="${prospect.sourceUrl}" >${prospect.sourceUrl}</textarea>   
        </div>
        <div class="form-field">
        <label for="prospectCompanyUrl">Company URL</label>
        <textarea id="prospectCompanyUrl" class="form-input js-input-companyurl"  rows="4" cols="30" placeholder="Company Url" value="${prospect.companyUrl}" >${prospect.companyUrl}</textarea>   
        </div>        
      <div class="form-field">
        <label for="prospectDayToDay">Day to Day</label>
        <textarea id="prospectDayToDay" class="form-input js-input-daytoday"  rows="4" cols="30" placeholder="Day to Day" value="${prospect.dayToDay}" >${prospect.dayToDay}</textarea>
      </div>
      <div class="form-field">
        <label for="prospectComments">Comments</label>
        <textarea id="prospectComments" class="form-input js-input-comments"  rows="4" cols="30"  placeholder="Comments" value="${prospect.comments}" >${prospect.comments}</textarea>
      </div>
      <div class="form-field">
        <label for="prospectDetails">Details</label>
        <textarea id="prospectDetails" class="form-input js-input-details" rows="4" cols="30" placeholder="Details" value="${prospect.details}" >${prospect.details}</textarea>
      </div>
      </fieldset> `; 
      
      let prospectForm =  `  
      <div class="input-form-body">
        <div>
            <div class="form-item">
                <form action="" method="post" class="form flex-container js-tab-Summary">
                ${prospectSummary}
                ${hiddenProspectId}
                </form>
            </div>
      </div>
    </div>`;
  
    return prospectForm;
  } 
  
  
 function checkProspectSummaryForErrors() {
 // check for validation errors
 displayError(validateField($("#prospectWhat").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-what');
 displayError(validateField($("#prospectWhen").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-when');
 displayError(validateField($("#prospectWhere").val(), ['required', 'nonEmpty', 'isTrimmed']), 'js-input-where');
 displayError(validateField($("#prospectSource").val(), [ 'isTrimmed']), 'js-input-source'); 
 displayError(validateField($("#prospectSourceUrl").val(), ['isUrlFormatValid', 'isTrimmed']), 'js-input-sourceurl'); 
 displayError(validateField($("#prospectCompanyUrl").val(), ['isUrlFormatValid', 'isTrimmed']), 'js-input-companyurl'); 
 displayError(validateField($("#prospectDayToDay").val(), [ 'isTrimmed']), 'js-input-daytoday'); 
 displayError(validateField($("#prospectComments").val(), [ 'isTrimmed']), 'js-input-comments'); 
 displayError(validateField($("#prospectDetails").val(), [ 'isTrimmed']), 'js-input-details'); 
}