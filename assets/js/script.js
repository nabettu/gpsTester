var latlonDistance, map;

map = "";

latlonDistance = function(alat, alon, blat, blon) {
  var distance, lat1, lat2, lng1, lng2, r;
  r = 6378.137;
  lat1 = alat * Math.PI / 180;
  lng1 = alon * Math.PI / 180;
  lat2 = blat * Math.PI / 180;
  lng2 = blon * Math.PI / 180;
  distance = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1));
  return Math.round(distance * 1000);
};

$(function() {
  var startPos;
  startPos = "";
  navigator.geolocation.watchPosition(function(position) {
    var lat, lon, move;
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat + ":" + lon);
    if (startPos === "") {
      startPos = {
        lat: lat + 0,
        lon: lon + 0
      };
    }
    map = new GMaps({
      div: "#map",
      lat: startPos.lat,
      lng: startPos.lon,
      zoom: 16
    });
    map.addMarker({
      lat: startPos.lat,
      lng: startPos.lon,
      infoWindow: {
        content: "<p class='tag'>初期値</p>"
      }
    });
    map.addMarker({
      lat: lat,
      lng: lon,
      infoWindow: {
        content: "<p class='tag'>現在地</p>"
      }
    });
    move = latlonDistance(startPos.lat, startPos.lon, lat, lon) + "m";
    console.log(move);
    $("#move")[0].innerHTML = move;
    return 0;
  });
  return 0;
});
