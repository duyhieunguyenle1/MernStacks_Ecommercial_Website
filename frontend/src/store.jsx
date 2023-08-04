import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    productReviewsReducer,
    reviewReducer,
    authReducer,
    userDetailsReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
    cartReducer
} from "./reducers";

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    review: reviewReducer
})

let initialState = {
    cart: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {}
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function store() {
    const middlewares = [thunk]
    const middlewaresEnhancer = applyMiddleware(...middlewares)

    return createStore(rootReducer, initialState, composeEnhancers(middlewaresEnhancer))
}