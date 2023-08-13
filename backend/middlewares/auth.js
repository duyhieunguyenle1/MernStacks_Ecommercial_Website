const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/user')
const asyncWrapper = require('./catchAsyncErrors')

// Check if user is authenticated or not
const isAuthenticatedUser = asyncWrapper(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Please login to continue', 401))
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    error: err
                })
            }
            req.user = await User.findById(decoded._id)
            next()
        })
    } catch (error) {
        return next(new ErrorHandler('Login to continue', 401))
    }
})

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role ${req.user.role} is not authorized to access these resources`, 403)
            )
        }
        next()
    }
}

module.exports = {
    isAuthenticatedUser,
    authorizeRoles
}