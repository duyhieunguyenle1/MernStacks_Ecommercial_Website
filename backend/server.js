const app = require('./app')
const http = require('http')
const dotenv = require('dotenv').config()
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary').v2

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

// Connecting to database
connectDatabase(process.env.DB_URI)

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = http.createServer({ maxHeaderSize: 80000000 }, app);

server.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`Server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

// Handle Unhandle Promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(() => {
        process.exit(1)
    })
})
