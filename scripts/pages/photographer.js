let mediaModal = document.getElementById("media_modal");
let mediaLiked = [];

async function getPhotographers() {
  const respons = await fetch("data/photographers.json");

  let data = await respons.json();

  let photographers = [...data.photographers];
  let dataMedia = [...data.media];

  photographers.forEach((photographer) => {
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

  let filterOpions = { popularity: "Popularité", date: "Date", title: "Titre" };

  for (let option in filterOpions) {
    let optionSelect = document.createElement("option");
    optionSelect.setAttribute("value", option);
    optionSelect.innerHTML = `<div class="option">${filterOpions[option]}</div>`;
    selection.appendChild(optionSelect);
  }

  filters.appendChild(selection);
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
                }" onclick="incrementMediaLike(${
            newMedia._id
          })"><i class="fa-solid fa-heart"></i>
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

  if (document.querySelector(".sum-info")) {
    document.querySelector(".sum-info").remove();
  }
  let info = document.createElement("div");

  info.classList.add("sum-info");

  let totalLikes = document.createElement("span");
  totalLikes.setAttribute("id", "photograph-infos-likes");

  let infoPrice = document.createElement("span");
  infoPrice.setAttribute("id", "photograph-infos-price");

  const totalMediasLikes = () =>
    photographer.medias.reduce((acc, curr) => acc + curr.likes, 0);

  totalLikes.innerHTML = `${totalMediasLikes()} <i class="fa-solid fa-heart"></i>`;
  infoPrice.textContent = `${photographer.price} €/jour`;

  info.appendChild(totalLikes);
  info.appendChild(infoPrice);
  mainControl.appendChild(info);
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
  prevMediaBtn.innerHTML = "<";

  const nextMediaBtn = document.createElement("a");
  nextMediaBtn.classList.add("next");
  nextMediaBtn.setAttribute("title", "Next image");
  nextMediaBtn.setAttribute("onclick", "mediaModalSlide(1)");
  nextMediaBtn.innerHTML = ">";

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

function incrementMediaLike(mediaLikedId) {
  photographer.medias.forEach((media) => {
    if (media.id === mediaLikedId) {
      if (!mediaLiked.includes(mediaLikedId)) {
        media.likes++;
        document.querySelector(
          `[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`
        ).innerHTML = media.likes;
        mediaLiked.push(mediaLikedId);
      } else {
        media.likes--;
        document.querySelector(
          `[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`
        ).innerHTML = media.likes;
        mediaLiked.pop(mediaLikedId);
      }

      displayPhotographerInfos();
    }
  });
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
  displayPhotographerInfos();
}

init();
