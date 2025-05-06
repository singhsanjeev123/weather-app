async function getWeather() {
    const city = document.getElementById("cityInput").value;
    
    const resultDiv = document.getElementById("weatherResult");
    if (!city) {
      resultDiv.innerHTML = "<p class='text-red-500'>Please enter a city name.</p>";
      return;
    }

    resultDiv.innerHTML = "<p class='text-gray-500'>Loading...</p>";

    try {
      const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=1e8a5bd8f1524ef792d184330250605&q=${city}&aqi=no`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      const html = `
        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-indigo-700">${data.location.name}, ${data.location.country}</h2>
          <img class="mx-auto" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
          <p class="text-4xl font-bold">${data.current.temp_c}°C</p>
          <p class="text-lg text-gray-600">${data.current.condition.text}</p>
          <p>Humidity: ${data.current.humidity}%</p>
          <p>Wind: ${data.current.wind_kph} km/h</p>
          <p>Last Updated: ${data.current.last_updated}</p>
        </div>
      `;
      resultDiv.innerHTML = html;
    } catch (err) {
      resultDiv.innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
    }
  }

 