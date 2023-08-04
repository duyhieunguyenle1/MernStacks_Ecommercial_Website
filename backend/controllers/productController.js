const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary').v2

// Get all products => /api/v1/products
const getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    let product = await apiFeatures.query
    let filteredProductsCount = product.length

    res.status(200).json({
        success: true,
        productCount,
        resPerPage,
        filteredProductsCount,
        product
    })
})


// Get single product => /api/v1/products/:id
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId })

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Get all products (Admin) => /api/v1/admin/products
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({})

    res.status(200).json({
        success: true,
        product
    })
})

// Create new product => /api/v1/admin/product/new
const newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = []
    if (typeof (req.body.images) === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: 'shopIT_images'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user._id

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// Update the product => /api/v1/admin/product/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { id: productId } = req.params
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    // get old images
    let images = []
    if (typeof (req.body.images) === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        // Delete images attached to product
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'shopIT_images'
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }


    product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product => /api/v1/admin/product/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id: productId } = req.params
    const product = await Product.findOneAndDelete({ _id: productId })

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    // Delete images attached in product
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id)
    }

    res.status(200).json({
        success: true,
        message: 'Product is deleted!!'
    })
})

// Create new review => /api/v1/review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(e => e.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment,
                    review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// Get all product reviews => /api/v1/reviews
const getProductsReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete product review => /api/v1/reviews
const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length

    const ratings = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / numOfReviews

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

module.exports = {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductsReviews,
    deleteReview,
    getAdminProducts
}