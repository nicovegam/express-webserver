const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))
 
app.get('', (req, res) => {
    res.render('index', { 
        title: 'Dynamic Title' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', body: 'There is no much story here' })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })

    })
})

app.get('/about/*', (req, res) => {
    // res.redirect('/about')
    res.render('404', {
        title: 'Not found',
        body: 'About article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        body: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})