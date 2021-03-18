/* Fonction asynchrone permettant d'utiliser les données récupérées depuis l'API grâce à la fonction de type FETCH getRequest
Contient une boucle "for...of" permettant d'afficher tous les objets du tableau "cameras" */

async function getCameras() {
    const cameras = await getRequest()
    for (camera of cameras){
        displayCameras(camera)
    }
}

getCameras()

const cart = new Cart;
cart.showCartNumber();

/* Fonction affichant les appareils photo sur la page index.html et permettant de se rendre à la page produit.html de l'appareil sélectionné  */

function displayCameras(camera) {
    const productsDisplay = document.getElementById('products_display');
    productsDisplay.innerHTML +=
        `<figure class="camera_card">
            <div class="frame_img">
                <img class="camera_img" src="${camera.imageUrl}" alt="${camera.name}">
            </div>
            <figcaption class="camera_info">
                <p class="camera_name"> ${camera.name} </p>
                <p class="camera_price"> ${camera.price/100} € </p>
                <p class="camera_description"> ${camera.description} </p>
                <button class="buy_button" type="button" onclick="document.location='produit.html?camera_id=' + ('${camera._id}')"> Acheter </button>
            </figcaption>
        </figure>`;
}
