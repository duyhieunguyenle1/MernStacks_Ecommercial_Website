import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    DELETE_REVIEWS_FAIL,
    DELETE_REVIEWS_REQUEST,
    DELETE_REVIEWS_RESET,
    DELETE_REVIEWS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants";

export const productsReducer = (state = { products: [], loading: true, product: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
                productCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ADMIN_PRODUCTS_FAIL:
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: null, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case DELETE_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_REVIEWS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}