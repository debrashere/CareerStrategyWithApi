
'use strict';
function generateWhatWhereDate(prospect) { 
    const formattedDate = toDatetimeStringFormat(prospect.when);
    let summary = `  
    <div class="flex-item-widget">
      <div class="form-field">
          <div class="widget-label">What</div>
          <div class="widget-texbox">${prospect.what}</div>
      </div>    
      <div class="form-field">
          <div class="widget-label">Where</div>
          <div class="widget-texbox">${prospect.where}</div>
      </div>
      <div class="form-field">
        <div class="widget-label">Company URL </div>
        <div class="widget-texbox"><a href="${prospect.companyUrl}" target="_blank" title="Company Url">${prospect.companyUrl}</a></div>          
      </div>           
      <div class="form-field">
          <div class="widget-label">Date</div>
          <div class="widget-texbox">${formattedDate}</div>
      </div>   
      <div class="form-field">
          <div class="widget-label">Source</div>
          <div class="widget-texbox">${prospect.source}</div>
      </div>
      <div class="form-field">
        <div class="widget-label">Source URL <a class="form-link" href="${prospect.sourceUrl}" target="_blank" title="Source Url">Click to view</a></div>
        <div class="widget-texbox"><a href="${prospect.sourceUrl}" target="_blank" title="Company Url">${prospect.sourceUrl}</a></div>              
      </div>              
    </div>`;

    summary += `
    <div class="flex-item-widget">
      <div class="form-field">
        <div class="widget-label">Day to Day</div>
        <textarea  class="widget-texbox" rows="4" cols="50" value="${prospect.dayToDay}" readonly>${prospect.dayToDay}</textarea>
      </div>
      <div class="form-field">
        <div>Comments</div>
        <textarea class="widget-texbox" rows="4" cols="50" value="${prospect.comments}" readonly>${prospect.comments}</textarea>
      </div>
      <div class="form-field">
        <div>Details</div>
        <textarea class="widget-texbox"  rows="4" cols="50"  value="${prospect.details}" >${prospect.details}</textarea>
      </div>
    </div> `; 

  const summaryDetails = `
  <div class="input-form-body">
    <div class="flex-container">
      ${summary}   
    </div>        
  </div>`;

return summaryDetails;            
}