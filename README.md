# onlineshop-api

An API for online store

## Features:

- Authentication
- Products listing
- Order placements

## Technology Stack:

- Node js
- Express Js
- MongoDB
- JWT

## Default urls:

- Login User : <br/>
  localhost:5000/api/v1/auth/login
- Register User : <br/>
  localhost:5000/api/v1/user/register
- Get Logged in User : <br/>
  localhost:5000/api/v1/auth/me/
- Update User Details : <br/>
  localhost:5000/api/v1/auth/updateprofile
- Update Password : <br/>
  localhost:5000/api/v1/auth/updatepassword
- Forgot Password : <br/>
  localhost:5000/api/v1/auth/forgotpassword
- Reset Password : <br/>
  localhost:5000/api/v1/auth/resetpassword/:resetToken

- Get All Products : <br/>
  localhost:5000/api/v1/products
- Get Single Product : <br/>
  localhost:5000/api/v1/products/:id
- Create Product : <br/>
  localhost:5000/api/v1/products
- Update Product : <br/>
  localhost:5000/api/v1/products/:id
- Delete Product : <br/>
  localhost:5000/api/v1/products/:id

- Get User Cart : <br/>
  localhost:5000/api/v1/cart
- Add To Cart : <br/>
  localhost:5000/api/v1/cart
- Update User Cart : <br/>
  localhost:5000/api/v1/cart/:id
- Delete Cart : <br/>
  localhost:5000/api/v1/cart/:id

- Get All Users :<br/>
  localhost:5000/api/v1/users
- Get Single User :<br/>
  localhost:5000/api/v1/users/:id
- Create User :<br/>
  localhost:5000/api/v1/users
- Update User :<br/>
  localhost:5000/api/v1/users/:id
- Delete User :<br/>
  localhost:5000/api/v1/users/:id

- Get All Orders :<br/>
  localhost:5000/api/v1/orders
- Add Order :<br/>
  localhost:5000/api/v1/orders
- Update Order :<br/>
  localhost:5000/api/v1/orders
- Delete Order :<br/>
  localhost:5000/api/v1/orders/:id

## Usage

"/.env" update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run server

```

- Version: 1.0.0
- License: MIT
- Author: Said Mounaim
