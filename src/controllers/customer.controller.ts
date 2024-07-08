import express, { Request, Response, NextFunction } from 'express'

import { plainToClass } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { CreateCustomerInputs, UserLoginInputs, OrderInputs, CartItem, EditCustomerProfileInputs } from '../dto/Customer.dto'
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, onRequestOtp } from '../utility'
import { Customer, DeliveryUser, Food, Offer, Order, Transaction, Vendor } from '../Models'
import { sendCodeMail } from '../utility/nodeMailer'

// CONTROLLER: Customer Sign Up
const currentCode = {};
export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInputs, req.body)

    const inputErrors = await validate(customerInputs, { validationError: { target: true } })



    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors)

    }

    const { name, email, password } = customerInputs

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)

    const { otp, expiry } = GenerateOtp()




    const existingCustomer = await Customer.findOne({ email: email })
    console.log(existingCustomer)

    if (existingCustomer) {
        return res.status(409).send({ message: "A user that email will exist" })
    }

    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: name,
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
        orders: []
    })

    if (result) {


        // Send otp functionality do later
        // await onRequestOtp(otp, phone)

        const signature = GenerateSignature({
            email: result.email,
            verified: result.verified,
            _id: result._id
        })

        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email })
    }

    return res.status(400).json({ message: "Error with signup" })


}

// CONTROLLER: Login Customer
export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const LoginInputs = plainToClass(UserLoginInputs, req.body)

    const loginErrors = await validate(LoginInputs, { validationError: { target: false } })

    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors)

    }

    const { email, password } = LoginInputs

    const customer = await Customer.findOne({ email: email })
     


    if (customer) {
         console.log("Customer",customer)
        console.log("Password",password)
        console.log("Customer Password",customer.password)
        console.log("Customer Salt",customer.salt)
        const validation = await ValidatePassword(password, customer.password, customer.salt)

        
        if (validation) {

            const signature = GenerateSignature({
                _id: customer._id,
                verified: customer.verified,
                email: customer.email

            })

            return res.status(200).json({
                signature: signature,
                verified: customer.verified,
                email: customer.email
            })
        }
        return res.status(400).json({ message: "Incorrect Password"})
    }
   
return res.status(404).json({message: "User not exist"})
}
export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {

    const { otp } = req.body
    const customer = req.user

    if (customer) {
        const profile = await Customer.findById(customer._id)

        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true

                const updatedCustomerResponse = await profile.save();


                const signature = GenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                })
                return res.status(201).json({ signature: signature, verified: updatedCustomerResponse.verified, email: updatedCustomerResponse.email })
            }
        }

    }
    return res.status(400).json({ message: " Error with OTP Validation" })

}

export const sendCode = async(req: Request, res: Response, next: NextFunction)=>{


    const code = Math.floor(1000 + Math.random() * 9000).toString(); 
    const {email} = req.body;
  
    currentCode[email] = code

    
    const customer = await Customer.findOne({email: email})
    
    if(!customer){
        return res.status(404).json({
            hasError: true,
            message: "Email not found"
        })
        
    }
   

    sendCodeMail(email, code);

    return res.status(200).json({
        hasError: false,
        message: "Code sent successfully"
    })
    // 4-digit code



}

export const verifyCode = async(req: Request, res: Response, next: NextFunction)=>{
    const {code, email} = req.body
  
    const customer = await Customer.findOne({email: email})

     console.log(customer)

    if(!customer){
        return res.status(400).json({
            hasError: true,
            message: "Something went wrong"
        })
    }

    console.log(currentCode[email])
    console.log(code)

    if(currentCode[email] == code){
    

        delete currentCode[email]

        const signature = GenerateSignature({
            _id: customer._id,
            email: customer.email,
            verified: true 

        })

        return res.status(200).json({
            hasError: false,
            signature
        })

    }

   


    
}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    if (customer) {
        const profile = await Customer.findById(customer._id)

        if (profile) {
            const { otp, expiry } = GenerateOtp()

            profile.otp = otp,
                profile.otp_expiry = expiry

            await profile.save()
            // await onRequestOtp(otp, profile.phone)

            return res.status(200).json({ message: "OTP sent to your registered phone number" })
        }


    }
    return res.status(400).json({ message: "Error with sent otp" })
}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    if (customer) {

        const profile = await Customer.findById(customer._id)

        if (profile) {
            return res.status(200).json(profile)
        }
    }
}

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body)

    const profileErrors = await validate(profileInputs, { validationError: { target: false } })

    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors)
    }

    const { firstName, lastName, address } = profileInputs

    if (customer) {

        const profile = await Customer.findById(customer?._id)


        if (profile) {
            profile.firstName = firstName,
                profile.lastName = lastName
            profile.address = address

            const result = await profile.save();


            return res.status(200).json(result)

        }

    }

}

