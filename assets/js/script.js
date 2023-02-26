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

  if (nameCity === '') {
    return
  }

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

  //Get data all application
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      if (resp.cod === '404') {
        city.textContent = 'Cidade não encontrada'
        temperature.textContent = '---'
        humidity.textContent = `---`
        pressure.textContent = `---`
        windSpeed.textContent = `---`
        climate.textContent = `---`

        return
      }

      city.textContent = `${resp.name}`
      temperature.textContent = converterParaInteiro(resp.main.temp) + `°C`
      humidity.textContent = `${resp.main.humidity}%`
      pressure.textContent = `${resp.main.pressure}mBar`
      windSpeed.textContent = `${resp.wind.speed}km/h`
      climate.textContent = `${resp.weather[0].description}`

      const sunriseHours = converterParaHora(resp.sys.sunrise)
      const sunsetHours = converterParaHora(resp.sys.sunset)

      sunrise.textContent = `0${sunriseHours} AM`
      sunset.textContent = `${sunsetHours} PM`

      const imgHeader = document.querySelector('#img')

      switch (resp.weather[0].main) {
        case 'Clear':
          imgHeader.src = '../../assets/images/Icons Set/sun.svg'
          break
        case 'Rain':
          imgHeader.src = '../../assets/images/Icons Set/rain.svg'
          break
        case 'Snow':
          imgHeader.src = '../../assets/images/Icons Set/heavy-snowfall.svg'
          break
        case 'Clouds':
          imgHeader.src = '../../assets/images/Icons Set/cloud.svg'
          break
        case 'Thunderstorm':
          imgHeader.src = '../../assets/images/Icons Set/thunderstrom.svg'
          break
        case 'Drizzle':
          imgHeader.src = '../../assets/images/Icons Set/drizzle.svg'
          break
        case 'Fog':
          imgHeader.src = '../../assets/images/Icons Set/mostly-cloud.svg'
        default:
          imgHeader.src = '../../assets/images/Icons Set/mostly-cloud.svg'
          break
      }
    })

  //Get hours 3 hours
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&units=metric&cnt=8&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      //Getting the min and max values for each day
      for (i = 0; i < 7; i++) {
        document.getElementById('day' + (i + 1) + 'Min').innerHTML =
          Number(resp.list[i].main.temp_min).toFixed(0) + '°'
      }

      for (i = 0; i < 7; i++) {
        document.getElementById('day' + (i + 1) + 'Max').innerHTML =
          Number(resp.list[i].main.temp_max).toFixed(0) + '°'
      }

      console.log(resp)

      for (i = 0; i < 4; i++) {
        document.getElementById('temp' + (i + 1)).innerHTML =
          Number(resp.list[i].main.temp).toFixed(0) + '°'
      }
      for (i = 0; i < 4; i++) {
        document.getElementById(
          'ampm' + (i + 1)
        ).innerHTML = `${converterParaHora(resp.list[i].dt)}`
      }
    })
})

//Getting and displaying the text for the upcoming five days of the week
let d = new Date()
let weekday = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
]

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7
  } else {
    return day + d.getDay()
  }
}

for (i = 0; i < 7; i++) {
  document.getElementById('day' + (i + 1)).innerHTML = weekday[CheckDay(i)]
}

// Get the modal
const modal = document.querySelector('#search')
const btn = document.querySelector('#searchBtn')
const btnSearch = document.querySelector('.submitCity')
const span = document.getElementsByClassName('close')[0]
const inputSearch = document.querySelector('.inputSearch')
const uilSearch = document.querySelector('#uilSearch')

btn.onclick = function () {
  modal.style.display = 'block'
  modal.classList.add('transition')
}
btnSearch.addEventListener('click', function () {
  modal.style.display = 'none'
  inputSearch.value = ''
})
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
