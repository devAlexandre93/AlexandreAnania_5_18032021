/* Fonctions en lien avec le panier */

class Cart {

    /* Fonction utilisant le Local Storage en créant la key 'inCart', enregistre et affiche le nombre de produit à coté de l'icône panier
    Elle est exécutée au clic du bouton "Ajouter au panier" sur la page produit.html */

    cartNumber() {
        let inCart = localStorage.getItem ('inCart');
        inCart = parseInt(inCart);
        if (inCart) {
            localStorage.setItem('inCart', inCart + 1);
            document.getElementById('cart_number').textContent = inCart + 1;
        } else {
            localStorage.setItem('inCart', 1);
            document.getElementById('cart_number').textContent = 1;
        }
    }

    /* Fonction utilisant le Local Storage en créant la key 'myCart', enregistre les informations de l'appareil photo sélectionné
    Elle est exécutée au clic du bouton "Ajouter au panier" sur la page produit.html */

    cartItem(camera) {
        let myCart = localStorage.getItem('myCart');
        myCart = JSON.parse(myCart);
        let selectLenses = document.getElementById('select_lenses');
        let selectedLense = selectLenses.options[selectLenses.selectedIndex].value
        if (myCart) {
            if(myCart[camera.name] == undefined) {
                camera.lenses = selectedLense;
                camera.quantity = 0;
                myCart = {
                    ...myCart,
                    [camera.name]: camera
                }
            }
            myCart[camera.name].quantity += 1      
        } else {
            camera.lenses = selectedLense;
            camera.quantity = 1;
            myCart = {
                [camera.name]: camera
            }
        }
        localStorage.setItem('myCart', JSON.stringify(myCart))
    }

    /* Fonction permettant d'afficher le nombre de produit présent dans le panier dans le header en haut à droite sur toutes les pages */

    showCartNumber() {
        let inCart = localStorage.getItem ('inCart');
        if (inCart) {
            document.getElementById ('cart_number').textContent = inCart;
        }
    }  
    
    //* Fonction faisant apparaitre le panier s'il y au moins un appareil photo sélectionné sur la page panier.html *//

    displayCart () {
        let tableBody = document.getElementById ("table_body");
        let buttonsCart = document.getElementById ("buttons_cart");
        let shoppingCart = document.getElementById ("shopping_cart");
        const myCart = JSON.parse(localStorage.getItem('myCart'));
        if (myCart) {
            Object.values(myCart).map(camera =>{
                tableBody.innerHTML +=
                    `
                    <tr class="camera_row">
                        <td class="camera_table_cart"> <img class="camera_img_table_cart" src="${camera.imageUrl}" alt="${camera.name}" onclick="document.location='produit.html?camera_id=' + ('${camera._id}')"> ${camera.name} </td>
                        <td class="lence_table_cart"> ${camera.lenses} </td>
                        <td class="quantity_table_cart"> ${camera.quantity} </td>
                        <td class="unity_price_table_cart"> ${camera.price/100} € </td>
                        <td class="global_price_table_cart"> ${camera.price/100*camera.quantity} € </td>
                        <td class="delete_table_cart"> <button class="delete_camera" type="button"> <i class="fas fa-trash-alt"></i> </button> </td>
                    </tr>
                    `;     
                buttonsCart.innerHTML =
                    `
                    <button class="delete_allcameras" type="button" onclick="localStorage.clear(), window.location.reload()"> Vider le panier </button>
                    <button class="continue_order" type="button"> Poursuivre la commande </button>
                    `;
                cart.totalPrice();
                cart.removeCamera();      
            })
        } if (myCart === null || myCart == 0) {
            shoppingCart.innerHTML =
            `
            <div class="empty_cart"> 
                <p> Il n'y a rien dans votre panier pour le moment <p>
                <a href="index.html"><i class="fas fa-shopping-bag empty_bag"></i> </a>
            </div>
            `;
        }
    }

    //* Fonction calculant et affichant le montant total du panier sur la page panier.html *//

    totalPrice () {
        let cartCamerasContainer = document.getElementsByClassName ('table_body')[0];
        let cameraRows = cartCamerasContainer = document.getElementsByClassName ('camera_row');
        let cartCost = 0;
        for (let i = 0; i < cameraRows.length; i++) {
            let cameraRow = cameraRows[i];
            let globalPriceElement = cameraRow.getElementsByClassName ('global_price_table_cart')[0];
            let globalPrice = parseFloat(globalPriceElement.innerText.replace('€', ''));
            cartCost = cartCost + globalPrice;
        }
        let totalPrice = document.getElementById ("total_price");
        totalPrice.innerHTML = totalPrice.innerHTML = `${cartCost} €`;
    }

    //* Fonction permettant de supprimer la ligne d'un appareil photo dans le panier au clic de l'icône "poubelle" *//

    removeCamera() {
        let trashButtons = document.getElementsByClassName ('delete_camera');
        let myCart = JSON.parse(localStorage.getItem('myCart'));
        let inCart = parseFloat(JSON.parse(localStorage.getItem('inCart')));
        myCart = Object.values(myCart);
        for (let i = 0; i < trashButtons.length; i++) {
            let trashbutton = trashButtons[i];
            trashbutton.addEventListener('click', function() {
                let quantityCameraToDelete = parseFloat(myCart[i].quantity);
                myCart.splice(i, 1);
                localStorage.setItem('inCart', JSON.stringify(inCart - quantityCameraToDelete));
                localStorage.setItem('myCart', JSON.stringify(myCart));
                document.location.reload(); 
                cart.totalPrice();      
            })       
        }
      }

}