//* Fonction en lien avec le formulaire *//

class Form {
   
    /* Fonction-Evènement faisant apparaitre le formulaire de validation de commande
    Elle est exécutée au clic du bouton "Poursuivre la commande" sur la page panier.html  */

    showOrderForm() {
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementsByClassName('continue_order')[0].addEventListener('click', function(){
                order_container_form.style.display = "block";
                document.getElementById("order_container_form").innerHTML +=
                `
                <form class="order_form">
                    <i class="fas fa-times close_form" onclick="document.location.reload()"></i>
                    <h2> Validation de la commande </h2>
                    <p> Veuillez renseigner vos coordonnées pour finaliser votre commande </p>
                    <div class="name_container_form">
                        <div class="lastname_container_form">
                            <label for="lastname">Nom</label>
                            <input type="text" id="lastname" name="lastname" required/>
                        </div>
                        <div class="firstname_container_form">
                            <label for="firstname">Prénom</label>
                            <input type="text" id="firstname" name="firstname" required/>
                        </div>
                    </div>
                    <div class="adress_container_form">
                        <label for="adress">Adresse</label>
                        <input type="text" id="adress" name="adress" required/>
                    </div>
                    <div class="city_postalcode_container_form">
                        <div class="city_container_form">
                            <label for="city">Ville</label>
                            <input type="text" id="city" name="city" required/>
                        </div>
                        <div class="postalcode_container_form">
                            <label for="postalcode">Code postal</label>
                            <input type="text" id="postalcode" name="postalcode" required/>
                            <div id="error_postalcode"></div>
                        </div>
                    </div>
                    <div class="email_container_form">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email"/ required>
                        <div id="error_email"> </div>
                    </div>
                    <div class="buttons_container_form">
                        <input type="reset" id="delete" name="delete" class="delete_button_form" value="Effacer les informations"/>
                        <input type="submit" id="order" name="order" class="order_button_form" value="Passer la commande"/>   
                    </div>    
                </form>    
                `
            });
        });
    }

    //* Fontion-Evènement effacant les champs et les messages d'erreur du formulaire au clic du bouton "Effacer les informations" *//

    clearForm () {
            document.getElementById('shopping_cart').addEventListener('reset', function() {
                document.getElementById('error_postalcode').innerHTML = "";
                document.getElementById('error_email').textContent = "";
        });
    }    

    /* Fonction-Evènement permettant de valider sa commande sur la page panier.html et d'être redirigé vers la page de commande
    Elle est exécutée au clic du bouton "Passer la commande"
    Présence de regex pour vérifier que le formulaire est correctement rempli */

    passOrder() {
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('shopping_cart').addEventListener('submit', function(event){
                event.preventDefault();
                const postalCode = document.getElementById('postalcode');
                const validPostalCode = /[0-9]{5}/;
                const email = document.getElementById('email');
                const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (validPostalCode.test(postalCode.value) == false) {
                    document.getElementById('error_postalcode').innerHTML = "<p> 5 chiffres obligatoires pour le code postal <p>";
                    return false
                }
                if (validEmail.test(email.value) == false) {
                    document.getElementById('error_email').innerHTML = "<p> Veuillez renseigner une adresse e-mail valide <p>";
                    return false
                }
                const request = new Request;
                request.postRequest();
                form.toOrderPage();
                localStorage.clear();
                form.orderCost()
            });
        });
    }

    //* Fonction redirigeant vers la page récapitulant la commande *//

    toOrderPage() {
        setTimeout(function() {window.location = 'commande.html'; }, 2000)
    }

    /* Fonction utilisant le Local Storage en créant la key 'orderCost'
    Permet de garder le prix total de la commande dans le localStorage pour l'afficher en suite sur la page récapitulant la commande */
  
    orderCost() {
        let totalPriceElement = document.getElementById("total_price");
        let totalPrice = parseFloat(totalPriceElement.innerText.replace('€', ''))
        localStorage.setItem("orderCost", totalPrice);
    }

}  