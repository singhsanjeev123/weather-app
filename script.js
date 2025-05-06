async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.innerHTML = "<p class='text-red-500'>Please enter a city name.</p>";
      return;
    }
  
    resultDiv.innerHTML = "<p class='text-gray-500'>Fetching weather...</p>";
  
    try {
      const apiKey = "1e8a5bd8f1524ef792d184330250605"; // Replace with your actual API key if different
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1e8a5bd8f1524ef792d184330250605&q=${city}&aqi=no`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
  
      resultDiv.innerHTML = `
        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-indigo-700">${data.location.name}, ${data.location.country}</h2>
          <p class="text-lg">🌡️ ${data.current.temp_c}°C, ${data.current.condition.text}</p>
          <img src="${data.current.condition.icon}" alt="Weather Icon" class="mx-auto" />
          <p>💨 Wind: ${data.current.wind_kph} km/h</p>
          <p>🌅 Last Updated: ${data.current.last_updated}</p>
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  }
  