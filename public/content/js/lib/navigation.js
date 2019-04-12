let barsOrX = "fa fa-bars";
let currentRoute = "/home";
  
function  logoutThisUser() {        
    //Clear auth token and settings
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    // Redirect the to the landing page.
    props.loggedIn = false;   
    props.hasProfile = false; 
    renderLanding(); 
}       
  
function setSelectedMenuItem(menuItem, className)  {    
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
    let x = document.getElementById("myTopnav");      
    let button = document.getElementById("menuButton");
    if (x.class === "topnav") {
        x.class += " responsive";
        barsOrX = button.class === "fa fa-times" ? "icon" : "fa fa-times";
    } else {
        x.class = "topnav"  
        barsOrX =  button.class === "icon" ? "fa fa-bars" : "fa fa-times";                
    }       
}  

function Navigation(props) {   
    $('.js-error-message').empty();
    $('.js-error-message').prop("hidden", true);       
    // Only render the log out button if we are logged in
    let logOutButton="";        
    if (props.loggedIn == true) {
        logOutButton = (
           `<a href="#"  id="menuitem-logout" class=${setSelectedMenuItem('logout','js-menuitem-logout')}> Log out</a>`  
        );
    }

    // Only render login button if user is not logged in
    let logInButton="";
    if (props.loggedIn != true) {
        logInButton = (
            `<a href="#"  id="menuitem-login" class=${setSelectedMenuItem('login','js-menuitem-login')}> Log In</a>`
        );
    } 
   
     // Only render Sign Up button if user is not logged in 
    let registerButton="";
    if (!(props.loggedIn === true)) {
        registerButton = (
            `<a href="#"  id="menuitem-register" class=${setSelectedMenuItem('register','js-menuitem-register')}> Register</a>`                                     		                  
        );
    } 
    
    let  menuButton = (             
       `<a  href="" id="menuButton"  class="icon" >
             <i class="${barsOrX}"></i> 
        </a>`                                                                 		                  
    );         
         
    if (props && props.route) {
        currentRoute = props.route;
          
        return (        
            `<nav class="topnav" id="myTopnav">
                <a id="menuitem-home"         href="#" class=${setSelectedMenuItem('home','js-menuitem-home')}>Home</a>                   			                                    		                                    
                <a id="menuitem-profile"      href="#" class=${setSelectedMenuItem('profile','js-menuitem-profile')}>Profile</a>                   			                                    		                 
                <a id="menuitem-myskills"    href="#" class=${setSelectedMenuItem('myskills','js-menuitem-myskills')}>My Skills</a>                   			                                    		                                 
                <a id="menuitem-skills"       href="#" class=${setSelectedMenuItem('skills','js-menuitem-master-skiils')}> Skills</a>           
                <a id="menuitem-summary"      href="#" class=${setSelectedMenuItem('summary','js-menuitem-view-summary')}> Summary</a>                              
                <a id="menuitem-add-prospect" href="#" class=${setSelectedMenuItem('comments','js-menuitem-add-prospect')}> Add Prospect</a>                              
                ${registerButton}                                   		
                ${logInButton}
                ${logOutButton}
                ${menuButton}
            </nav>`							         
        );        
    }
}
 
 