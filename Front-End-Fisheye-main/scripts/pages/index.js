

async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    const respons = await fetch("data/photographers.json");
    let data = await respons.json();
    console.log(data);
    let dataPhotographers = [...data.photographers];

    let dataMedia = [...data.media];
    // et bien retourner le tableau photographers seulement une fois
    return {
        photographers: dataPhotographers, 
       // media: dataMedia
    }
          
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
