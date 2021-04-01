/* Fonctions en lien avec les appareils photo */

class Cameras {

    /* Fonction affichant les appareils photo sur la page index.html et permettant de se rendre à la page produit.html de l'appareil sélectionné  */

    displayCameras() {
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

    /* Fonction affichant l' appareil photo sélectionné sur la page produit.html
    Contient un évènement pour ajouter un appareil photo au panier */

    displayCamera(camera) {
        const productDetails = document.getElementById('product_details');
        productDetails.innerHTML =
            `<figure class="camera_card_product">
                <div class="frame_img_product">
                    <img class="camera_img_product" src="${camera.imageUrl}" alt="${camera.name}">
                </div>
                <figcaption class="camera_info_product">
                    <p class="camera_name_product"> ${camera.name} </p>
                    <p class="camera_description_product"> ${camera.description} </p>
                    <p class="camera_price_product"> ${camera.price/100} € </p>
                    <label class="label_lenses" for="select_lenses"> Objectif </label>
                    <select id="select_lenses"> </select>
                    <button class="add_cart_button" type="button"> Ajouter au panier </button>
                </figcaption>
            </figure>`;
        const lenses = camera.lenses;    
        cameras.addLenses(lenses);
        const addInCart = document.getElementsByClassName('add_cart_button');
        for (let i=0; i < addInCart.length; i ++) {
            addInCart[i].addEventListener('click',() => {
                const cart = new Cart;
                cart.cartNumber();
                cart.cartItem(camera);
                const modal = new Modal;
                modal.showAddConfirmModal();
            })
        }   
    }

    /* Fonction affichant le choix des objectifs sur la page produit.html 
    Contient une boucle "for...in" permettant d'afficher tous les objets du tableau "lenses" */

    addLenses(lenses){
        let selectLenses = document.getElementById('select_lenses');
        for (let i in lenses){
            selectLenses.innerHTML += `<option> ${lenses[i]} </option>`;
        }
    }
    
}






