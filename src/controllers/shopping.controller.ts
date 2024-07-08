import { NextFunction, Request, Response } from "express";
import { Offer, Vendor } from "../Models";
import { FoodDoc } from "../Models/food";

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    console.log("called")
    const pincode = req.params.pincode
   

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .populate("foods")

    if (result.length > 0) {
        console.log(result)
        return res.status(200).json(result)
    }
    return res.status(400).json({message:"Data not Found"})




}


export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
       .limit(1)

    if (result.length > 0) {
        return res.status(200).json(result)
    }
    return res.status(400).json({message:"Data not Found"})


}
export const GetFoodIn30Min = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true })
       .populate('foods')

    if (result.length > 0) {

        let foodResults: any = []

        result.map((vendor)=>{
            const foods = vendor.foods as [FoodDoc]

            foodResults.push(...foods.filter((food)=> food.readyTime <= 30))


        })
        return res.status(200).json(foodResults)
    }
    return res.status(400).json({message:"Data not Found"})
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true })
       .populate('foods')

    if (result.length > 0) {
        let foodResults: any = []

        result.map(item => foodResults.push(...item.foods))
        
        return res.status(200).json(foodResults)
    }
    return res.status(400).json({message:"Data not Found"})


}

export const RestaurantsById = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id 

    const result = await Vendor.findById(id).populate('foods')

    if(result){
        return res.status(200).json(result)
    }

    return res.status(400).json({message:"Data not Found"})

}

export const getAvailableOffers = async (req:Request, res: Response, next:NextFunction)=> {

    const pincode = req.params.pincode

    const offers = await Offer.find({pinCode: pincode, isActive: true})

    if(offers){
        return res.status(200).json(offers)
    }

    return res.status(400).json({message: "Offer not Found"})
    
}