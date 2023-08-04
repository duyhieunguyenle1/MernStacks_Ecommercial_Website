const ErrorHandler = require("../utils/errorHandler")

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        })
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            err = new ErrorHandler(message, 400)
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            err = new ErrorHandler(message, 400)
        }

        // Handling Mongoose duplicate key error
        if (err.code === 11000) {
            const message = `An email ${Object.values(err.keyValue)} has been registered`
            err = new ErrorHandler(message, 400)
        }

        // Handling Expired JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = `JSON Web Token is expired. Please try again!!`
            err = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}

module.exports = errorMiddleware