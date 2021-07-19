const request = require('postman-request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXV6YmFjayIsImEiOiJja3I2NzA4a3czY3FmMm50ZmhmYmlhM2U2In0.N6Aq_VDpQAwi_WGm0oMm8w&limit=1'
    request({
       url,
       json: true
      }, (error, {body} = {}) => {
       if (error){
          callback('Unable to connect to services.', undefined)
       } else if (body.features.length === 0){
          callback('Unable to find the location.', undefined)
       } else {
          callback(undefined, {
             longitude: body.features[0].center[0],
             latitude: body.features[0].center[1],
             location: body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode