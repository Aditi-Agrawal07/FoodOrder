import express, { Request, Response, NextFunction } from 'express'
import { VendorLogin, getVendorProfile, updateVendorProfile, 
         updateVendorService, AddFood, GetFoods, updateVendorCoverImage, 
         getOffers, addOffer, EditOffer } from '../controllers'
import { Authenticate } from '../Middlewares'
import multer from 'multer'

const router = express.Router()

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
       cb(null, new Date().toISOString()+'_'+file.originalname)
    }
})

const images = multer({ storage: imageStorage }).array('images', 10)

// ROUTER : Login the vendor
router.post("/login", VendorLogin)



router.use(Authenticate)

// ROUTER: Get the vendor profile
router.get("/profile", getVendorProfile)

// ROUTES: Upadte the vendor profile 
router.patch("/profile", updateVendorProfile)

// ROUTES: Update the vendor service
router.patch("/service", updateVendorService)

// ROUTES: Update the vendor cover Image
router.patch("/coverImage",images, updateVendorCoverImage)


// ROUTES: Add the food
router.post("/food", images, AddFood)

// ROUTES: Get the food
router.get("/foods", GetFoods)

// ROUTES: Add the offer 
router.get("/offers", getOffers),
router.post("/offer", addOffer),
router.put("/offer/:id", EditOffer)




export { router as vendorRoute }