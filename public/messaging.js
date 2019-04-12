
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
