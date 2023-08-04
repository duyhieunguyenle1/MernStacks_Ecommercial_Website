import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";

import { getProductReviews, clearErrors, deleteProductReview } from "../../actions/productActions";
import MetaData from "../layouts/MetaData";
import Sidebar from './Sidebar';
import { DELETE_REVIEWS_RESET } from '../../constants/productConstants';

const ProductReviews = () => {
    const [productId, setProductId] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, reviews } = useSelector(state => state.productReview)
    const { isDeleted } = useSelector(state => state.review)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Review deleted successfully')
            dispatch({ type: DELETE_REVIEWS_RESET })
            dispatch(getProductReviews(productId))
        }

    }, [dispatch, error, loading, isDeleted])

    const deleteHandler = (id) => {
        dispatch(deleteProductReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        reviews?.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHandler(review._id)}>
                        <i className="fas fa-trash"></i>
                    </button>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary w-100 py-2"
                                    >
                                        SEARCH
                                    </button>
                                </ form>
                            </div>
                            {reviews && reviews.length > 0 ? (
                                <MDBDataTable
                                    data={setReviews()}
                                    className='px-3 fs-6'
                                    bordered
                                    striped
                                    hover
                                />
                            ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default ProductReviews