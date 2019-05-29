'use strict';

function generatePropectDetails(prospect) {

    return `
    <div class="header">
      <h1>Career Strategy</h1>
      <h2 tabindex="0">Job Prospects <img  class="js-edit-this-job-prospect" alt="edit job prospect" src="../src/app/common/images/icon-add.png">(Edit)</a></h2>
      <h3 tabindex="0">${prospect.what}</h3>
      <h3 tabindex="0">${prospect.where}</h3>
    </div>
    <div class="responsive-tabs">
      <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
      <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
      <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
      <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
      <input class="state" type="radio" title="tab-five" name="tabs-state" id="tab-five" />
  
      <div class="tabs flex-tabs">
        <label for="tab-one" id="tab-one-label" class="tab">Summary</label>
        <label for="tab-two" id="tab-two-label" class="tab">Job Skills</label>
        <label for="tab-three" id="tab-three-label" class="tab">Contacts</label>
        <label for="tab-four" id="tab-four-label" class="tab">Status History</label>
        <label for="tab-five" id="tab-five-label" class="tab">Challenges</label>        
        <div id="tab-one-panel"   class="panel active"> ${generateWhatWhereDate(prospect)} </div>
        <div id="tab-two-panel"   class="panel"> ${generateUserAndJobSkills(props.USER_PROFILE, prospect)} </div>
        <div id="tab-three-panel" class="panel"> ${generateContacts(prospect)} </div>
        <div id="tab-four-panel"  class="panel"> ${generateStatusHistory(prospect)} </div>
        <div id="tab-five-panel"  class="panel"> ${generateChallenges(prospect)} </div>
        
      </div>
    </div>`;
}
   
/*     
   render user skills
*/
function generateUserAndJobSkills(profile, prospect) { 

  let skills = generateJobSkills(prospect);
      skills += generateUserSkills(profile);

    return skills;
} 

function renderJobProspectDetails(event) {
  if (!isUserLoggedIn()) return;
  if (!canAccessProfile()) return; 

  const id = `#${event.currentTarget.id}`;   
  let prospectId = $(id).parent().parent().find('.js-prospectId').text(); 
  props.prospectId = prospectId;
  refreshJobProspectDetails(prospectId);
}
   

function refreshJobProspectDetails(prospectId) {   
    const queryPath = `userId=${props.userId}`;
    setTimeout(findCareerStrategyAPI(pathJobProspects, queryPath, "",  function(data) {
      props.PROSPECTS = data.prospect;
      if (apiReturnedError(data)) return; 
      generateJobProspectDetails(prospectId);
    }), 3000);  
}

function generateJobProspectDetails(prospectId) {  
    let prospect = props.PROSPECTS.filter( id => id.id === prospectId)[0];
    props.prospect = prospect;
  
    $('.js-page-content').html(`${ generatePropectDetails(prospect)}`);
    $('.js-prospectId').hide();
    $('.js-contactId').hide();
    $('.js-statusId').hide(); 
}

function setupProspectDetailsHandlers() {
  $(document).on('click','.js-edit-this-job-prospect',function(e){e.preventDefault(); editProspectForm(props.prospect); });   
}

$(setupProspectDetailsHandlers);
 
