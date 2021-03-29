/* Fonction asynchrone permettant d'utiliser les données récupérées depuis l'API grâce à la fonction FETCH getRequestId
Affiche l'appareil photo sélectionné sur la page produit.html */

const request = new Request;
const cameras = new Cameras;
async function getCamera() {
    const camera = await request.getRequestId();
    cameras.displayCamera(camera);
}

getCamera()

/* Fonction en lien avec le panier */

const cart = new Cart;
cart.showCartNumber();
