let actualMediaId;

function setMediaModal(mediaId, mediaType, mediaUrl, mediaTitle) {
  let modalImgElement = document.querySelector(".media-modal-img img");
  let modalVideoElement = document.querySelector(".media-modal-img video");

  const modalTitleElement = document.querySelector(".media-modal-title p");
  modalTitleElement.textContent = mediaTitle;

  switch (mediaType) {
    case "image":
      modalImgElement.setAttribute("src", mediaUrl);
      modalImgElement.setAttribute("alt", mediaTitle);
      modalVideoElement.style.display = "none";

      modalImgElement.style.display = "flex";
      modalImgElement.focus();
      break;
    case "video":
      modalVideoElement.setAttribute("src", mediaUrl);
      modalImgElement.style.display = "none";

      modalVideoElement.setAttribute("alt", mediaTitle);
      modalVideoElement.style.display = "flex";
      modalVideoElement.focus();
      break;
    default:
      throw new Error("Unknown media type format");
  }

  actualMediaId = mediaId;
}

function mediaModalSlide(slideAction) {
  getNextAssetPath = (photographerId, media) =>
    `assets/photographers/${photographerId}/${media}`;

  const actualMediaIndex = photographer.medias.findIndex((media) => {
    if (media.id === actualMediaId) return true;
  });

  function nextSlide() {
    const nextMediaIndex = actualMediaIndex + 1;

    let nextMedia = photographer.medias[nextMediaIndex];

    if (!nextMedia) nextMedia = photographer.medias[0];

    const nextMediaType = nextMedia.image ? "image" : "video";

    const nextMediaUrl = getNextAssetPath(
      nextMedia.photographerId,
      nextMedia.image || nextMedia.video
    );

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  function prevSlide() {
    const prevMediaIndex = actualMediaIndex - 1;

    let nextMedia = photographer.medias[prevMediaIndex];

    if (!nextMedia)
      nextMedia = photographer.medias[photographer.medias.length - 1];

    const nextMediaType = nextMedia.image ? "image" : "video";

    const nextMediaUrl = getNextAssetPath(
      nextMedia.photographerId,
      nextMedia.image || nextMedia.video
    );

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  if (slideAction) {
    switch (slideAction) {
      case -1:
        prevSlide();
        break;
      default:
        nextSlide();
        break;
    }
  }
}
