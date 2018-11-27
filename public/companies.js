'use strict'

const CAREER_STRATEGY_URL = 'http://localhost:8080/api';

let MOCK_COMPANIES = {
    "companies": [
        {
            "id": "5bef0e0eaeb22c022c594cf3",
            "title": "Carvana",
            "description": "Carvana is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
            "state": "AZ",
            "zip": "85302",
            "links": [
                {
                    "keywords": "Carvana, Company",
                    "linktype": "",
                    "url": "https://www.carvana.com/",
                    "_id": "5bef0e0eaeb22c022c594cf4",
                    "title": "Carvana site"
                }
            ]
        },
        {
            "id": "5bf1dbca3672ef1af46256d2",
            "title": "SRP",
            "description": "Carvana is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
            "state": "AZ",
            "zip": "85302",
            "links": [
                {
                    "keywords": "SRP, Company",
                    "linktype": "",
                    "url": "https://www.SRP.com/",
                    "_id": "5bf1dbca3672ef1af46256d3",
                    "title": "SRP site"
                }
            ]
        },
        {
            "id": "5bf1ec277b378e2e6814a511",
            "title": "Cox",
            "description": "Cox is a technology business start-up founded by Ernie Garcia and his son. Operations are based in Tempe, Arizona. It is an online-only used car dealer that allows customers to shop, finance, and trade in cars ",
            "state": "AZ",
            "zip": "85302",
            "links": [
                {
                    "keywords": "Cox, Company",
                    "linktype": "",
                    "url": "https://www.SRP.com/",
                    "_id": "5bf1ec277b378e2e6814a512",
                    "title": "Cox site"
                }
            ]
        }
    ]
  };  

/*    
  Retrieve data from Career Strategy API
*/
function submitCareerStrategyAPI(callbackFn, queryString) {

  setTimeout(function(){ callbackFn(MOCK_COMPANIES)}, 100);

  /*
  console.log("submitCareerStrategyAPI", queryString);
  $('#js-error-message').empty();
  $('#js-error-message').prop("hidden", true);
  const encodedQuery = encodeURIComponent(queryString);
  const url =  `${CAREER_STRATEGY_URL}/${queryString}/`;

  fetch(url)
  .then(response => {
    if (response.ok) {      
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayCareerStrategyResults(responseJson, queryString))
  .catch(error => {
    $('#js-error-message').prop("hidden", false);
    $('#js-error-message').text(`Something went wrong: ${error}`);
  }); 

  */
} 
function renderCompany(data) {
  console.log("renderCompany", "start") ;
  console.log("renderCompany data.companies", data.companies) ;
  $( ".js-slider-gallery" ).html('');

  let leftArrow  = '<div class="Aligner"><div class="Aligner-item-arrow"><a href="#"class="paging-icon js-page-prev" alt="Previous"><img src="images/icon-arrow-left.png" alt="left arrow page previous" /></a></div></div>';
  let rightArrow = '<div class="Aligner"><div class="Aligner-item-arrow"><a href="#" class="paging-icon js-page-next" alt="Previous"><img src="images/icon-arrow-right.png" alt="righ arrow page next" /></a></div></div>';
  let thumbs = "";
  let skills = "";
  let slideCount = 1;
  let tabIdx = 0;
 
  data.companies.map( function(company) {          
    const companyId = `company${slideCount}`;
    let links  = "<ul>";
    company.links.map( function(link) {               
        links += `<li><a href="${link.url}", target="_blank">${link.title}</a></li>`;       
    }); 
    links+="</ul>"    

    let thumb =  
    `<div>
    <span class="title">
        <span><em>${company.title}</em></span>  </br>
        <span>${company.description}</span>  </br>          
        <span>${company.state}</span>  </br>
        <span>${company.zip}</span>  </br>  
        <span>${links}</span>            
    </span>            
    </div> `;   
    thumbs += thumb;
    slideCount++; 
  });  

  if ( $(".flex-item").css("max-width") == "260px")  {
    $( ".js-slider-gallery" ).append(`<div>${leftArrow}${thumbs}${rightArrow}</div>`);  
  }
  else {  
    $( ".js-slider-gallery" ).append(`${leftArrow}${thumbs}${rightArrow}`); 
  }
  console.log("renderJobProspect js-slider-gallery", $( ".js-slider-gallery" ).html()) ;
  $(".js-slider").prop("hidden", false);
 // watchAddLToLinkClick(); 
} 

function displayCareerStrategyResults(data) {  
  console.log("displayCareerStrategyResults data", data );
  if (data == null || data.companies == null || data.companies.length == 0) {
        $('#js-error-message').text("No recipes found");
        $('#js-error-message').prop("hidden", false);
  }
  else { 
    renderCompany(data);
  }       
}
   
function refreshCompanies() {       
    $( ".thumbs" ).html("");
    $( ".slide" ).html("");
    $(".js-slider").prop("hidden", true); 
    //const query = $(".js-query").val();
    const query  = "companies";
    submitCareerStrategyAPI(displayCareerStrategyResults, query);
}

function setupHandleEvents() {  
  refreshCompanies();  
}

$(setupHandleEvents);