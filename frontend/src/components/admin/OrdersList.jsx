import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";

import { allOrders, clearErrors, deleteOrder } from "../../actions/orderActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';

const OrdersList = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, orders, isDeleted } = useSelector(state => state.allOrders)

    useEffect(() => {
        dispatch(allOrders())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Orders deleted successfully')
            dispatch({ type: DELETE_ORDERS_RESET })
            dispatch(allOrders())
        }

    }, [dispatch, alert, error, isDeleted])

    const deleteHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        orders?.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: (order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>),
                actions:
                    <>
                        <Link to={`/admin/orders/${order._id}`} className='btn btn-primary py-1 px-2 me-2'>
                            <i className="fas fa-eye"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHandler(order._id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">
                            All Orders
                        </h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
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

export default OrdersList