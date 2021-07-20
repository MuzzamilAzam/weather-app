const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configurations
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(publicDirectory))

// app.get('', (req, res) => {
//     res.send('Hello world')
// })

app.get('', (req, res) => {
    res.render('index', {
        name: "Muzzamil Azam",
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Muzzamil Azam',
        title: 'About Me',
        message: `Back in the 90's I was in a very famous TV show.`
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Dummy Help Message.',
        title: 'Help',
        name: 'Muzzamil Azam'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'}
            )
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        } 
        
        forecast(latitude, longitude, (error, forecast, image) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast,
                address: req.query.address,
                image
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
    console.log(req.query.search)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muzzamil Azam',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Muzzamil Azam',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port + '.')
})