const apiKey = '772941c6fc5945ec80754914251610';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const forecastContainer = document.getElementById('forecast-container');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        }
    }
});

async function getWeather(city) {
    loader.style.display = 'block';
    errorMessage.style.display = 'none';
    forecastContainer.innerHTML = '';
    cityName.textContent = '';
    temperature.textContent = '';
    description.textContent = '';

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        loader.style.display = 'none';
        if (data.error) {
            errorMessage.textContent = 'City not found';
            errorMessage.style.display = 'block';
        } else {
            displayWeather(data);
            displayForecast(data.forecast.forecastday);
        }
    } catch (error) {
        loader.style.display = 'none';
        errorMessage.textContent = 'An error occurred while fetching data.';
        errorMessage.style.display = 'block';
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    cityName.textContent = data.location.name;
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
    description.textContent = `Description: ${data.current.condition.text}`;
    updateBackground(data.current.condition.text);
}

function displayForecast(forecast) {
    forecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        forecastItem.innerHTML = `
            <p>${dayName}</p>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${day.day.avgtemp_c}°C</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function updateBackground(condition) {
    const body = document.body;
    body.className = ''; // Reset classes
    if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) {
        body.classList.add('sunny');
    } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
        body.classList.add('cloudy');
    } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
        body.classList.add('rainy');
    } else if (condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('sleet') || condition.toLowerCase().includes('blizzard')) {
        body.classList.add('snowy');
    }
}
