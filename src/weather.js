const API_KEY = "d1dc001ff7b2f8baec30ac6e346d53de";

const weatherContainer = document.getElementById("weather-div");
const locationNameLabel = weatherContainer.querySelector("#location-name");
const weatherIconImage = weatherContainer.querySelector("#weather-icon");
const degreeLabel = weatherContainer.querySelector("#weather-degree");

function onGetPositionSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateWeatherUI(data);
    });
}

function onGetPositionFailure() {
    alert(`Can't access to your location.`);
}

function updateWeatherUI(data) {
    const degree = Math.round((data.main.temp - 273.15) * 10) / 10;
    const iconName = data.weather[0].icon;
    const imageURL = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

    locationNameLabel.innerText = data.name;
    degreeLabel.innerText = degree + "℃";
    weatherIconImage.src = imageURL;
  }
  
navigator.geolocation.getCurrentPosition(
  onGetPositionSuccess,
  onGetPositionFailure
);
