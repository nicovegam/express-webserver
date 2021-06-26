const request = require('postman-request');

const geocode = (address, callback) => {
    const mapboxApiKey = "pk.eyJ1Ijoibmljb3ZlZ2FtIiwiYSI6ImNrcWI1cXg4eDAxYjUycHM1cTlxbTFtNjAifQ.kwQ91JI4fftEYcUTERx4fQ"
    const locationUrl = 
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxApiKey}&limit=1`
    
    request({url: locationUrl, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to location services')
    
        }else if (body.features.length === 0){
            callback('Sorry, no locations found')
        
        }else{
            callback(undefined, {
                location: body.features[0].place_name,
                lat: body.features[0].center[1],
                long: body.features[0].center[0]
            })
        }
    });
}

module.exports = geocode;