// import { getPhotographers } from "index";
//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const respons = await fetch("data/photographers.json");

  let data = await respons.json();

  let photographers = [...data.photographers];
  let dataMedia = [...data.media];

  photographers.forEach((photographer) => {
    // push medias according to photographerId
    const photographerMedias = dataMedia.filter(
      (photographerMedia) =>
        photographerMedia.photographerId === photographer.id
    );
    photographer.medias = [...photographerMedias];
  });
  return { photographers };
}

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

function displayPhotographerHeader() {
  const headerNameElement = document.querySelector("#photograph-name");
  const headerCityElement = document.querySelector("#photograph-city");
  const headerTaglineElement = document.querySelector("#photograph-tagline");
  const headerImgElement = document.querySelector("#photograph-img");
  //const contactModalHeaderElement = document.querySelector('#contact_modal header h1 span');

  const infoContainer = document.createElement("div");
  infoContainer.setAttribute("class", "info-photographer");
  infoContainer.appendChild(headerNameElement);
  infoContainer.appendChild(headerCityElement);
  infoContainer.appendChild(headerTaglineElement);

  const contactContainer = document.createElement("div");
  contactContainer.setAttribute("class", "contact-container");
  const contact_button = document.querySelector(".contact_button");
  contactContainer.appendChild(contact_button);

  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-photographer");
  imgContainer.appendChild(headerImgElement);

  const photographHeader = document.querySelector(".photograph-header");
  photographHeader.appendChild(infoContainer);
  photographHeader.appendChild(contactContainer);
  photographHeader.appendChild(imgContainer);

  headerNameElement.textContent = photographer.name;
  //contactModalHeaderElement.textContent = photographer.name;
  headerCityElement.textContent = `${photographer.city}, ${photographer.country}`;
  headerTaglineElement.textContent = photographer.tagline;
  headerImgElement.setAttribute(
    "src",
    `assets/photographers/${photographer.portrait}`
  );
  headerImgElement.setAttribute("alt", photographer.name);
}

function displayPhotographerMedia(photographer) {
  const main = document.querySelector("main");
  const mediaSection = document.createElement("section");
  mediaSection.setAttribute("class", "photographer-medias");

  photographer.medias.forEach(async (media) => {
    const newMedia = new PhotographerMediaFactory(media);

    fetch(newMedia.mediaUrl)
      .then((result) => {
        if (result.ok) {
          const mediaTemplate = `
          <article class="photograph-media-item" data-id="${newMedia._id}">
            <a tabindex="${
              newMedia.tabindex
            }" href="#" return="false;" onclick="displayMediaModal(); setMediaModal(${
            newMedia._id
          }, '${newMedia.mediaType}', '${newMedia.mediaUrl}', '${
            newMedia._title
          }')" class="photograph-media-item_top">
              ${newMedia.mediaCard}
            </a>
            <div class="photograph-media-item_bottom">
              <p tabindex="${newMedia.tabindex + 1}">
                ${newMedia._title}
              </p>
              <div>
                <span tabindex="${
                  newMedia.tabindex + 2
                }" class="photograph-media-item_bottom-likes">
                ${newMedia._totalLikes}
                </span>
                <a href="#!" tabindex="${
                  newMedia.tabindex + 3
                }" onclick="incrementMediaLike(${newMedia._id})">
                  <svg aria-hidden="true" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                </a>
              </div>
            </div>
          </article>
        `;
          mediaSection.insertAdjacentHTML("beforeend", mediaTemplate);
        }
      })
      .catch((err) => console.error(err));
  });
  main.appendChild(mediaSection);
}

async function init() {
  ({ photographers } = await getPhotographers());

  photographers.forEach((photographerItem) => {
    if (photographerItem.id == userId) {
      photographer = photographerItem;
    }
  });

  //if (!photographer) return photographerNotFound();

  //filterChange();
  displayPhotographerHeader();
  displayPhotographerMedia(photographer);
  //displayPhotographerInfos();
}

init();
