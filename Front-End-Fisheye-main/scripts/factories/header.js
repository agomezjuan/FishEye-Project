export default function showHeader() {
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const h1 = document.createElement('h1')
    const a = document.createElement('a')

    logo.setAttribute('src', 'assets/images/logo.png')
    logo.setAttribute('alt', 'Fisheye Home Page')

    a.setAttribute('href','#')
    a.appendChild(logo)

    h1.textContent = 'Nos Photographes'

    header.appendChild(a)
    header.appendChild(h1)

    return header
}