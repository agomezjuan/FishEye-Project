export default class getData {
    async fisheye() {
        let route = "data/photographers.json"
        let response = await fetch(route)
        let data = await response.json()

        let dataPhotographers = [...data.photographers];
        let dataMedia = [...data.media];

        return {
            photographers: dataPhotographers, 
            media: dataMedia
        }
    }
    
}