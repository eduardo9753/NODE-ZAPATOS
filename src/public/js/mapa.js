window.addEventListener('DOMContentLoaded' , () => {

    //SOCKET IO
    const socket = io();

    //VARIABLES MAPA
    const mapa = L.map('map').setView([ -12.0551637 , -77.0802424,13] , 10);//DIRECCION DE MAPA POR DEFECTO
    const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(mapURL).addTo(mapa);

    
    //MI UBICACION
    const myCoords = () => {
        mapa.locate({ enableHightAccuracy : true });//para pedir la ubicacion al cliente
        mapa.on('locationfound' , (e) => {
            console.log('TU UBICACION' , e);
            const coords = [e.latlng.lat , e.latlng.lng];
            const newMarker = L.marker(coords);
            newMarker.bindPopup('You are here');
            mapa.addLayer(newMarker);
            socket.emit('userCoordinates' , e.latlng);
        });
    }

    //UBICACION DE OTRO USUARI0
    const corrdsNewUser = () =>{
        socket.on('newUserCoordinates' , (coords) => {
            console.log('CORDERNADA NEW USER' , coords);
            const newCoords = [coords.lat, coords.lng];
            const newUserMarker = L.marker(newCoords);
            newUserMarker.bindPopup('HELLO THERE');
            mapa.addLayer(newUserMarker);
        })
    }

    //EJECUTANDO LOS EVENTOS
    window.addEventListener('load' , myCoords);
    window.addEventListener('load' , corrdsNewUser);
})