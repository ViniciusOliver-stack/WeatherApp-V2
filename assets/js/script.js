const APIKey = '33ce53fdc7f487e48f74035dd67eeb33'

const city = document.querySelector('.city')
const temperature = document.querySelector('.temperature')
const climate = document.querySelector('.climate')

const btnSubmitCity = document.querySelector('.submitCity')

btnSubmitCity.addEventListener('click', () => {
  const nameCity = document.querySelector('#nameCity').value

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${APIKey}`
  )
  .then(data => data.json()) //O dado que recebem é em JSON
  .then(resp => {
    try {
      console.log(resp)
      city.textContent = resp.name
      temperature.textContent = `${Number(resp.main.temp).toFixed(0)}°C`
    } catch {
      resp.message = 'Cidade não localizada'
      city.textContent = resp.message
      return
    }
  }) 
})


//Extrair a informação
