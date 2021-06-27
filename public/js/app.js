
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherResult = document.querySelector('#weather-results')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    weatherResult.textContent = 'Loading....'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then(data => {
            if (data.error){
                weatherResult.textContent = data.error
            }else{
                weatherResult.textContent = data.location + ': ' + data.forecast
            }

        })
    })
})