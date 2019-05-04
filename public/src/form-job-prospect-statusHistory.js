'use strict'  
 
function generateStatusHistoryForm(prospect) {  
 const currentDate = toDatetimeStringFormat(new Date());

    let statusList = '';
    
    prospect.statusHistory.map( function(status, index) { 
      const formattedDate = toDatetimeStringFormat(status.date);
      statusList += ` 
      <fieldset id="statusFieldset-${index}" class="flex-item js-statusFieldset">  
      <div class="input-block">
            <a id="DeleteStatus-${index}" href="#" class="form-link js-delete-job-status"><img  alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
      </div>
      <div class="form-field">
          <label for="prospectStatusDate-${index}">Date</label>
          <input id="prospectStatusDate-${index}" type="datetime-local" class="form-input  js-input-status-date" placeholder="Date" value="${formattedDate}" aria-required="true" required>
      </div>      
      <div class="form-field">
          <label for="prospectStatusStatus-${index}"><span>Status</span></label>
          <input id="prospectStatusStatus-${index}" type="text" class="form-input  js-input-status-status" placeholder="Status" value="${status.status}" aria-required="true" required>
      </div>
      <div class="form-field">
          <label for="prospectStatusComment-${index}"><span>Comment</span></label>
          <textarea id="prospectStatusComment-${index}" class="form-input  js-input-status-comment"  rows="4" cols="30" placeholder="Comment"" value="${status.comment}" >${status.comment}</textarea>    
      </div>
      </fieldset> `;
  });
   
    let newStatusFields = `
    <fieldset id="statusFieldset" class="flex-item js-new-status-form">   
    <a id="AddStatus" href="#" class="form-link js-add-job-status"><img id="addNewSkill" alt="add status" src="./images/icon-add.png">(Add)</a>
    <div class="form-field">
            <input id="prospectStatusDate" type="datetime-local" class="form-input js-prospectStatusDate" placeholder="Status Date" value="${currentDate}" aria-required="true" required>
        </div>
        <div class="form-field">
            <input id="prospectStatusStatus" type="text" class="form-input js-prospectStatusStatus" placeholder="Status" value="" aria-required="true" required>
        </div>
        <div class="form-field">
            <input id="prospectStatusComment" type="text" class="form-input js-prospectStatusComment" placeholder="Comment" value="" >
        </div>
        </fieldset> `;
        

        let statusForms =  `  
        <div class="input-form-body">
          <form action="" method="post" class="form form-element flex-container js-tab-status">
            ${newStatusFields}     
            ${statusList}   
          </form>        
        </div>`;
       
    
    return statusForms;
}

function deleteJobStatusForm(event) {
    const id = `#${event.currentTarget.id}`; 
    const index = id.split('-')[1];
    const toRemove = `statusFieldset-${index}`;
    $(`#${toRemove}`).detach();
  }
  
  function addJobStatusForm(event) {
    const existingStatus = $('.js-statusFieldset');
    let index = 0;
    let lastStatus = $('.js-new-status-form')[0];
  
    if (existingStatus && existingStatus.length > 0) {
      lastStatus = existingStatus.last()[0];
      index =  parseInt(lastStatus.id.split('-')[1]);
      index = index + 1;
    }
  
     /* retrive the input fields for a new status */
    const thisDate = $('#prospectStatusDate')[0];
    const thisStatus = $('#prospectStatusStatus')[0];
    const thisComment = $('#prospectStatusComment')[0];
  
      /* check each input field for errors */
      // clear form of error messages
      $( ".form-error" ).remove();
      let allPassed = [];
      allPassed.push(!isInputValid(thisDate.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectStatusDate'));
      allPassed.push(!isInputValid(thisStatus.value, ['required', 'nonEmpty', 'isTrimmed'], 'js-prospectStatusStatus'));
      allPassed.push(!isInputValid(thisComment.value, ['isTrimmed'], 'js-prospectStatusComment'));
      
    /* if any errors return */
    if (jQuery.inArray(true, allPassed) !== -1) return;
  
    const newStatus =`
     <div id="statusFieldset-${index}" class="flex-item js-statusFieldset"> 
      <fieldset id="statusFieldset-${index}" class="flex-item js-statusFieldset">  
        <div>
          <a id="DeleteStatus-${index}" href="#" class="form-link js-delete-job-status"><img alt="delete job status" src="./images/icon-delete.png">(Delete)</a>
        </div>  
        <div class="form-field">
            <label  for="prospectStatusDate-${index}">Date</label>
            <input id="prospectStatusDate-${index}" type="text" class="form-input  js-input-status-date" placeholder="Date" value="${thisDate.value}" aria-required="true" required>
        </div>
        <div class="form-field">
            <label for="prospectStatusStatus-${index}">Status</label>
            <input id="prospectStatusStatus-${index}" type="text" class="form-input  js-input-status-status" placeholder="Status" value="${thisStatus.value}" aria-required="true" required>
        </div>
        <div class="form-field">
            <label for="prospectStatusComment-${index}">Comment</label>
            <input id="prospectStatusComment-${index}" type="text" class="form-input  js-input-status-comment" placeholder="Comment" value="${thisComment.value}" >
        </div>
      </fieldset> `;
    
   
    /* add this new status to the list status list */
    $( newStatus ).insertAfter( lastStatus);   
    
    /* clear the input fields */ 
    const formattedDate = toDatetimeStringFormat(new Date());
    $('#prospectStatusDate').val(formattedDate);
    $('#prospectStatusStatus').val("");
    $('#prospectStatusComment').val("");
}


function checkContactsListForErrors() { 
   /* retrive the input fields for existing status */
  const thisDate = $('.js-input-status-date');
  const thisStatus = $('.js-input-status-status');
  const thisComment = $('.js-input-status-comment');

  /* check each input field for errors */
  for (let index=0; index< thisDate.length; index++) {
    isInputValid(thisDate[index].value, ['required', 'nonEmpty', 'isTrimmed'], thisDate[index].id);
    isInputValid(thisStatus[index].value, ['required', 'nonEmpty', 'isTrimmed'], thisStatus[index].id);
    isInputValid(thisComment[index].value, ['isTrimmed'], thisComment[index].id);
    
  }
}
   
  