class getJson {
  static async get(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log("Erreur", err));
  }
}
