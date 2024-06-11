import express, {Request, Response, NextFunction} from 'express'
import { GetFoodAvailability, GetFoodIn30Min, GetTopRestaurants, RestaurantsById, SearchFoods, getAvailableOffers } from '../controllers/index'

const router = express.Router()

// ROUTES: Food Availability
router.get("/:pincode", GetFoodAvailability)

// ROUTES: Top Restaruants
router.get('/top-restraunt/:pincode', GetTopRestaurants)

// ROUTES: Foods available in 30 minutes
router.get('/foods-in-30-minutes/:pincode', GetFoodIn30Min)

// ROUTES: Search Foods
router.get("/search/:pincode", SearchFoods)

// ROUTES: Find Offers
router.get("/offers/:pincode", getAvailableOffers)

// ROUTES: Find Restaruants By Id
router.get("/restaurant/:id", RestaurantsById)


export {router as shoppingRoutes}