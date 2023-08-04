const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')

// Create a new order => /api/v1/orders/new
const newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/orders/:id
const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No order found with this Id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders => /api/v1/orders/me
const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) {
        return next(new ErrorHandler('No order found with this Id', 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders => /api/v1/admin/orders
const allOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({})

    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: false })
}

// Update/Process orders => /api/v1/admin/orders/:id
const processOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order'), 400)
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

// Delete order => /api/v1/admin/orders/:id
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const orderId = req.params.id

    if (!orderId) {
        return next(new ErrorHandler('No order found with this Id', 404))
    }

    await Order.findOneAndDelete({ _id: orderId })

    res.status(200).json({
        success: true,
    })
})

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    processOrder,
    deleteOrder
}