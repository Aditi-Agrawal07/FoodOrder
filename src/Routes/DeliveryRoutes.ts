import express, { Request, Response, NextFunction } from "express";
import { Authenticate } from "../Middlewares";
import { EditDeliveryUserProfile, GetDeliveryUserProfile, DeliveryUserSignup, DeliveryUserLogin, UpdateDeliverUserStatus } from "../controllers";

const router  = express.Router()

// Route: Signup or Create Customer
router.post("/signup", DeliveryUserSignup)

// Route: Login
router.post("/login", DeliveryUserLogin)


//  authentication
router.use(Authenticate)

// Route: Change Status
router.put('/change-status', UpdateDeliverUserStatus)
// Route: Get the Profile
router.get("/profile", GetDeliveryUserProfile)

// Route: Update the profile
router.patch("/profile", EditDeliveryUserProfile)







export {router as DeliveryRoute}