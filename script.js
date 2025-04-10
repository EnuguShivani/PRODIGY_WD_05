const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");
function displayWeather(data) {
  const { name, weather, main } = data;
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>🌡️ Temperature: ${main.temp} °C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>🔻 Pressure: ${main.pressure} hPa</p>
  `;
}
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        weatherInfo.innerHTML = `<p>City not found. Try again.</p>`;
      }
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>Error fetching data.</p>`;
      console.error(error);
    });
}
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        )
          .then(response => response.json())
          .then(data => displayWeather(data))
          .catch(error => {
            weatherInfo.innerHTML = `<p>Error fetching data.</p>`;
            console.error(error);
          });
      },
      () => {
        alert("Geolocation permission denied.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}