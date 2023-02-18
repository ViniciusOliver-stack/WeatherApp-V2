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

const navMenu = document.querySelector('#nav-menu')
const navToggle = document.querySelector('#nav-toggle')
const navClose = document.querySelector('#nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*Remove menu mobile*/
const navLink = document.querySelectorAll('.nav-link')

function actionLink() {
  const navMenu = document.querySelector('.nav-menu')

  navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', actionLink))

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
  //Get data all application
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
      // resp.list.map(test => {
      //   console.log(resp)
      //   // Buscar elemento pai
      //   var elemento_pai = document.querySelector('.wrapper-today')
      //   // Criar elemento
      //   var today_hours = document.createElement('div')
      //   var p1 = document.createElement('p')
      //   var p = document.createElement('p')
      //   var img = document.createElement('img')

      //   }

      //   // Criando o nó de texto de outra forma
      //   p.textContent = `${converterParaInteiro(test.main.temp)} °C`
      //   p1.textContent = `${converterParaHora(test.dt)}`
      //   today_hours.classList.add('today-hours')

      //   // Inserir (anexar) o elemento filho (p) ao elemento pai (body)
      //   today_hours.appendChild(p1)
      //   today_hours.appendChild(img)
      //   today_hours.appendChild(p)
      //   elemento_pai.appendChild(today_hours)
      // })

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
    })
})

//Getting and displaying the text for the upcoming five days of the week
var d = new Date()
var weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
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
