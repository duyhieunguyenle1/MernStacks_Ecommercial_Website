const catchAsyncError = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process stripe payments => /api/v1/payment/process
const processPayment = catchAsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_payment' }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// Send stripe API Key => /api/v1/stripeapi
const sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        sendStripeApi: process.env.STRIPE_API_KEY
    })
})

module.exports = {
    processPayment,
    sendStripeApi
}