let alertMessage = "Por favor completar los campos vacíos";

let userValidation = () => {
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    
    if (emailValue.length == 0 || passwordValue.length == 0) {
        alert(alertMessage);         
    } else {
        sessionStorage.setItem("user", "true")
        window.location.href= 'index.html';
    }   
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ingresar').addEventListener('click', (event) => {
        event.preventDefault();
        userValidation();
    });
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


// Google Sign In
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = parseJwt (response.credential);
    console.log(userObject);
    if (userObject =! null){
        sessionStorage.setItem("user", "true")
        window.location.href= 'index.html';
    }
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "322835120510-8dohgtcf2e9a3pn9pankgv5jt4gtso3r.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  
    );

    google.accounts.id.prompt(); 
}