window.addEventListener('load', ()=> {
  let long;
  let lat;

  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let degreeSpan = document.querySelector('.degree-section span');




  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/3ec2c9bc1dda21152b40e1ee1bc4b3d0/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary, icon} = data.currently;

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone.replace(/_/g, " ");
          setIcons(icon, document.querySelector(".icon"));

          let celsius = (temperature - 32) * (5/9);

          degreeSection.addEventListener('click', () => {
            if(degreeSpan.textContent === "F"){
              degreeSpan.textContent = "C";
              temperatureDegree.textContent = celsius;
            } else {
              degreeSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });

        })
    });
  } else {
    h1.textContent = "Please give access to location to see weather";
  }


  function setIcons (icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
