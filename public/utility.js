function currentDateTimeLocal() {
d = new Date();
let formattedDate = new Date();
formattedDate.setUTCFullYear(d.getFullYear());
formattedDate.setUTCMonth(d.getMonth());
formattedDate.setUTCDate(d.getDate());
formattedDate.setUTCHours(d.getHours());
formattedDate.setUTCMinutes(d.getMinutes());
formattedDate.setUTCSeconds(d.getSeconds());
console.log(`currentDateTime  formattedDate: ${formattedDate}`);
return formattedDate;
}

function toDatetimeLocal(date) {    
    d = new Date(date);
    let formattedDate = new Date();
    formattedDate.setUTCFullYear(d.getFullYear());
    formattedDate.setUTCMonth(d.getMonth());
    formattedDate.setUTCDate(d.getDate());
    formattedDate.setUTCHours(d.getHours());
    formattedDate.setUTCMinutes(d.getMinutes());
    formattedDate.setUTCSeconds(d.getSeconds());

    console.log(`toDatetimeLocal date: ${date}, formattedDate: ${formattedDate}`);
    return formattedDate;
}

function toDatetimeStringFormat(date) {
    d = new Date(date);
    let formattedDate =  `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`; 
       formattedDate += `T${('0' + (d.getHours()+1)).slice(-2)}:${('0' + (d.getMinutes())).slice(-2)}`; 
    return formattedDate;
}    