/* Fonction en lien avec l'affichage de la commande */

class Order {

    //* Fonction affichant le récapitulatif de la commande sur la page commande.html *//

    showOrder() {
        const orderInfos = JSON.parse(localStorage.getItem("orderInfos"));
        let orderNumberElement = localStorage.getItem("orderNumber");
        let orderDisplay = document.getElementById ("order_display");
        if (orderNumberElement) {
            let orderNumber = orderNumberElement.replaceAll('"', '');
            orderDisplay.innerHTML = `
                <div class="order_summary_container">
                    <div class="succes_order">
                        <h2>La commande a été traitée avec succès !</h2>
                        <i class="fas fa-check-circle"></i>
                    </div>       
                    <div class="email_infos"> Un email récapitulatif vous sera envoyé très prochainement</div>
                    <div class="thanks_user"> Merci de votre confiance et à bientôt !</div>
                    <div class="order_infos">
                        <div class="order_number">
                            <p> Numéro de commande : </p>
                            <p> ${orderNumber} </p>
                        </div>   
                        <div class="order_amount">
                            <p> Montant total : </p>
                            <p> ${localStorage.orderCost} € </p>
                        </div> 
                    </div>
                </div>
                `;
        } else {
            orderDisplay.innerHTML = `
                <div class="empty_cart"> 
                    <p> Il n'y a aucune commande pour le moment <p>
                    <a href="index.html"><i class="fas fa-shopping-bag empty_bag"></i> </a>
                </div>
                `;
            }  
    }
    
}