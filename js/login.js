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