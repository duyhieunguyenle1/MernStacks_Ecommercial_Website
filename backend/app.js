const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// if (process.env.NODE_ENV !== 'PRODUCTION') {
require('dotenv').config()
// }

const productRoute = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
const errorMiddleware = require('./middlewares/errors')


// middleware 
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser()) // add access to cookie in req
app.use(fileUpload())

// routes
app.use('/api/v1', productRoute)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)

// if (process.env.NODE_ENV === 'PRODUCTION') {
//     app.use(express.static(path.resolve(__dirname, '../frontend/dist')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
//     })
// }

// Error Middleware
app.use(errorMiddleware)

module.exports = app