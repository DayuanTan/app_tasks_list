
function showPositionAndAddToHTML(position){
    console.log("zzz");
    let lat = position.coords.latitude;
    let lon = position.coords.longitude; 
    
    console.log("ttt");
    document.getElementById("weatherinfo").textContent = "hhh";
    

    const Http = new XMLHttpRequest();
    const url='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f4d4a5436717f42babd6179c9f17c342';
    console.log("url: ", url);
    Http.open("GET", url);
    Http.send();
 
    Http.onreadystatechange = (e) => {
        if (Http.responseText) {
            console.log(Http.responseText);
            const result = JSON.parse(Http.responseText);
            
            let tempmax = result.main.temp_max;
            let tempmin = result.main.temp_min;
            let weather = result.weather[0].main;
            let iconid = result.weather[0].icon;
            
            console.log('main.temp result: ', result.main.temp_max);
            console.log('weather result: ', result.weather[0].main);
            document.getElementById("weatherinfo").textContent ="Weather today is " + weather + ". The temp is " + String((tempmin - 273.15).toFixed(2)) + " ~ " + String((tempmax - 273.15).toFixed(2)) + " Celsius.";
            
            let iconurl = 'http://openweathermap.org/img/wn/'+ iconid + '.png';
            document.getElementById("weatherinfo").setAttribute("src", iconurl);
        }
    }
}

function renderWeatherInfo(event){
    console.log("hello");
    navigator.geolocation.getCurrentPosition(showPositionAndAddToHTML);
    console.log("hello2");
    event.preventDefault();
}

document.addEventListener("DOMContentLoaded", renderWeatherInfo);
// document.getElementById("weatherbutton").addEventListener("click", renderWeatherInfo);