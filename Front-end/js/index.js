/* Fonction asynchrone permettant d'utiliser les données récupérées depuis l'API grâce à la fonction de type FETCH getRequest
Contient une boucle "for...of" permettant d'afficher tous les objets "camerasTable" sur la page index.html */

const request = new Request;
const cameras = new Cameras;
async function getCameras() {
    const camerasTable = await request.getRequest()
    for (camera of camerasTable){
        cameras.displayCameras()
    }
}

getCameras()

/* Fonction en lien avec le panier */

const cart = new Cart;
cart.showCartNumber();