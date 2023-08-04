import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";

import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar';
import { DELETE_USERS_RESET } from '../../constants/userConstants';


const UsersList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { loading, error, users, isDeleted } = useSelector(state => state.allUsers)

  useEffect(() => {
    dispatch(allUsers())

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Orders deleted successfully')
      dispatch({ type: DELETE_USERS_RESET })
    }

  }, [dispatch, alert, error])

  const deleteHandler = (id) => {
    dispatch(deleteUser(id))
    dispatch(allUsers())
  }

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },
        {
          label: 'Role',
          field: 'role',
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

    users?.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions:
          <>
            <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2 me-2'>
              <i className="fas fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHandler(user._id)}>
              <i className="fas fa-trash"></i>
            </button>
          </>
      })
    })

    return data
  }

  return (
    <>
      <MetaData title={'All Users'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">
              All Users
            </h1>
            {loading ? <Loader /> : (
              <MDBDataTable
                data={setUsers()}
                className='px-3 fs-6'
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

export default UsersList