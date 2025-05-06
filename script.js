async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.innerHTML = "<p class='text-red-500'>Please enter a city name.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p class='text-gray-500'>Fetching weather...</p>";
  
    const apiKey = '1e8a5bd8f1524ef792d184330250605';  // Your API key from WeatherAPI
  
    try {
      // Fetch weather data from WeatherAPI
      const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
      const weatherData = await weatherResponse.json();
  
      if (weatherData.error) {
        resultDiv.innerHTML = `<p class='text-red-500'>${weatherData.error.message}</p>`;
        return;
      }
  
      const weather = weatherData.current;
  
      resultDiv.innerHTML = `
        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-indigo-700">${weatherData.location.name}, ${weatherData.location.country}</h2>
          <p class="text-lg">🌡️ ${weather.temp_c}°C, ${weather.condition.text}</p>
          <p>💨 Wind: ${weather.wind_kph} km/h</p>
          <p>🌅 Last Updated: ${new Date(weather.last_updated_epoch * 1000).toLocaleTimeString()}</p>
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  }
  