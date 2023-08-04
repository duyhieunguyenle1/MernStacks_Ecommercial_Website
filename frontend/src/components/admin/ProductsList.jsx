import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";

import { getAdminProducts, clearErrors, deleteProduct } from "../../actions/productActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, error, product } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            navigate('/admin/products')
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Product deleted successfully')

            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError])

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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

        product?.forEach(prod => {
            data.rows.push({
                id: prod._id,
                name: prod.name,
                price: `$${prod.price}`,
                stock: prod.stock,
                actions:
                    <>
                        <Link to={`/admin/product/${prod._id}`} className='btn btn-primary py-1 px-2 me-2'>
                            <i className="fas fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(prod._id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">
                            All Products
                        </h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className='px-3 fs-6 mt-3'
                                bordered
                                striped
                                hover
                            />
                        )}
                    </>
                </div>
            </div>
        </>
    )
}

export default ProductsList