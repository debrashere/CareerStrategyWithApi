'use strict';
let barsOrX = "fa fa-bars";
let currentRoute = "/home";
  
function  logoutThisUser() {        
    //Clear auth token and settings
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    // Redirect the to the landing page.
    props.isLoggedIn = false;   
    props.hasProfile = false; 
    renderLanding(); 
}       
  
function setClassForMenuItem(menuItem, className)  {    
    // extract current location
    const page = currentRoute.indexOf('?') > -1 ? currentRoute.split('?')[0] : currentRoute;
    let pageName = page.indexOf('/') > -1 ? page.split('/')[1] : page;  
     pageName = pageName === "" ? "home" : pageName;

    // map current location to menuItem to be selected in menu bar
    const navProps = [
            { name: "home", isSecure: false, page: "home"},
            { name: "home", isSecure: false, page: "default"},
            { name: "home", isSecure: false, page: "dashboard"},
            { name: "home", isSecure: false, page: "landingpage"},
            { name: "tools", isSecure: true, page: "toolsform"},
            { name: "tools", isSecure: true, page: "toolseditform"},
            { name: "login", isSecure: false, page: "login"},
            { name: "summary", isSecure: true, page: "summary"},            
            { name: "register", isSecure: false, page: "register"},
            { name: "comments", isSecure: true, page: "comments"},
            { name: "comment", isSecure: true, page: "comments"},
            { name: "contacts", isSecure: true, page: "contacts"},
            { name: "terms", isSecure: false, page: "terms"},
            { name: "myskiils", isSecure: false, page: "myskiils"},         
        ];
      
    const locationToMenu = navProps.filter( p => p.page === pageName )
    if (locationToMenu && locationToMenu.length > 0) {
        return  menuItem === locationToMenu[0].name ? `"menuitem ${className} active"` : `"menuitem  ${className}"`;              
    }
    else {
        return  `"menuitem ${className}"`;                
    }            
}

// large screens: do not display collapsed menu 
// small Screens: display collased menu with hamburger icon which when clicks
// will display "x" to enable user to close the expanded meny
function  menuFunction() {
    $('.js-error-message').empty();
    $('.js-error-message').prop("hidden", true);    
    let button = document.getElementById("menuButton");
    if (!$('#myTopnav').hasClass( "responsive" )) {
        $('#myTopnav').addClass("responsive");  
        barsOrX = button.class === "fa fa-times" ? "icon" : "fa fa-times";
    } else {
        $('#myTopnav').removeClass( "topnav"); 
        $('#myTopnav').removeClass( "responsive"); 
        $('#myTopnav').addClass( "topnav");  
        barsOrX =  button.class === "icon" ? "fa fa-bars" : "fa fa-times";                
    }   
    $('#menuButtonIcon').removeClass('fa' );
    $('#menuButtonIcon').removeClass('fa-bars'); 
    $('#menuButtonIcon').removeClass('fa-times'); 
    $('#menuButtonIcon').addClass(barsOrX); 
}
 
function setMenuItem(event){
    const id = `#${event.currentTarget.id}`;       
    props.route = id.split('-')[1];
    $('.menuitem').removeClass("active");
    if (!$(id).hasClass( "active" )) {
        $(id).addClass("active");              
    } 

    switch (props.route) {
        case "myskills":
            renderUserSkills();
            break;
        case "home":
            renderLanding();
            break;
        case "login":
            renderLoginForm();
            break;
        case "prospect":
            displayProspectsSummaryForm();
            break;
        case "register":
            renderRegistrationForm();
            break;
        case "profile":
            renderUserProfileForm();
            break;
        case "skills":
            renderMasterSkillsList(displaySkillsMasterList);
            break;     
        case "logout":
            logoutThisUser();
            break;
         case "summary":
            renderJobsSummaries();
            break;                                                                                   
    }
}

function Navigation(props) {   
    $('.js-error-message').empty();
    $('.js-error-message').prop("hidden", true);       
    // Only render the log out button if we are logged in
    let logOutButton="";        
    if (props.isLoggedIn == true) {
        logOutButton = (
           `<a href="#"  id="menuitem-logout" class=${setClassForMenuItem('logout','js-menuitem-logout')}> Log out</a>`  
        );
    }

    // Only render login button if user is not logged in
    let logInButton="";
    if (props.isLoggedIn != true) {
        logInButton = (
            `<a href="#"  id="menuitem-login" class=${setClassForMenuItem('login','js-menuitem-login')}> Log In</a>`
        );
    } 
   
     // Only render Sign Up button if user is not logged in 
    let registerButton="";
    if (!(props.isLoggedIn === true)) {
        registerButton = (
            `<a href="#"  id="menuitem-register" class=${setClassForMenuItem('register','js-menuitem-register')}> Register</a>`                                     		                  
        );
    } 
    
    let  menuButton = (             
       `<a  href="" id="menuButton"  class="icon" >
             <i id="menuButtonIcon" class="${barsOrX}"></i> 
        </a>`                                                                 		                  
    );         
         
    if (props && props.route) {
        currentRoute = props.route;
          
        return (        
            `<nav class="topnav" id="myTopnav">
                <a id="menuitem-home"      href="#" class=${setClassForMenuItem('home','js-menuitem-home')}>Home</a>                   			                                    		                                    
                <a id="menuitem-profile"   href="#" class=${setClassForMenuItem('profile','js-menuitem-profile')}>Profile</a>                   			                                    		                 
                <a id="menuitem-myskills"  href="#" class=${setClassForMenuItem('myskills','js-menuitem-myskills')}>My Skills</a>                   			                                    		                                 
                <a id="menuitem-skills"    href="#" class=${setClassForMenuItem('skills','js-menuitem-skills')}> Skills</a>           
                <a id="menuitem-summary"   href="#" class=${setClassForMenuItem('summary','js-menuitem-summary')}> Summary</a>                              
                <a id="menuitem-prospect"  href="#" class=${setClassForMenuItem('comments','js-menuitem-prospect')}> Add Prospect</a>                              
                ${registerButton}                                   		
                ${logInButton}
                ${logOutButton}
                ${menuButton}
            </nav>`							         
        );        
    }
}
 
 