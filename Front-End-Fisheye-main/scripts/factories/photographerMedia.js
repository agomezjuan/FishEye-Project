class PhotographerMediaFactory {

    constructor(media) {
        this._videoUrl = media.video;
        this._imageUrl = media.image;

        switch (this.mediaType) {
            case 'video':
                // eslint-disable-next-line no-undef
                return new PhotographerMediaVideo(media);
            case 'image':
                // eslint-disable-next-line no-undef
                return new PhotographerMediaImage(media);
            default:
                throw new Error('Unknown media format');
        }
    }

    get mediaType() {
        if (this._imageUrl) return 'image';
        else if (this._videoUrl) return 'video';
        else throw new Error('Unknown media type format');
    }
}

class PhotographerMediaImage {

    constructor(media) {
        this._photographerId = media.photographerId;
        this._id = media.id;
        this._title = media.title;
        this._imageUrl = media.image;
        this._totalLikes = media.likes;
    }

    get mediaUrl() {
        return `assets/photographers/${this._photographerId}/${this._imageUrl}`;
    }

    get mediaType() {
        return 'image';
    }

    get mediaCard() {
        return `<img src="${this.mediaUrl}" title="${this._title}, closeup view" alt="${this._title}">`;
    }
}

class PhotographerMediaVideo {

    constructor(media) {
        this._photographerId = media.photographerId;
        this._id = media.id;
        this._title = media.title;
        this._videoUrl = media.video;
        this._totalLikes = media.likes;
    }

    get mediaUrl() {
        return `assets/photographers/${this._photographerId}/${this._videoUrl}`;
    }

    get mediaType() {
        return 'video';
    }

    get mediaCard() {
        return `<video muted> <source src="${this.mediaUrl}#t=0.1" type="video/mp4" title="${this._title}, closeup view" alt="${this._title}"> Your browser does not support the video tag. </video>`;
    }
}
