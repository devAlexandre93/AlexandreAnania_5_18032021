const myCart = JSON.parse(localStorage.getItem("myCart"));

//* Fonction faisant apparaitre le panier s'il y au moins un appareil photo sélectionné *//

function displayCart () {
    let cartCost = localStorage.getItem ('cartCost');
    let tableBody = document.getElementById ("table_body");
    let totalPrice = document.getElementById ("total_price");
    let buttonsCart = document.getElementById ("buttons_cart");
    let shoppingCart = document.getElementById ("shopping_cart");
    if (myCart) {
        Object.values(myCart).map(camera =>{
            tableBody.innerHTML +=
                `<tr class="camera_row">
                    <td class="camera_table_cart"> <img class="camera_img_table_cart" src="${camera.imageUrl}" alt="${camera.name}" onclick="document.location='produit.html?camera_id=' + ('${camera._id}')"> ${camera.name} </td>
                    <td class="lence_table_cart"> ${camera.lenses} </td>
                    <td class="quantity_table_cart"> ${camera.quantity} </td>
                    <td class="unity_price_table_cart"> ${camera.price/100} € </td>
                    <td class="global_price_table_cart"> ${camera.price/100*camera.quantity} € </td>
                </tr>`;
            totalPrice.innerHTML =
                `${cartCost} €
                `;
                buttonsCart.innerHTML =
                `
                <button class="delete_allcameras" type="button" onclick="localStorage.clear(), window.location.reload()"> Vider le panier </button>
                <button class="continue_order" type="button" onclick="showOrderForm()"> Poursuivre la commande </button>
                `;    
        })
    } else {
        shoppingCart.innerHTML =
        `<div class="empty_cart"> 
            <p> Il n'y a rien dans votre panier pour le moment <p>
            <a href="index.html"><i class="fas fa-shopping-bag empty_bag"></i> </a>
        </div>`;
    }
}

displayCart ()

const cart = new Cart;
cart.showCartNumber();

//* Fonction faisant apparaitre le formulaire de validation de commande *//

function showOrderForm() {
    order_container_form.style.display = "block";
    document.getElementById("order_container_form").innerHTML +=
        `<form class="order_form">
            <i class="fas fa-times close_form" onclick="document.location.reload()"></i>
            <h2> Validation de la commande </h2>
            <p> Veuillez renseigner vos coordonnées pour finaliser votre commande </p>
            <div class="name_container_form">
                <div class="lastname_container_form">
                    <label for="lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname"/>
                </div>
                <div class="firstname_container_form">
                    <label for="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname"/>
                </div>
            </div>
            <div class="adress_container_form">
                <label for="adress">Adresse</label>
                <input type="text" id="adress" name="adress"/>
            </div>
            <div class="city_postalcode_container_form">
                <div class="city_container_form">
                    <label for="city">Ville</label>
                    <input type="text" id="city" name="city"/>
                </div>
                <div class="postalcode_container_form">
                    <label for="postalcode">Code postal</label>
                    <input type="text" id="postalcode" name="postalcode"/>
                    <div id="error_postalcode"></div>
                </div>
            </div>
            <div class="email_container_form">
                <label for="email">Email</label>
                <input type="email" id="email" name="email"/>
                <div id="error_email"></div>
            </div>
            <div class="buttons_container_form">
                <input type="reset" id="delete" name="delete" class="delete_button_form" value="Effacer les informations"/>
                <input type="submit" id="order" name="order" class="order_button_form" value="Passer la commande"/>   
            </div>    
        </form>    
        `
  }

/* Evènement permettant de valider sa commande et d'être redirigé vers la page de commande
Il est exécuté au clic du bouton "Passer la commande" */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('order_container_form').addEventListener('submit', function(event){
        event.preventDefault(); 
        postRequest();
        toOrderPage();
        localStorage.clear();
        orderCost()
    });
});  

/* Fonction utlisant les méthodes FETCH et POST
Récupére les informations saisies dans le formulaire et l'ID des appareils photos séléctionnés dans le Local Storage
Grâce à ces informations, récupére le numéro de commande nécéssaire à la validation depuis l'API
Enregistre ces données dans le Local Storage */
  
function postRequest() {
    const tableId = Object.values(myCart).map(function (camera) {return camera._id;});
    let order = {
        contact: {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            address: document.getElementById('adress').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        },
        products: tableId, 
    }
    fetch ("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {"Content-Type": "application/json"}
        }
    )
    .then((response) => response.json())
    .then((response) => {
        localStorage.setItem("orderNumber", JSON.stringify(response.orderId));
        localStorage.setItem("orderInfos",JSON.stringify(order));
    });  
} 

//* Fonction redirigeant vers la page récapitulant la commande *//

function toOrderPage() {
    setTimeout(function() {window.location = 'commande.html'; }, 2000)
  }

/* Fonction utilisant le Local Storage
Permet de garder le prix total de la commande dans le localStorage pour l'afficher en suite sur la page récapitulant la commande */
  
function orderCost() {
    let totalPriceElement = document.getElementById("total_price");
    let totalPrice = parseFloat(totalPriceElement.innerText.replace('€', ''))
    localStorage.setItem("orderCost", totalPrice);
}

