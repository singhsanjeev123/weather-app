async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.innerHTML = "<p class='text-red-500'>Please enter a city name.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p class='text-gray-500'>Fetching weather...</p>";
  
    try {
      const apiKey = "b6907d289e10d714a6e88b30761fae22"; // OpenWeatherMap default key (use real one for production)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch weather data. Please try again.");
      }
  
      const data = await response.json();
  
      resultDiv.innerHTML = `
        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-indigo-700">${data.name}, ${data.sys.country}</h2>
          <p class="text-lg">🌡️ ${data.main.temp}°C, ${data.weather[0].description}</p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
          <p>🌅 Last Updated: ${new Date().toLocaleTimeString()}</p>
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  }
  