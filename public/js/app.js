const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.innerHTML = "hello"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading...."
    messageTwo.textContent = ''
    // http://localhost:3000
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        messageOne.textContent = ''
        if (data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})