let mediaModal = document.getElementById("media_modal");
let heart_likes = `<svg aria-hidden="true" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>`;

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

function displayFilter() {
  let main = document.querySelector("main");

  let filters = document.createElement("section");
  filters.classList.add("filters");

  filters.insertAdjacentHTML("afterbegin", "<p>Trier par:</p>");

  main.appendChild(filters);

  let selection = document.createElement("select");
  selection.setAttribute("onchange", "filterMedias(this.value)");
  let option1 = document.createElement("option");
  option1.setAttribute("value", "popularity");
  option1.innerText = "Popularité";
  let option2 = document.createElement("option");
  option2.setAttribute("value", "date");
  option2.innerText = "Date";
  let option3 = document.createElement("option");
  option3.setAttribute("value", "title");
  option3.innerText = "Titre";

  selection.appendChild(option1);
  selection.appendChild(option2);
  selection.appendChild(option3);

  filters.appendChild(selection);

  //selection.addEventListener("onchange", filterMedias(this.value));
}

function displayPhotographerMedia(photographer) {
  const main = document.querySelector("main");
  const mediaSection = document.createElement("section");
  mediaSection.setAttribute("id", "media-section");
  mediaSection.setAttribute("class", "photographer-medias");

  photographer.medias.forEach(async (media) => {
    const newMedia = new PhotographerMediaFactory(media);

    fetch(newMedia.mediaUrl)
      .then((result) => {
        if (result.ok) {
          const mediaTemplate = `
          <article class="photograph-media-item" data-id="${newMedia._id}">
            <a href="#" return="false;" onclick="displayMediaModal(); setMediaModal(${
              newMedia._id
            }, '${newMedia.mediaType}', './${newMedia.mediaUrl}', '${
            newMedia._title
          }')" class="photograph-media-item_top">
              ${newMedia.mediaCard}
            </a>
            <div class="photograph-media-item_bottom">
              <p>
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
                }" onclick="incrementMediaLike(${newMedia._id})">${heart_likes}
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

function displayPhotographerInfos() {
  let mainControl = document.querySelector("main");
  let info = document.createElement("div");

  info.classList.add("sum-info");

  let totalLikes = document.createElement("span");
  totalLikes.setAttribute("id", "photograph-infos-likes");

  let infoPrice = document.createElement("span");
  infoPrice.setAttribute("id", "photograph-infos-price");

  const totalMediasLikes = () =>
    photographer.medias.reduce((acc, curr) => acc + curr.likes, 0);

  totalLikes.innerHTML = `${totalMediasLikes()} ${heart_likes}`;
  infoPrice.textContent = `${photographer.price} €/jour`;

  mainControl.appendChild(totalLikes);
  mainControl.appendChild(infoPrice);
}

function filterMedias(option) {
  let medias = document.querySelector("#media-section");
  medias.remove();
  let titleFilter = () =>
    photographer.medias.sort((media1, media2) => {
      if (media1.title < media2.title) return -1;
      if (media1.title > media2.title) return 1;

      return 0;
    });

  let dateFilter = () =>
    photographer.medias.sort(
      (media1, media2) =>
        new Date(media1.date).getTime() - new Date(media2.date).getTime()
    );

  let popularityFilter = () =>
    photographer.medias.sort((media1, media2) => media2.likes - media1.likes);

  switch (option) {
    case "date":
      dateFilter();
      break;
    case "title":
      titleFilter();
      break;
    default:
      popularityFilter();
  }

  displayPhotographerMedia(photographer);
}

function createMediaModal() {
  const main = document.getElementById("main");

  if (document.getElementById("media_modal")) {
    document.getElementById("media_modal").remove();
  }

  mediaModal = document.createElement("div");
  mediaModal.setAttribute("id", "media_modal");
  mediaModal.classList.add("media-modal");
  mediaModal.style.display = "none";

  const mediaModalContent = document.createElement("div");
  mediaModalContent.classList.add("media-modal-content");

  const mediaModalImg = document.createElement("div");
  mediaModalImg.classList.add("media-modal-img");

  const mediaModalImgContainer = document.createElement("div");
  mediaModalImgContainer.classList.add("media-modal-img-container");

  const image = document.createElement("img");
  image.setAttribute("src", "");
  image.setAttribute("alt", "");
  image.style.display = "none";

  const video = document.createElement("video");
  video.setAttribute("src", "");
  video.setAttribute("controls", "");
  video.setAttribute("muted", "");
  video.style.display = "none";

  const mediaModalClose = document.createElement("span");
  mediaModalClose.classList.add("media-modal-close");
  mediaModalClose.setAttribute("title", "Close");
  mediaModalClose.setAttribute("onclick", "closeMediaModal()");
  mediaModalClose.innerHTML = "&times;";

  const prevMediaBtn = document.createElement("a");
  prevMediaBtn.classList.add("prev");
  prevMediaBtn.setAttribute("title", "Previous image");
  prevMediaBtn.setAttribute("onclick", "mediaModalSlide(-1)");
  prevMediaBtn.innerHTML = "&#10094;";

  const nextMediaBtn = document.createElement("a");
  nextMediaBtn.classList.add("next");
  nextMediaBtn.setAttribute("title", "Next image");
  nextMediaBtn.setAttribute("onclick", "mediaModalSlide(1)");
  nextMediaBtn.innerHTML = "&#10095;";

  const mediaTitle = document.createElement("div");
  mediaTitle.classList.add("media-modal-title");
  const p = document.createElement("p");
  mediaTitle.appendChild(p);

  mediaModalImgContainer.appendChild(image);
  mediaModalImgContainer.appendChild(video);
  mediaModalImgContainer.appendChild(mediaModalClose);
  mediaModalImgContainer.appendChild(prevMediaBtn);
  mediaModalImgContainer.appendChild(nextMediaBtn);
  mediaModalImgContainer.appendChild(mediaTitle);
  mediaModalImg.appendChild(mediaModalImgContainer);
  mediaModalContent.appendChild(mediaModalImg);
  mediaModal.appendChild(mediaModalContent);

  main.insertAdjacentElement("afterend", mediaModal);
}

function displayMediaModal() {
  let mediaModal = document.querySelector("#media_modal");
  mediaModal.style.display = "flex";
}

function closeMediaModal() {
  mediaModal.style.display = "none";
}

async function init() {
  ({ photographers } = await getPhotographers());

  photographers.forEach((photographerItem) => {
    if (photographerItem.id == userId) {
      photographer = photographerItem;
    }
  });

  displayPhotographerHeader();
  displayFilter();
  displayPhotographerMedia(photographer);
  createMediaModal();
  //displayPhotographerInfos();
}

init();
