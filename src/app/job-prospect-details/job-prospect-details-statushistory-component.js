'use strict';
function getOrderedStatusHistory(prospect) {
  if (!prospect || !prospect.statusHistory) return "";
  let sortedByDate = prospect.statusHistory.sort(function(a,b) {
    return new Date(b.date) - new Date(a.date);
  });
  return sortedByDate;
}

function generateStatusHistory(prospect) {
    let statusList = '';
  
    if (prospect && prospect.statusHistory) {
    getOrderedStatusHistory(prospect).map( function(status, index) { 
      const formattedDate = toDatetimeStringFormat(status.date);
       statusList += ` 
       <div class="flex-item-widget">  
         <div class="form-field">
             <div class="widget-label">Date: </div>
             <div class="widget-texbox"  tabindex="0">${formattedDate}</div>
         </div>
         <div class="form-field">
             <div class="widget-label">Status: </div>
             <div class="widget-texbox"  tabindex="0">${status.status}</div>
         </div>
         <div class="form-field">
             <div class="widget-label">Comment: </div>
             <div class="widget-texbox"  tabindex="0">${status.comment}</div>
         </div>
        </div> `;
        });
    }
  
        let headerAndDetails =  `  
        <div class="input-form-body">
          <div class="flex-container">
            ${statusList}   
          </div>        
        </div>`;
  
        return headerAndDetails;
  }