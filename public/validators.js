
function  validationRequired ( value ) {   
    return value !== undefined && value !== "" ?  undefined : 'Required';
};
function  validationNonEmpty( value ) { 
    let trimmed = !value ? '' : value.trim();
    return trimmed !== '' ?  undefined :  'Cannot be empty';
};
function  validationIsTrimmed( value ) {
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
}

function  validationIsLength( value, length ) {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
}

function  validationIsNumeric( value ) {
    if (isNaN(value) === true) {
        return `Must be numeric`;
    }
} 

function  validationIsUrlFormatValid( value ) {
    
    let urlToCheck = value;
    if (!/^https?:\/\//i.test(urlToCheck)) {
        urlToCheck = 'http://' + urlToCheck;
    }

    try {
         new URL(urlToCheck);
    }
    catch (error) {
        return 'This is not a valid URL format'; 
    }
}

function  validationIsEmailFormatValid( value ) {
    
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(value)) {
        return undefined;
    }
    else {
        return 'Email address is invalid'; ;
    }
}

function  validationIsPhoneFormatValid( value ) {
    
    const phone_pattern = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/; 
    if (phone_pattern.test( value )) {
        return undefined;
    }
    else {
        return 'Phone number is invalid'; ;
    }
}


function executeValidation(validator, value) {
    switch (validator) {
        case 'required':
            return validationRequired(value);
        case 'nonEmpty':
            return validationNonEmpty(value);
        case 'isTrimmed':
            return validationIsTrimmed(value); 
        case 'isNumeric':
            return validationIsNumeric(value);   
        case 'isEmailFormatValid':
            return validationIsEmailFormatValid(value);  
        case 'isPhoneFormatValid':
            return validationIsPhoneFormatValid(value);                                            
        default:
        return undefined;                             
    }
}

function validateField ( value, validations)  { 
     if (validations && validations.length > 0) {
        let result = [];
        for (let index = 0; index < validations.length; index++) {
            let validated = executeValidation(validations[index], value);   
            if (validated !== undefined)  {
                result.push( `${validated}`);   
                break;
            }                    
        }
        return result.length > 0? result[0] : undefined;
    }
    return undefined;
}

function  validationMatches(value, field, allValues) {
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';
}


