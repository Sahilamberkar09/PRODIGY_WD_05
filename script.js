const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "b284ee2f99ae943f91505f148b70baf2";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error.classList.add("active");
        return;
      }

      container.style.height = "500px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "assets/clear.png";
          break;
        case "Rain":
          image.src = "assets/rainy.png";
          break;
        case "Snow":
          image.src = "assets/snowy.png";
          break;
        case "Clouds":
          image.src = "assets/thunder-lighting.png";
          break;
        case "ClearMoon":
          image.src = "assets/clear-moon.png";
          break;
        case "Haze":
          image.src = "assets/windy.png";
          break;
        default:
          image.src = "assets/clear.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/h`;
    });
});
