/* Fonction utlisant la méthode FETCH pour obtenir le tableau des apareils photo depuis l'API */

function getRequest() {
    return fetch ("http://localhost:3000/api/cameras")
    .then(function(response) {
        return response.json ()
    })
    .then(function(cameras){
        return cameras
    })
    .catch(function(error){
        alert("Une erreur est survenue. N'oubliez pas de lancer le serveur depuis le dossier Back-end.")
    })
}

/* Fonction utlisant la méthode FETCH pour obtenir les détails d'un appareil photo depuis l'API */

function getRequestId() {
    let params = (new URL(document.location)).searchParams;
    let cameraId = params.get('camera_id');
    return fetch ("http://localhost:3000/api/cameras/" + cameraId)
    .then(function(response) {
        return response.json ()
    })
    .then(function(camera){
        return camera
    })
    .catch(function(error){
        alert("Une erreur est survenue. N'oubliez pas de lancer le serveur depuis le dossier Back-end.")
    })
}