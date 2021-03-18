/* Fonction permettant d'afficher le nombre de produit présent dans le panier dans le header en haut à gauche */

class Cart {
    showCartNumber () {
        let inCart = localStorage.getItem ('inCart');
        if (inCart) {
            document.getElementById ('cart_number').textContent = inCart;
        }
    }    
}