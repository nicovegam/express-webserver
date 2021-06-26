const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const api_key = '0c3b31e0b1c551c1b58c3c43c03ac2f2';
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${lat},${long}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error){
            callback('Unable to connect to weather services')
        
        }else if (body.error){
            callback('Unable to find location')
        
        }else{
            const message = `It is ${body.current.weather_descriptions}, the temp. is ${body.current.temperature} degres. `
                + `The prob. of rain is ${body.current.precip}. Visibility is ${body.current.visibility}`

            callback(undefined, message);
        }
    });
}


module.exports = forecast;