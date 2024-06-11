import { Request, Response, NextFunction } from 'express'
import { EditVendorInput, vendorLoginInput, CreateFoodInputs, createOfferInput } from '../dto/index'
import { findVendor } from './admin.controller'
import { GenerateSignature, ValidatePassword } from '../utility'
import { sign } from 'jsonwebtoken'
import { Food } from '../Models/food'
import { Offer } from '../Models'



// CONTROLLER: Login the vendor
export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <vendorLoginInput>req.body

    const existingVendor = await findVendor('', email)

    if (existingVendor) {




        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt)

        if (validation) {

        
            const signature = GenerateSignature({
                _id: existingVendor._id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })

            return res.json(signature)
        }
        else {
            return res.json({ "message": "Password are not valid" })

        }

    }
    return res.json({ "message": "Login Creditianls are valid" })

}

// CONTROLLER: Get the vendor profile
export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (user) {
        const existingVendor = await findVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor Information Not Found" })

}

// CONTROLLER: Update the profile
export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, phone, foodTypes } = <EditVendorInput>req.body

    const user = req.user

    if (user) {
        const existingVendor = await findVendor(user._id)

        if (existingVendor) {
            existingVendor.name = name
            existingVendor.address = address
            existingVendor.phone = phone
            existingVendor.foodType = foodTypes

            const saveResult = await existingVendor.save()

            return res.json(saveResult)
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor Information Not Found" })

}

// CONTROLLER: Update the profile
export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, phone, foodTypes } = <EditVendorInput>req.body
    const user = req.user

    if (user) {


        // Find the vendor that is logged in 
        const vendor = await findVendor(user._id)

        if (vendor) {

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)
            vendor.coverImage.push(...images)



            const result = await vendor.save();

            return res.json(result)
        }

    }


}
// CONTROLLER: Update the vendor service
export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    const {lat, lng} = req.body

    if (user) {
        const existingVendor = await findVendor(user._id)

        if (existingVendor) {

            existingVendor.serviceAvailable = !existingVendor.serviceAvailable

            if(lat && lng){
                existingVendor.lat = lat;
                existingVendor.lng = lng;
            }

            const saveResult = existingVendor.save()
            return res.json(saveResult)
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor Information Not Found" })


}

// CONTROLLER: Add the food
export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (user) {

        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body

        // Find the vendor that is logged in 
        const vendor = await findVendor(user._id)

        if (vendor) {

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)
            const createFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: images,
                readyTime: readyTime,
                price: price,
                rating: 0
            })

            vendor.foods.push(createFood)

            const result = await vendor.save();

            return res.json(result)
        }

    }

    return res.json({ "message": "Something wrong with add foods" })


}

// CONTROLLER: Get the food
export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (user) {

        const foods = await Food.find({ vendorId: user._id })

        if (foods) {
            return res.json(foods)
        }

    }

    return res.json({ "message": "Foods information are not found" })


}

// CONTROLLER: Get offers
export const getOffers = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user 

    if(user){

        let currentOffer = Array();
    const offers = await Offer.find().populate('vendors')

    if(offers){
      

        offers.map(item=>{
            if(item.vendors){
                item.vendors.map(vendor=>{
                    if(vendor._id.toString() === user._id){
                        currentOffer.push(item);
                    }
                })
            }
            if(item.offerType === "GENERIC"){
                currentOffer.push(item)
            }
        })


    }
    return res.status(200).json(currentOffer)

   
    }

    return res.json({"message":"Offer not available"})


}

// CONTROLLER: Add offers
export const addOffer = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode,
            promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <createOfferInput>req.body
    

    const vendor = await findVendor(user._id)

    if (vendor) {

        const offer = await Offer.create({
            title,
             promoCode,
            description,
             promoType,
            offerType, 
            startValidity,
            offerAmount, 
            endValidity,
            pinCode,
             bank,
            bins, 
            minValue, 
            isActive,
            vendors: [vendor]

        })

        return res.status(200).json(offer)

    }
    }

    res.json({"message":"Unable to add Offer"})

}

// CONTROLLER: Update offers
export const EditOffer = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const offerId = req.params.id

    if (user) {
        const { title, description, offerType, offerAmount, pinCode, promoCode,
            promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <createOfferInput>req.body
    
            const currentOffer = await Offer.findById(offerId)



   if(currentOffer){
    const vendor = await findVendor(user._id)

    if (vendor) {

        currentOffer.title = title,
        currentOffer.description = description,
        currentOffer.offerType = offerType,
        currentOffer.offerAmount = offerAmount,
        currentOffer.pinCode = pinCode,
        currentOffer.promoCode = promoCode,
        currentOffer.promoType = promoType,
        currentOffer.startValidity = startValidity,
        currentOffer.endValidity = endValidity,
        currentOffer.bank = bank,
        currentOffer.bins = bins,
        currentOffer.minValue = minValue,
        currentOffer.isActive = isActive

        const result = await currentOffer.save()

        return res.status(200).json(result)

    }
    }
   }

    res.json({"message":"Unable to Edit Offer"})


}