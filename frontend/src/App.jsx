import './App.css'
import "bootstrap/dist/css/bootstrap.css";

import {
  Home,
  ShareLayout,
  ShareHeaderLayout,
  ProductDetails,
  Login,
  Register,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  NewPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  OrderSuccess,
  ListOrders,
  OrderDetails,
  Dashboard,
  ProductsList,
  ProtectedRoute,
  NewProduct,
  UpdateProduct,
  OrdersList,
  UsersList,
  UpdateUser,
  UpdateOrder,
  ProductReviews
} from './components'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { loadUser } from './actions/userActions'
import { useEffect, useState } from 'react';
import { useStore } from "react-redux";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  const store = useStore(state => state)

  useEffect(() => {
    store.dispatch(loadUser()); // semicolon is important

    (async function getStripeApiKey() {
      const { data } = await axios.get('https://ecommercial-website-api.onrender.com/api/v1/stripeapi')
      setStripeApiKey(data.sendStripeApi)
    })()

  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ShareLayout />} >
          <Route index element={<Home />} />
          <Route path='/search/:keyword' element={<Home />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/shipping' element={<ProtectedRoute children={<Shipping />} />} />
          <Route path='/success' element={<ProtectedRoute children={<OrderSuccess />} />} />
          {stripeApiKey &&
            <Route path='/payment'
              element={(
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute children={<Payment />} />
                </Elements>
              )} />
          }

          <Route path='/me' element={<ProtectedRoute children={<Profile />} />} />
          <Route path='/me/update' element={<ProtectedRoute children={<UpdateProfile />} />} />
          <Route path='/password/update' element={<ProtectedRoute children={<UpdatePassword />} />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<NewPassword />} />

          <Route path='/order/confirm' element={<ProtectedRoute children={<ConfirmOrder />} />} />
          <Route path='/orders/me' element={<ProtectedRoute children={<ListOrders />} />} />
          <Route path='/order/:id' element={<ProtectedRoute children={<OrderDetails />} />} />


          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/dashboard' element={<ProtectedRoute children={<ShareHeaderLayout />} />} >
          <Route index element={<ProtectedRoute children={<Dashboard />} isAdmin={true} />} />
        </Route>

        <Route path='/admin' element={<ProtectedRoute children={<ShareHeaderLayout />} />} >
          <Route path='products' element={<ProtectedRoute children={<ProductsList />} isAdmin={true} />} />
          <Route path='product' element={<ProtectedRoute children={<NewProduct />} isAdmin={true} />} />
          <Route path='product/:id' element={<ProtectedRoute children={<UpdateProduct />} isAdmin={true} />} />

          <Route path='orders' element={<ProtectedRoute children={<OrdersList />} isAdmin={true} />} />
          <Route path='orders/:id' element={<ProtectedRoute children={<UpdateOrder />} isAdmin={true} />} />

          <Route path='users' element={<ProtectedRoute children={<UsersList />} isAdmin={true} />} />
          <Route path='user/:id' element={<ProtectedRoute children={<UpdateUser />} isAdmin={true} />} />

          <Route path='reviews' element={<ProtectedRoute children={<ProductReviews />} isAdmin={true} />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
