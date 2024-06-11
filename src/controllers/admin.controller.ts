import { NextFunction,Request,Response } from "express";
import { CreateVendorInput } from "../dto";
import { DeliveryUser, Transaction, Vendor } from "../Models";
import { GeneratePassword, GenerateSalt } from "../utility";

// CONTROLLER: Find the vendor
export const findVendor = async(id: string | undefined, email? : string)=>{

    if(email){
        return await Vendor.findOne({email: email})
    }
    else{
        return await Vendor.findById(id)
    }

}

// CONTROLLER: Save the Vendor
export const CreateVendor = async(req: Request, res: Response, next: NextFunction)=>{

    const {name, address, pinCode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body

    const existingVendor = await findVendor('',email)

    if(existingVendor){
        return res.json({"message" : "A vendor is exist"})
    }

    // Generate the salt 
    const salt = await GenerateSalt()
    const userPassword: string = await GeneratePassword(password, salt)

    const createdVendor = await Vendor.create({
        name: name,
        address: address,
        pinCode: pinCode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt:salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImage: [],
        foods: [],
        lat: 0,
        lang:0
    })
    return res.json(createdVendor)
}

// CONTROLLER: Get all the vendor
export const getVendors = async(req: Request, res: Response, next: NextFunction)=>{

    const vendor = await Vendor.find()

    if(vendor){
        return res.json(vendor)
    }

    return res.json({"message": "No Data Found"})

}
export const getVendorById = async(req: Request, res: Response, next: NextFunction)=>{

    const vendorId = req.params.id

    const vendor = await findVendor(vendorId)

    if(vendor){
        return res.json(vendor)
    }

    return res.json({"message": "No Data Found"})



}

export const getTransaction = async(req: Request, res: Response, next: NextFunction)=>{

   const transaction = await Transaction.find();

   if(transaction){
    return res.status(200).json(transaction)
   }

   return res.json({message: "Transaction not available"})



}

export const getTransactionById = async(req: Request, res: Response, next: NextFunction)=>{

    const id  = req.params.id;

    const transaction = await Transaction.findById(id);
 
    if(transaction){
     return res.status(200).json(transaction)
    }
 
    return res.json({message: "Transaction not available"})
 
 
 
 }

 export const VerifyDeliveryUser = async(req:Request, res:Response, next: NextFunction)=>{

    const {_id, status} = req.body

    if(_id){
        const profile = await DeliveryUser.findById(_id)

        if(profile){

            profile.verified = status

            const result = await profile.save();

            return res.status(200).json(result);


        }
    }

    return res.status(400).json({"message": "Unable to verify Delivery User"}


    )
 }

 export const GetDeliveryUsers = async(req:Request, res:Response, next: NextFunction)=>{

    

   
        const deliveryUser = await DeliveryUser.find()

        if(deliveryUser){

           return res.status(200).json(deliveryUser)
        }
   

    return res.status(400).json({"message": "Unable to Get Delivery Users"}

    
    )
 }