let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let cityName = document.querySelector('.city-name');
let form = document.querySelector("form");
let currentTemperature = document.querySelector('.current-temperature');
let weatherDescription = document.querySelector('.weather-description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value != '') {
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                cityName.querySelector('figcaption').innerHTML = data.name;
                cityName.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                currentTemperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                currentTemperature.querySelector('span').innerText = data.main.temp;
                weatherDescription.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
}

const initApp = () => {
    valueSearch.value = 'Addis Ababa ';
    searchWeather();d
}
initApp();