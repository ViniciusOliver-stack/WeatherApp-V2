const APIKey = '33ce53fdc7f487e48f74035dd67eeb33'

const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const climate = document.querySelector('.climate')

const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')

const btnSubmitCity = document.querySelector('.submitCity')

btnSubmitCity.addEventListener('click', () => {
  const nameCity = document.querySelector('#nameCity').value

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      console.log(resp)
      const sunriseDate = new Date(resp.sys.sunrise * 1000)
      const sunriseHours = sunriseDate.getHours().toFixed(2).replace('.', ':')

      const sunsetDate = new Date(resp.sys.sunset * 1000)
      const sunsetHours = sunsetDate.getHours().toFixed(2).replace('.', ':')

      city.textContent = `${resp.name}`
      temperature.textContent = `${resp.main.temp}°C`
      climate.textContent = `${resp.weather[0].description}`

      sunrise.textContent = `0${sunriseHours} AM`
      sunset.textContent = `${sunsetHours} PM`
    })
})

//Extrair a informação
