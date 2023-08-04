import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { updateUser, userDetails, clearErrors } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar';
import { UPDATE_USERS_RESET } from '../../constants/userConstants';

const UpdateUser = () => {
    const { loading, error, user } = useSelector(state => state.userDetails)
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState(0)
    const [role, setRole] = useState('')

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        if (!user) {
            dispatch(userDetails(id))
        }

        // Set prev data
        if (user && user?._id === id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            navigate('/admin/users')
            alert.success('User updated successfully')
            dispatch({ type: UPDATE_USERS_RESET })
        }

    }, [dispatch, alert, error, isUpdated, updateError, id, loading, updateLoading])

    const submitHandler = (e) => {
        e.preventDefault()

        const userData = new FormData()
        userData.set('name', name);
        userData.set('email', email);
        userData.set('role', role);

        dispatch(updateUser(id, userData))
    }

    return (
        <>
            <MetaData title={'Update User'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                {loading && updateLoading ? <Loader /> : (
                    <div className="col-12 col-md-10">
                        <div className="wrapper my-5">
                            <div className="container w-50">

                                <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                    <h1 className="mb-4">Update User</h1>

                                    <div className="mb-3">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="role_field">Role</label>
                                        <select className="form-control" id="role_field" value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value={'user'}>{'user'}</option>
                                            <option value={'admin'}>{'admin'}</option>
                                        </select>
                                    </div>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn w-100 py-3 mt-3"
                                        disabled={loading ? true : false}
                                    >
                                        UPDATE
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UpdateUser