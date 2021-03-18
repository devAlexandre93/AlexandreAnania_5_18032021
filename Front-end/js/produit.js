/* Fonction asynchrone permettant d'utiliser les données récupérées depuis l'API grâce à la fonction FETCH getRequestId */

async function getCamera() {
    const camera = await getRequestId();
    displayCamera(camera);
}

getCamera()

const cart = new Cart;
cart.showCartNumber();

/* Fonction affichant l' appareil photo sélectionné sur la page produit.html */

function displayCamera(camera) {
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
                <button class="add_cart_button" type="button" onclick="showModal()"> Ajouter au panier </button>
            </figcaption>
        </figure>`;
    const lenses = camera.lenses;    
    addLenses(lenses);
    const addInCart = document.getElementsByClassName('add_cart_button');
      for (let i=0; i < addInCart.length; i ++) {
      addInCart[i].addEventListener('click',() => {
      cartNumber(camera);
      totalCost(camera);
      })
      }   
}

/* Fonction faisant apparaitre un modal, confirme que l'appareil photo a bien été ajouté au panier et permet de se rediriger vers l'accueil ou le panier
Elle est exécutée au clic du bouton "Ajouter au panier" */

function showModal() {
    modal.style.display = "block";
    document.getElementById("modal").innerHTML =
        `<div class="modal_content">
            <i class="fas fa-times close_modal" onclick="document.location.reload()"></i>
            <p> Vous avez ajouté l'appareil photo à votre panier ! </p>
            <button class="continue_buying" type="button" onclick="document.location='index.html'"> Continuer vos achats </button>
            <button class="see_cart" type="button" onclick="document.location='panier.html'"> Voir votre panier </button>
        </div>    
        `
  }

/* Fonction affichant le choix des objectifs 
Contient une boucle "for...in" permettant d'afficher tous les objets du tableau "lenses" */

function addLenses(lenses){
  let selectLenses = document.getElementById('select_lenses');
  for (let i in lenses){
      selectLenses.innerHTML += `<option> ${lenses[i]} </option>`;
  }
}

/* Fonction utilisant le Local Storage, enregistre et affiche le nombre de produit à coté de l'icône panier
Elle est exécutée au clic du bouton "Ajouter au panier" */

function cartNumber(camera) {
    let inCart = localStorage.getItem ('inCart');
    inCart = parseInt(inCart);
    if (inCart) {
        localStorage.setItem('inCart', inCart + 1);
        document.getElementById ('cart_number').textContent = inCart + 1
    } else {
        localStorage.setItem('inCart', 1);
        document.getElementById ('cart_number').textContent = 1
    }
    Items(camera)
}

/* Fonction utilisant le Local Storage, enregistre les informations de l'appareil photo sélectionnés */

function Items(camera) {
    let myCart = localStorage.getItem ('myCart');
    let selectLenses = document.getElementById ('select_lenses');
    let selectedLense = selectLenses.options[selectLenses.selectedIndex].value
    myCart = JSON.parse(myCart); 
    if (myCart != null ) {
        if(myCart[camera.name] == undefined) {
            camera.lenses = selectedLense
            camera.quantity = 0;
            myCart = {
                ...myCart,
                [camera.name]: camera
            }
        }
        myCart[camera.name].quantity += 1      
    } else {
        camera.lenses = selectedLense
        camera.quantity = 1;
        myCart = {
            [camera.name]: camera
        }
    }
    localStorage.setItem("myCart", JSON.stringify(myCart))
}

/* Fonction utilisant le Local Storage, calcule le prix total des appareils photos sélectionnés */

function totalCost (camera) {
    let cartCost = localStorage.getItem('cartCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem ("cartCost", cartCost + camera.price/100);
    } else {
        localStorage.setItem ("cartCost", camera.price/100)
    }
}
