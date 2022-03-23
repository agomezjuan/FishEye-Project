function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  modal.style.position = "fixed";

  const form = document.getElementById("contact-form");

  form.innerHTML = "";

  const prenomDiv = document.createElement("div");
  const prenomLabel = document.createElement("label");
  prenomLabel.innerText = "Prénom";
  const inputPrenom = document.createElement("input");
  inputPrenom.setAttribute("type", "text");
  prenomDiv.appendChild(prenomLabel);
  prenomDiv.appendChild(inputPrenom);

  const nomDiv = document.createElement("div");
  const nomLabel = document.createElement("label");
  nomLabel.innerText = "Nom";
  const inputNom = document.createElement("input");
  inputNom.setAttribute("type", "text");
  nomDiv.appendChild(nomLabel);
  nomDiv.appendChild(inputNom);

  const emailDiv = document.createElement("div");
  const emailLabel = document.createElement("label");
  emailLabel.innerText = "Email";
  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("type", "email");
  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(inputEmail);

  const textDiv = document.createElement("div");
  const textLabel = document.createElement("label");
  textLabel.innerText = "Message";
  const textarea = document.createElement("textarea");
  textarea.setAttribute("rows", "5");
  textDiv.appendChild(textLabel);
  textDiv.appendChild(textarea);

  const button = document.createElement("button");
  button.setAttribute("class", "contact_button");
  button.innerText = "Envoyer";

  form.appendChild(prenomDiv);
  form.appendChild(nomDiv);
  form.appendChild(emailDiv);
  form.appendChild(textDiv);
  form.appendChild(button);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function validate() {
  var errorVerif = false;
  var regex1 = /^[A-Za-z\s]+$/;
  var regex2 = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

  const date = new Date(birthVerit.value);

  const timeStampDate = Date.parse(date);

  const actualDate = Date.now();

  if (
    prenom.value === "" ||
    prenom.value.length < 2 ||
    !prenom.value.match(regex1)
  ) {
    document.getElementById("prenom_error").innerHTML =
      "Veuillez entrer au moins 2 caractères valables.";
    prenom.focus();
    prenom.style.border = "2px solid #fe142f";

    errorVerif = true;
  } else {
    document.getElementById("prenom_error").innerHTML = "";
    prenom.style.border = "0px solid red";
  }

  if (nom.value === "" || nom.value.length < 2 || !nom.value.match(regex1)) {
    document.getElementById("nom_error").innerHTML =
      "Veuillez entrer au moins 2 caractères valables.";
    nom.focus();
    nom.style.border = "2px solid #fe142f";

    errorVerif = true;
  } else {
    document.getElementById("nom_error").innerHTML = "";
    nom.style.border = "0px solid red";
  }

  if (
    emailVerif.value == null ||
    emailVerif.value == "" ||
    !emailVerif.value.match(regex2)
  ) {
    document.getElementById("email_error").innerHTML =
      "Veuillez entrer une adresse Email valable.";
    emailVerif.focus();
    emailVerif.style.border = "2px solid #fe142f";

    errorVerif = true;
  } else {
    document.getElementById("email_error").innerHTML = "";
    emailVerif.style.border = "0px solid red";
  }

  if (birthVerit.value == "") {
    document.getElementById("birrth_error").innerHTML =
      "Veuillez entrer votre date de naissance.";
    birthVerit.focus();
    birthVerit.style.border = "2px solid #fe142f";

    errorVerif = true;
  } else if (timeStampDate > actualDate) {
    document.getElementById("birrth_error").innerHTML =
      "Votre date de naissance ne peut pas être postérieure à la date actuelle.";
    birthVerit.focus();
    birthVerit.style.border = "2px solid #fe142f";
  } else {
    document.getElementById("birrth_error").innerHTML = "";
    birthVerit.style.border = "0px solid red";
  }

  if (tournoisVerif.value == null || tournoisVerif.value == "") {
    document.getElementById("tournois_error").innerHTML =
      "Vous devez choisir une option.";
    tournoisVerif.focus();
    tournoisVerif.style.border = "2px solid #fe142f";

    errorVerif = true;
  } else {
    document.getElementById("tournois_error").innerHTML = "";
    tournoisVerif.style.border = "0px solid red";
  }

  if (!document.querySelector('input[name = "location"]:checked')) {
    document.getElementById("city_error").innerHTML =
      "Vous devez choisir une option.";

    errorVerif = true;
  } else {
    document.getElementById("city_error").innerHTML = "";
  }

  if (!conditionVerif.checked) {
    document.getElementById("condition_error").innerHTML =
      "Vous devez vérifier que vous acceptez les termes et conditions";

    errorVerif = true;
  } else {
    document.getElementById("condition_error").innerHTML = "";
  }

  if (errorVerif === true) {
    return false;
  } else {
    return true;
  }
}
