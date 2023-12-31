import axios from "axios";

import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('https://ecommercial-website-api.onrender.com/api/v1/orders/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get currently logged in user orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST })

        const { data } = await axios.get('https://ecommercial-website-api.onrender.com/api/v1/orders/me')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`https://ecommercial-website-api.onrender.com/api/v1/orders/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all order Admin
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST })

        const { data } = await axios.get(`https://ecommercial-website-api.onrender.com/api/v1/admin/orders`)

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`https://ecommercial-website-api.onrender.com/api/v1/admin/orders/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDERS_REQUEST })

        const { data } = await axios.delete(`https://ecommercial-website-api.onrender.com/api/v1/admin/orders/${id}`)

        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}