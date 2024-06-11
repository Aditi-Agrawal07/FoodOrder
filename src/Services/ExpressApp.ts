import express,{ Application } from 'express'
import path from 'path'


// Import Routes
import {AdminRoutes, vendorRoute, shoppingRoutes, CustomerRoute} from '../Routes'
import { DeliveryRoute } from '../Routes/DeliveryRoutes'

export default async (app:Application)=>{

app.use(express.json())
app.use("/images",express.static(path.join(__dirname,'images')))

app.use("/admin", AdminRoutes)
app.use("/vendor", vendorRoute)
app.use("/customer",CustomerRoute)
app.use("/delivery", DeliveryRoute)
app.use(shoppingRoutes)

return app

}





