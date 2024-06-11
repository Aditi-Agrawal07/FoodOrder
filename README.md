# Order Food Delivery Project

## Overview

This project is a backend system for an online food delivery service built with Node.js and Express. It allows users to order food from various restaurants, manage their shopping cart, and handle payments. The system uses MongoDB as the database to store and manage data.

## Features

- **User Authentication**: Register and log in users securely.
- **Restaurant Management**: View and choose from a list of available restaurants.
- **Food Ordering**: Browse restaurant menus and place orders.
- **Shopping Cart**: Add and remove items from the shopping cart.
- **Payment Processing**: Handle secure payments for orders.

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

## API Endpoints

### Authentication

- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in an existing user.

### Restaurants

- **GET /api/restaurants**: Get a list of all restaurants.
- **GET /api/restaurants/:id**: Get details of a specific restaurant.

### Orders

- **POST /api/orders**: Place a new order.
- **GET /api/orders/:id**: Get details of a specific order.

### Cart

- **GET /api/cart**: Get the current user's cart.
- **POST /api/cart**: Add an item to the cart.
- **DELETE /api/cart/:itemId**: Remove an item from the cart.

### Payment

- **POST /api/payment**: Process payment for an order.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to add new features, improve documentation, or fix bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact me directly.

---

Happy coding!
