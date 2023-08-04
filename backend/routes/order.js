const express = require('express')
const router = express.Router()

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    processOrder,
    deleteOrder
} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/orders/new').post(isAuthenticatedUser, newOrder)

router.route('/orders/me').get(isAuthenticatedUser, myOrders) // /me must above /:id
router.route('/orders/:id').get(isAuthenticatedUser, getSingleOrder)

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders)
router.route('/admin/orders/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), processOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router