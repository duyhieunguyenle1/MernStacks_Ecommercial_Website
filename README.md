# ECOMMERCIAL WEBSITE API 
> Simple API include users, products, reviews using NodeJs

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [More](#more)

## General Information
I make this while learning in udemy to get to know better!!
https://ecommercial-website-api.onrender.com/api/v1 : Link for testing 
> Note: due to render.com policy, you might need to wait a little to load the api

## Technologies Used
* Technologies: ExpressJs, mongoose
* Languages: Javascript
* Database: Mongodb, cloudinary

## Features
* CRUD products/reviews/orders
* Authentication with JWT
* Payment with Stripe
* Admin pages
* Forgot and reset password
* Filter/sort products

## More
post ( /register, /login, /password/forgot, /order/new, /payment/process )
get ( /products, /admin/products, /products/:id, /reviews, /stripeapi, /orders/me, /orders/:id, /admin/orders, /me, /admin/users, /admin/users/:id, /logout )
put ( /admin/product/:id, /review, /admin/orders/:id, /me/update, /password/update, /admin/users/:id )
delete ( /admin/users/:id, /admin/orders/:id, /admin/product/:id, /reviews )
