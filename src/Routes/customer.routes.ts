import express, { Request, Response, NextFunction } from "express";
import { CustomerLogin, CustomerSignup, CustomerVerify, RequestOtp, GetCustomerProfile,EditCustomerProfile, CreateOrder, getOrders, getOrderById, VerifyOffer, CreatePayment, AddToCart } from "../controllers/index";
import { Authenticate } from "../Middlewares";

const router  = express.Router()

// Route: Signup or Create Customer
router.post("/signup", CustomerSignup)

// Route: Login
router.post("/login", CustomerLogin)


//  authentication

router.use(Authenticate)
// Route: Verify Customer Account
router.patch("/verify", CustomerVerify)

// Route: OTP / Registring OTP
router.get("/otp", RequestOtp)

// Route: Get the Profile
router.get("/profile", GetCustomerProfile)

// Route: Update the profile
router.patch("/profile", EditCustomerProfile)


// Cart 
// Order
router.post("/create-order", CreateOrder)

router.get("/orders",getOrders)

router.get("/order/:id", getOrderById)

// Apply Offers
router.post('/cart', AddToCart)
router.get('/cart')
router.delete('/cart')

// Apply Offers
router.get('/offer/verify/:id', VerifyOffer)

// Payment
router.post('/create-payment', CreatePayment)

export {router as CustomerRoute}