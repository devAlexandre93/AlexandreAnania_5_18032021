/* Fonctions en lien avec les requêtes pour obtenir les données depuis l'API */

class Request {
    
    /* Fonction utlisant la méthode FETCH pour obtenir le tableau des apareils photo depuis l'API */

    getRequest() {
        return fetch ("https://aa-oc-p5-api.herokuapp.com/api/cameras")
        .then(function(response) {
            return response.json ()
        })
        .then(function(cameras){
            return cameras
        })
        .catch(function(error){
            alert("Une erreur est survenue. Prolème potentiel avec le serveur distant Heroku, essayez d'actualiser la page.")
        })
    }

    /* Fonction utlisant la méthode FETCH pour obtenir les détails d'un appareil photo depuis l'API */

    getRequestId() {
        let params = (new URL(document.location)).searchParams;
        let cameraId = params.get('camera_id');
        return fetch ("https://aa-oc-p5-api.herokuapp.com/api/cameras/" + cameraId)
        .then(function(response) {
            return response.json ()
        })
        .then(function(camera){
            return camera
        })
        .catch(function(error){
            alert("Une erreur est survenue. Prolème potentiel avec le serveur distant Heroku, essayez d'actualiser la page.")
        })
    }
    
    /* Fonction utlisant les méthodes FETCH et POST
    Récupére les informations saisies dans le formulaire et l'ID des appareils photos séléctionnés dans le Local Storage
    Grâce à ces informations, le numéro de commande nécéssaire à la validation depuis l'API est obtenu
    Enregistre ces données dans le Local Storage en créant les keys 'orderNumber' et 'orderInfos'  */
  
    postRequest() {
        const myCart = JSON.parse(localStorage.getItem("myCart"));
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
        fetch ("https://aa-oc-p5-api.herokuapp.com/api/cameras/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-Type": "application/json"}
        })    
        .then((response) => response.json())
        .then((response) => {
            localStorage.setItem("orderNumber", JSON.stringify(response.orderId));
            localStorage.setItem("orderInfos",JSON.stringify(order));
        });  
    }
}        