import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { login, clearErrors } from '../../actions/userActions'

import {
    MetaData,
    Loader
} from "../index";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const redirect = searchParams.get("redirect") || ''


    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            {
                <>
                    <MetaData title={'Login'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="mb-3">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to='/password/forgot' className="float-end mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn w-100 py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to='/register' className="float-end mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Login