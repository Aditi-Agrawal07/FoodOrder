import express, {Request, Response, NextFunction} from 'express'
import { CreateVendor, GetDeliveryUsers, VerifyDeliveryUser, getTransaction, getTransactionById, getVendorById, getVendors } from '../controllers/index'

const router = express.Router()

// ROUTES: Create a vendor
router.post("/vendor", CreateVendor)

// ROUTES: Get All the vendors
router.get("/vendors", getVendors)

// ROUTES: Get Vendor By Id
router.get("/vendor/:id",getVendorById)

// ROUTES: Get transactions
router.get("/transactions", getTransaction)

// ROUTES: Get Transactions By Id
router.get("/transactions/:id", getTransactionById)

// ROUTES: Verify Delivery User
router.put("/delivery/verify", VerifyDeliveryUser )

// ROUTES: Get the Delivery User
router.get("/delivery/users", GetDeliveryUsers)
export {router as AdminRoutes}