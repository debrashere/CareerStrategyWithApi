
function displayWarning(text, element) {  
    if (text !== undefined) {   
        let warning = `<div class="form-warning" aria-hidden="false" >${text}</div>`;
        $( warning ).insertAfter( $(`.${element}`));
    }
        
}
function displayError(text, element) {
    if (text !== undefined) {       
        let error = `<div class="form-error" aria-hidden="false" >${text}</div>`;   
        $( error ).insertAfter( $(`.${element}`));   
    }
}
function displayInformation(text, element) {
    if (text !== undefined) {       
        let error = `<div class="message-information" aria-hidden="false" >${text}</div>`;   
        $( error ).insertAfter( $(`.${element}`));   
    }
}

function displayPageMessageSuccess(text) {
    if (!text || text === "") {
        $( '.js-page-message' ).html(text); 
        $( '.js-page-message' ).hide();    
    }
    else {       
        let message = `<div class="message-success" aria-hidden="false" >${text}</div>`;   
        $( '.js-page-message' ).html(message);   
        $( '.js-page-message' ).show();   
    }
}

function displayPageMessageFailure(text) {
    if (!text || text === "") {
        $( '.js-page-message' ).html(text); 
        $( '.js-page-message' ).hide();    
    }
    else {       
        let message = `<div class="message-error" aria-hidden="false" >${text}</div>`;   
        $( '.js-page-message' ).html(message); 
        $( '.js-page-message' ).show();    
    }
}
