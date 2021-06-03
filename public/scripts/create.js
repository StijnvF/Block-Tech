const button = document.querySelector("#submitButton");

button.addEventListener('click', validate);

function validate() {

    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
   
    if (firstname == null || firstname.length <= 2) { 
        const firstnameError = document.createElement("p"); 
        firstnameError.textContent = "De voornaam moet langer of gelijk zijn aan 2 karakters!";
        document.body.appendChild(firstnameError);                              
        return false;
    }
    if (lastname == null || lastname.length <= 2) { 
        const wwError = document.createElement("p"); 
        wwError.textContent = "De achternaam moet langer of gelijk zijn aan 2 karakters!";  
        document.body.appendChild(wwError);        
        return false;
    }
    return( true );
}