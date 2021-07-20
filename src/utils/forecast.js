const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const key2 = '6a54af5334ba8f5d7758710b4a2b001f'
    const key1 = '17422d807abbc4b1d3e6475d872f59f4'
    const url = 'http://api.weatherstack.com/current?access_key=' + key2 + '&query=' + latitude + ',' + longitude
    // console.log(url)
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the services.', undefined)
        } else if(body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. ' + body.current.temperature + ' degrees out. It ' + 
            'feels like ' + body.current.feelslike + ' degrees. Humidity ' + body.current.humidity + '%.', body.current.weather_icons[0])
        }
    })

}





//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

module.exports = forecast