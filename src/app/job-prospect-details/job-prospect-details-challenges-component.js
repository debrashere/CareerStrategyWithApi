'use strict';
function getOrderedChallenges(prospect) {
  if (!prospect || !prospect.challenges) return "";
  let sortedByDate = prospect.challenges.sort(function(a,b) {
    return new Date(b.dateRequested) - new Date(a.dateRequested);
  });
  return sortedByDate;
}

function generateChallenges(prospect) {
    let challengeList = '';
  
    if (prospect && prospect.challenges) {
      getOrderedChallenges(prospect).map( function(challenge, index) { 
      const formattedDateRequested = toDatetimeStringFormat(challenge.dateRequested);
      const formattedDateCompleted = toDatetimeStringFormat(challenge.dateCompleted);
       challengeList += ` 
       <div class="flex-item-widget">  
        <div class="form-field">
          <div class="widget-label">Challenge Type: </div>
          <div class="widget-texbox"  tabindex="0">${challenge.challengeType}</div>
        </div>       
         <div class="form-field">
             <div class="widget-label">Date Requested: </div>
             <div class="widget-texbox"  tabindex="0">${formattedDateRequested}</div>
         </div>
         <div class="form-field">
             <div class="widget-label">Date Completed: </div>
             <div class="widget-texbox"  tabindex="0">${formattedDateCompleted}</div>
         </div>         
         <div class="form-field">
             <div class="widget-label">Comments: </div>
             <div class="widget-texbox"  tabindex="0">${challenge.comments}</div>
         </div>
         <div class="form-field">
             <div class="widget-label">Results: </div>
             <div class="widget-texbox"  tabindex="0">${challenge.results}</div>
         </div>  
         <div class="form-field">
             <div class="widget-label">Url: </div>
             <div class="widget-texbox"  tabindex="0">${challenge.url}</div>
         </div>   
         <div class="form-field">
             <div class="widget-label">Company Url: </div>
             <div class="widget-texbox"  tabindex="0">${challenge.companyUrl}</div>
         </div>  
         <div class="form-field">
             <div class="widget-label">Lanquage: </div>
             <div class="widget-texbox"  tabindex="0">${challenge.lanquage}</div>
         </div>                                             
        </div> `;
        });
    }
  
        let headerAndDetails =  `  
        <div class="input-form-body">
          <div class="flex-container">
            ${challengeList}   
          </div>        
        </div>`;
  
        return headerAndDetails;
  }