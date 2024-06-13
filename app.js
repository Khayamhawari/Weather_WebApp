const API_KEY = 'Your Api Key';
const api_url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const showSunrise = document.querySelector('.show-details');
const showSunset = document.querySelector('.show-details-2');
const showCountry =  document.querySelector('.country-name');
const weatherImage = document.querySelector('.main-image');
const errorMess = document.querySelector('.error');
const weatherBody = document.querySelector('.weather');

async function checkWeather(city){
   const response = await fetch(api_url + city + `&appid=${API_KEY}`);

   if(response.status == 404){
    errorMess.style.display = "block";
    weatherBody.style.display = "none";
   }else {
    var data = await response.json();

    let {sunrise, sunset} = data.sys;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.real-feel-value').innerHTML = Math.round(data.main.feels_like) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
   showSunrise.innerHTML = `<p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
                            <p>Sunrise</p>`
   showSunset.innerHTML = `<p>${window.moment(sunset * 1000).format('HH:mm a')}</p>
                           <p>Sunset</p>` 
                           
    if(data.weather[0].main == "Cloud"){
      weatherImage.src = "Assets/clouds.png";
    }else if(data.weather[0].main == "Clear"){
     weatherImage.src = "Assets/clear.png";
    }else if(data.weather[0].main == "Mist"){
     weatherImage.src = "Assets/mist.png";
    }else if(data.weather[0].main == "Drizzle"){
     weatherImage.src = "Assets/drizzle.png";
    }else if(data.weather[0].main == "Rain"){
     weatherImage.src = "Assets/rain.png";
    }else if(data.weather[0].main == "Snow"){
     weatherImage.src = "Assets/snow.png";
    } 
    weatherBody.style.display = "block";
    errorMess.style.display = "none";
   }
                         
}

searchBtn.addEventListener('click', ()=>{
  checkWeather(searchInput.value);
})
