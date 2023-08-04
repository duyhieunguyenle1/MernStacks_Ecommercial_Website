import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';

import { clearErrors, resetPassword } from '../../actions/userActions'

import {
    MetaData
} from "../index";

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { token } = useParams()

    const { success, error } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Password updated successfully')
            navigate('/login')
        }

    }, [dispatch, alert, error, success])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(token, formData))
    }


    return (
        <>
            <MetaData title={'New Password Reset'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg">
                        <h1 className="mb-3">New Password</h1>

                        <div className="mb-3" onSubmit={submitHandler}>
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="px-1 fw-normal text-danger">
                                {confirmPassword === '' || (password === confirmPassword) ? '' : 'New password and confirm password must be identical'}
                            </div>
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn w-100 py-3 mt-3"
                            disabled={password === confirmPassword ? false : true}
                        >
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPassword