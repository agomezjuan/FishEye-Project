//import showHeader from '../factories/header.js'

async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    const respons = await fetch("data/photographers.json");

    let data = await respons.json();

    let photographers = [...data.photographers];
    let dataMedia = [...data.media];

    photographers.forEach(photographer => {
        // push medias according to photographerId
        const photographerMedias = dataMedia.filter(photographerMedia => photographerMedia.photographerId === photographer.id);
        photographer.medias = [...photographerMedias];
    })
    return { photographers }

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
    // showHeader()
    displayData(photographers);
};

init();
