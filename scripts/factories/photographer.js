function photographerFactory(data) {
    const { id, name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a')
        const article = document.createElement('article');
        const img = document.createElement('img');
        const origin = document.createElement('p')
        const tag = document.createElement('p')
        const prc = document.createElement('p')
        a.setAttribute('href', `photographer.html?&id=${id}`)
        a.style.textDecoration = 'none'
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        origin.textContent = `${city}, ${country}`
        tag.textContent = tagline
        tag.setAttribute("class", "tagline")
        prc.textContent = `${price}€/jour`
        prc.setAttribute('class', 'price');
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(origin)
        article.appendChild(tag)
        article.appendChild(prc)
        a.appendChild(article)

        return (a);
    }
    return { name, picture, getUserCardDOM }
}