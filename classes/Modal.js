/* Fonction en lien avec le modal */

class Modal {

    /* Fonction faisant apparaitre un modal
    Confirme que l'appareil photo a bien été ajouté au panier et permet de se rediriger vers l'accueil ou le panier
    Elle est exécutée au clic du bouton "Ajouter au panier" sur la page produit.html */

    showAddConfirmModal() {
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
    
}