const searchField = document.querySelector(".input-box");
const serachBtn = document.querySelector("#searchButton");
const cityName = document.querySelector(".cityName");
const get_Date = document.querySelector(".getDate");
const weather_img = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");

const form = document.querySelector("form");

const locationNotFound = document.querySelector(".location-not-found");
const error = document.querySelector(".error_img");
const weatherBody = document.querySelector(".weather-body");

// let target = 'new delhi';
const fetchData = async (target) => {
    const apiKey = "fa8bda9977844962a4b184159232704";

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${target}`;

    const response = await fetch(`${url}`);
    console.log(response);

    if (response.status == 400) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        error.src = "./assests/404.png";
    } else {
        const weatherData = await response.json();

        const {
            current: {
                temp_c,
                condition: { text, icon },
                humidity,
                wind_kph,
            },
            location: { name, localtime },
        } = weatherData;

        console.log(weatherData);

        upDateDom(name, localtime, temp_c, text, icon, humidity, wind_kph);

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";
    }
};

// fetchData(target);

form.addEventListener("submit", search);

function upDateDom(city, time, temp, condition, icon, humid, wind) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getFunctionDay(new Date(exactDate).getDay());

    cityName.innerText = city;
    get_Date.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
    temperature.innerText = `${temp}°`;
    description.innerText = condition;
    weather_img.src = icon;
    humidity.innerText = humid;
    windSpeed.innerText = wind;
}

function search(e) {
    e.preventDefault();
    target = searchField.value;

    fetchData(target);

    searchField.value = "";
}

function getFunctionDay(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";

        default:
            return "Don't Know";
    }
}
