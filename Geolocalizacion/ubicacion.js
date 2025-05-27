
 var latitud;
 var longitud;

if("geolocation" in navigator){
  
  navigator.geolocation.getCurrentPosition(function(posicion){
       latitud=posicion.coords.latitude;
       longitud=posicion.coords.longitude;  
  });

}else{
  alert('El explorador NO soporta geolocalización');
}

var id_posicion=navigator.geolocation.watchPosition(function(posicion){
  latitud=posicion.coords.latitude;
  longitud=posicion.coords.longitude;
  console.log(latitud,longitud);
  document.querySelector('#lat').innerText=latitud;
  document.querySelector('#lon').innerText=longitud;
});

function iniciarMap(){

    var coord = {lat:latitud ,lng:longitud};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}