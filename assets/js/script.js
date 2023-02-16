const APIKey = '33ce53fdc7f487e48f74035dd67eeb33'

const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const climate = document.querySelector('.climate')
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')
const windSpeed = document.querySelector('.wind-speed')

const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')

const btnSubmitCity = document.querySelector('.submitCity')

btnSubmitCity.addEventListener('click', async () => {
  const nameCity = document.querySelector('#nameCity').value

  function converterParaHora(segundos) {
    function duasCasas(numero) {
      if (numero <= 9) {
        numero = '0' + numero
      }
      return numero
    }

    const date = duasCasas(new Date(segundos * 1000))
    const horas = date.getHours().toFixed(2).replace('.', ':')

    return horas
  }

  function converterParaInteiro(value) {
    value = parseInt(value)

    return value
  }

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      console.log(resp)
      city.textContent = `${resp.name}`
      temperature.textContent = converterParaInteiro(resp.main.temp) + `°C`
      humidity.textContent = `${resp.main.humidity}%`
      pressure.textContent = `${resp.main.pressure}mBar`
      windSpeed.textContent = `${resp.wind.speed}km/h`
      climate.textContent = `${resp.weather[0].description}`

      const sunriseHours = converterParaHora(resp.sys.sunrise)
      const sunsetHours = converterParaHora(resp.sys.sunset)
      climate.textContent = `${resp.weather[0].description}`

      sunrise.textContent = `0${sunriseHours} AM`
      sunset.textContent = `${sunsetHours} PM`
    })

  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&units=metric&cnt=8&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      resp.list.map(test => {
        console.log(resp)
        // Buscar elemento pai
        var elemento_pai = document.querySelector('.wrapper-today')
        // Criar elemento
        var today_hours = document.createElement('div')
        var p1 = document.createElement('p')
        var p = document.createElement('p')
        var img = document.createElement('img')

        switch (test.weather[0].main) {
          case 'Clear':
            img.src = '../../assets/images/cloudy-clear.svg'
            break
          case 'Rain':
            img.src = '../../assets/images/rain.svg'
            break
          case 'Snow':
            img.src = '../../assets/images/snow.svg'
            break
          case 'Clouds':
            img.src = '../../assets/images/cloudy.svg'
            break
          case 'Thunderstorm':
            img.src = '../../assets/images/sever-thunderstorm.svg'
            break
          case 'Drizzle':
            img.src = '../../assets/images/drizzle.svg'
            break
          case 'Fog':
            img.src = '../../assets/images/fog.svg'
          default:
            img.src = '../../assets/images/partly-cloud.svg'
            break
        }

        // Criando o nó de texto de outra forma
        p.textContent = `${converterParaInteiro(test.main.temp)} °C`
        p1.textContent = `${converterParaHora(test.dt)}`
        today_hours.classList.add('today-hours')

        // Inserir (anexar) o elemento filho (p) ao elemento pai (body)
        today_hours.appendChild(p1)
        today_hours.appendChild(img)
        today_hours.appendChild(p)
        elemento_pai.appendChild(today_hours)
      })
    })
})
