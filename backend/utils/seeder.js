const Product = require('../models/product')
const dotenv = require('dotenv').config()
const connectDatabase = require('../config/database')
const products = require('../data/product.json')

connectDatabase(process.env.DB_URI);

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products)
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()