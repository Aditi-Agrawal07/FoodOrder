# Order Food Delivery Project

## Overview

This project is a backend system for an online food delivery service built with Node.js and Express. It allows users to order food from various restaurants, manage their shopping cart, and handle payments. The system uses MongoDB as the database to store and manage data.

## Features

- **User Authentication**: Register and log in users securely.
- **Restaurant Management**: View and choose from a list of available restaurants.
- **Food Ordering**: Browse restaurant menus and place orders.
- **Shopping Cart**: Add and remove items from the shopping cart.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/order-food-delivery.git
   cd order-food-delivery
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
    MONGO_URI=mongodb+srv://07aditiagrawal:knfto4Ts2fx2ZxJf@cluster1.b5gzxgq.mongodb.net/Food_Order?retryWrites=true&w=majority
    APP_SECRET=OUR_API_SECRET
    PORT=8080
    ACCOUNTID=ACd29db596f6e550cb53e9ed09ffb714d0
    AUTHTOKEN=6195ecb8002c1d557d0fe6b709c5d054
   ```

4. **Run the server**:
   ```sh
   npm start
   ```

## Admin
- **GET /admin/vendors**: Get all the vendors.
- **GET /admin/vendor/:id :  Get a vendor By Id
- **GET /admin/transactions:  Get All the transactions
- **GET /admin/transactions/:id : Get a single transaction by its id
- **PUT /admin//delivery/verify:  Verify Delivery User
- **GET /admin//delivery/users: Get Delivery User

### Customer

- **GET /customer/signup**: Signup or Create Customer.
- **GET /customer/login: Login Customer.
- **PATCH /customer/verify: Verify Customer.
- **GET /customer/otp: Requesting for OTP.
- **GET /customer/profile: Get the profile of a customer.
- **PATCH /customer/profile: Edit the customer profile.
- **POST /customer/create-order: Create the order or placing the order.
- **GET /customer/orders: Get the all the order of that customer.
- **GET /customer/order/:id : Get a order of that customer.
- **POST /customer/cart: Get the cart products of that customer.
- **GET /customer/offer/verify/:id : Apply the offer
- **POSt /customer/create-payment: Create a payment

### Vendors

- **POST /vendor/login**: Login the vendor.
- **GET /vendor/profile: Get the profile of vendor.
- **PATCH /vendor/profile: Update the vendor profile.
- **PATCH /vendor/service: Update the vendor service.
- **PATCH /vendor/coverImage: Update the vendor cover Image.
- **POST /vendor/food: Add the food By the vendor.
- **GET /vendor/foods: Get the food added by that vendor.
- **POST /vendor/offer: Add the offer By the vendor.
- **GET /vendor/offers: Get the offer that are added by that vendor.
- **PUT /vendor/offer/:id : Update that offer 

### Delivery Agent

- **POST /delivery/signup: Signup the delivery user.
- **POSt /delivery/login: Login the delivery user.
- **PUT /delivery/change-status: Change the status of delivery user
- **GET /delivery/profile: Get the profile of delivery user.
- **PATCH /delivery/profile: Update the profile of delivery user.

### Shopping 

- **GET /:pincode: Get the Available foods on that pincode.
- **GET /top-restruant/:pincode : Get the top restaurant of that pincode.
- **GET /foods-in-30-minutes/:pincode : Get the food that are ready in 30 minutes in that pincode.
- **GET /search/:pincode : Search the food of that pincode.
- **GET /offers/:pincode : Get the offers available on that pincode.
- **GET /restaruant/:id : Get the restaurant By id

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to add new features, improve documentation, or fix bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact me directly.

---

Happy coding!
