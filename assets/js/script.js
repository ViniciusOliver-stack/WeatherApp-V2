const APIKey = '33ce53fdc7f487e48f74035dd67eeb33'

const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const climate = document.querySelector('.climate')
const humidity =document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')
const windSpeed = document.querySelector('.wind-speed')

const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')

const btnSubmitCity = document.querySelector('.submitCity')

btnSubmitCity.addEventListener('click', () => {
  const nameCity = document.querySelector('#nameCity').value

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&cnt=7&appid=${APIKey}`
  )
  .then(data => data.json())
  .then(resp => {
    console.log(resp);
  city.textContent = `${resp.name}`
  temperature.textContent = parseInt(`${resp.main.temp}`).toFixed(0)+`°C`
  humidity.textContent = `${resp.main.humidity}%`
  pressure.textContent = `${resp.main.pressure}hPa`
  windSpeed.textContent = `${resp.wind.speed}km/h`
  })
    .then(data => data.json())
    .then(resp => {
      console.log(resp)

      city.textContent = `${resp.name}`
      temperature.textContent = `${resp.main.temp}°C`
    })

    
})

//Extrair a informação