export const AddToCart = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    if (customer) {
        const profile = await Customer.findById(customer._id);

        let cartItems = Array()

        const { _id, unit } = <CartItem>req.body

        const food = await Food.findById(_id)



        if (food) {

            if (profile) {
                cartItems = profile.cart


                if (cartItems.length > 0) {

                    let existFoodItems = cartItems.filter((item) => item.food._id.toString() === _id)

                    if (existFoodItems.length > 0) {
                        const index = cartItems.indexOf(existFoodItems[0])

                        if (unit > 0) {
                            cartItems[index] = { food, unit }
                        } else {
                            cartItems.splice(index, 1)
                        }
                    }
                    else {
                        cartItems.push({ food, unit })
                    }
                }
                else {
                    cartItems.push({ food, unit })
                }

                if (cartItems) {
                    profile.cart = cartItems as any
                    const cartResult = await profile.save()



                    return res.status(200).json(cartResult.cart)
                }

            }
        }
    }
}

const assignOrderForDelivery = async (orderId: string, vendorId: string) => {
    // find the vendor 
    const vendor = await Vendor.findById(vendorId)

    if (vendor) {
        const areaCode = vendor.pinCode
        const vendorLat = vendor.lat
        const vendorLng = vendor.lng


        const deliveryPerson = await DeliveryUser.find({ pincode: areaCode, verified: true, isAvailable: true })

        if (deliveryPerson) {


            const currentOrder = await Order.findById(orderId)

            if (currentOrder) {
                currentOrder.deliveryId = deliveryPerson[0]._id;
                await currentOrder.save();
            }
        }


    }
}
const validateTransaction = async (txnId: string) => {

    const currentTransaction = await Transaction.findById(txnId);

    if (currentTransaction) {
        if (currentTransaction.status.toLowerCase() !== "failed") {
            return { status: true, currentTransaction }
        }
    }

    return { status: false, currentTransaction }
}

export const CreateOrder = async (req: Request, res: Response, next: NextFunction) => {

    // grab current login user
    const customer = req.user

    const { txnId, amount, items } = <OrderInputs>req.body

    if (customer) {

        const { status, currentTransaction } = await validateTransaction(txnId)

        if (!status) {
            return res.status(404).json({ message: "Error with Create order" })
        }

        const profile = await Customer.findById(customer._id)

        const orderId = `${Math.floor(Math.random() * 89999 + 1000)}`



        let cartItems = Array();

        let netAmount = 0.0

        let vendorId

        const foods = await Food.find().where('_id').in(items.map(item => item._id)).exec()

        // console.log(foods)

        foods.map(food => {
            items.map(({ _id, unit }) => {

                console.log("food" + food)
                console.log("id", _id)
                if (food._id == _id) {


                    vendorId = food.vendorId;
                    netAmount += (food.price * unit);
                    // cartItems.push({ food._id, unit})
                }
            })
        })


        // Create order with Item description 
        if (cartItems) {
            const currentOrder = await Order.create({
                orderId: orderId,
                vendorId: vendorId,
                items: cartItems,
                totalAmount: netAmount,
                paidAmount: amount,
                orderDate: new Date(),
                orderStatus: 'Waiting',
                remarks: '',
                deliveryId: '',
                readyTime: 45
            })

            profile.cart = items
            profile.orders.push(currentOrder)

            currentTransaction.vendorId = vendorId
            currentTransaction.orderId = orderId;

            await currentTransaction.save()
            assignOrderForDelivery(currentOrder._id, vendorId)

            const profileResponse = await profile.save()





            return res.status(200).json(profileResponse)

        }

        // Finally update the order to user account
    }

    return res.status(400).json({ message: "Error with create order" })



}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    if (customer) {
        const profile = await Customer.findById(customer._id).populate("orders")

        return res.status(200).json(profile.orders)
    }


}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.id

    const order = await Order.findById(orderId).populate('items.food')

    return res.status(200).json(order)
}

export const VerifyOffer = async (req: Request, res: Response, next: NextFunction) => {

    const offerId = req.params.id
    const customer = req.user

    if (customer) {
        const appliedOffer = await Offer.findById(offerId)

        if (appliedOffer) {

            if (appliedOffer.promoType === "USER") {
                // only offer can apply once per user
            } else {
                if (appliedOffer.isActive) {
                    return res.status(200).json({ message: "Offer is valid", offer: appliedOffer })
                }
            }
        }
    }

    return res.status(400).json({ message: "Offer is not valid" })

}

export const CreatePayment = async (req: Request, res: Response, next: NextFunction) => {


    const customer = req.user

    const { amount, paymentMode, offerId } = req.body;

    let payableAmount = Number(amount)

    if (offerId) {

        const appliedOffer = await Offer.findById(offerId)

        if (appliedOffer) {
            if (appliedOffer.isActive) {
                payableAmount = (payableAmount - appliedOffer.offerAmount);
            }
        }
    }

    // Perform Payment gateway Charge Api Calls

    // Create record of transaction
    const transaction = await Transaction.create({
        customer: customer._id,
        vendorId: '',
        orderId: '',
        orderValue: payableAmount,
        offerUser: offerId || 'NA',
        status: 'open',
        paymentMode: paymentMode
    })

    return res.status(200).json(transaction)
}