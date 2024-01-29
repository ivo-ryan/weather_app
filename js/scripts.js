const apiKey = "659b632f3fd5077eee5db03541b85290";

const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#waether-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data")

const cityNotFound = document.querySelector("#city-not-found")

const loader = document.querySelector("#loader");

const loaderToggler = () => {
    loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {

        loaderToggler()

        const apiWeatherURL = await fetch(`${weatherApi}${city}&units=metric&appid=${apiKey}&lang=pt_br`)
        const response = await apiWeatherURL.json();

        loaderToggler()

        return response;
};

const hideInformation = () => {
    weatherContainer.classList.add("hide");
    cityNotFound.classList.add("hide");
};



const showWeatherData = async (city) => {
    hideInformation()
   const data = await getWeatherData(city);

   if (data.cod === "404") {
            cityNotFound.classList.remove("hide");
   }

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   weatherIconElement.setAttribute("src", ` http://openweathermap.org/img/wn/${data.weather[0].icon}.png `);
   countryElement.setAttribute("src",` https://flagsapi.com/${data.sys.country}/flat/64.png `);
   umidityElement.innerText = `${data.main.humidity} %`;
   windElement.innerText = `${data.wind.speed} km/h`;

   weatherContainer.classList.remove("hide");

   document.body.style.backgroundImage = `url("${apiUnsplash + city }")`;
};



searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;
    
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
        if (e.code === "Enter") {
            const city = e.target.value;
           
            showWeatherData(city);
        }
});