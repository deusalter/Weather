import './style.css'

const apiKey = '9adae111057b4e8d9df034f78bf4b0e7';
document.body.style.margin = "0";
document.body.style.fontFamily = "sans-serif";
document.body.style.transition = "background 0.5s ease";

const box = document.getElementById("weatherbox");
box.style.textAlign = "center";
box.style.padding = "50px";
box.style.color = "white";

const input = document.getElementById("cityInput");
input.style.padding = "10px";
input.style.fontSize = "16px";

const button = document.querySelector("button");
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
button.style.marginLeft = "10px";


async function getWeather() {
  const cityName = input.value.trim();
  if (!cityName) return;

  const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`);
  const data = await res.json();

  if (!data || !data.data || data.data.length === 0) {
    alert("City not found");
    return;
  }

  const info = data.data[0];
  document.getElementById("city").textContent = info.city_name;
  document.getElementById("condition").textContent = info.weather.description;
  document.getElementById("temp").textContent = `${info.temp}°C`;

  // Update background based on weather
  const desc = info.weather.description.toLowerCase();
  let bg = "#333";

  if (desc.includes("clear")) bg = "#3db2ff";
  else if (desc.includes("cloud")) bg = "#7f8c8d";
  else if (desc.includes("rain")) bg = "#34495e";
  else if (desc.includes("snow")) bg = "#ecf0f1";
  else if (desc.includes("fog") || desc.includes("mist")) bg = "#95a5a6";

  document.body.style.background = bg;
}

let weatherbtn=document.getElementById("weatherbtn")
weatherbtn.addEventListener("click", ()=> {
  getWeather()
})
