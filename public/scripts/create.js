const button = document.querySelector("#submitButton");

button.addEventListener('click', validate);

function validate() {

  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  // als de voornaam minder of gelijk is aan 2 dan komt daar een melding van onderaan de pagina. 
  if (firstname == null || firstname.length <= 2) {
    const firstnameError = document.createElement("p");
    firstnameError.textContent = "De voornaam moet langer of gelijk zijn aan 2 karakters!";
    document.body.appendChild(firstnameError);
    return false;
  }
  // als de achternaam minder of gelijk is aan 2 dan komt daar een melding van onderaan de pagina. 
  if (lastname == null || lastname.length <= 2) {
    const lastnameError = document.createElement("p");
    lastnameError.textContent = "De achternaam moet langer of gelijk zijn aan 2 karakters!";
    document.body.appendChild(lastnameError);
    return false;
  }
  return (true);
}