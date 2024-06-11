import express, { Request, Response, NextFunction } from 'express'

import { plainToClass } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { CreateCustomerInputs, UserLoginInputs, OrderInputs, CartItem, EditCustomerProfileInputs, CreateDeliveryUserInputs } from '../dto/Customer.dto'
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, onRequestOtp } from '../utility'
import {DeliveryUser, Food, Offer, Order, Transaction, Vendor } from '../Models'

// CONTROLLER: Customer Sign Up
export const DeliveryUserSignup = async (req: Request, res: Response, next: NextFunction) => {

    const deliveryUserInput = plainToClass(CreateDeliveryUserInputs, req.body)

    const inputErrors = await validate(deliveryUserInput, { validationError: { target: true } })



    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors)

    }

    const { email, phone, password, address, firstName, lastName, pincode } = deliveryUserInput

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)

    const existingDeliveryUser = await DeliveryUser.findOne({ email: email })

    if (existingDeliveryUser) {
        return res.status(409).send({ message: "A Delivery user that email will exist" })
    }

    const result = await DeliveryUser.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        address: address,
        verified: false,
        lat: 0,
        lng: 0,
        pincode: pincode,
        isAvailable: false
    })

    if (result) {

        const signature = GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        })

        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email })
    }

    return res.status(400).json({ message: "Error with signup" })


}

// CONTROLLER: Login Customer
export const DeliveryUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    const LoginInputs = plainToClass(UserLoginInputs, req.body)

    const loginErrors = await validate(LoginInputs, { validationError: { target: false } })

    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors)

    }

    const { email, password } = LoginInputs

    const deliveryUser = await DeliveryUser.findOne({ email: email })

    if (deliveryUser) {

        const validation = await ValidatePassword(password, deliveryUser.password, deliveryUser.salt)

        if (validation) {

            const signature = GenerateSignature({
                _id: deliveryUser._id,
                verified: deliveryUser.verified,
                email: deliveryUser.email

            })

            return res.status(201).json({
                signature: signature,
                verified: deliveryUser.verified,
                email: deliveryUser.email
            })
        }
    }
    return res.status(404).json({ message: "Login Error" })

}

export const GetDeliveryUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    const deliveryUser = req.user

    if (deliveryUser) {

        const profile = await DeliveryUser.findById(deliveryUser._id)

        if (profile) {
            return res.status(200).json(profile)
        }
    }
    return res.status(400).json({ message: "Error with Getting user profile" })

}

export const EditDeliveryUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    const deliveryUser = req.user

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body)

    const profileErrors = await validate(profileInputs, { validationError: { target: false } })

    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors)
    }

    const { firstName, lastName, address } = profileInputs

    if (deliveryUser) {

        const profile = await DeliveryUser.findById(deliveryUser?._id)


        if (profile) {
            profile.firstName = firstName,
                profile.lastName = lastName
            profile.address = address

            const result = await profile.save();


            return res.status(200).json(result)

        }

    }
    return res.status(400).json({ message: "Error with Upating User profile" })


}

export const UpdateDeliverUserStatus = async (req: Request, res: Response, next: NextFunction) => {


    const deliveryUser = req.user

    if(deliveryUser){
        const {lat, lng} = req.body

        const profile = await DeliveryUser.findById(deliveryUser._id)


    
        if(profile){
            if(lat & lng){
                profile.lat = lat;
                profile.lng = lng
            }
            profile.isAvailable = !(profile.isAvailable)


            const result = await profile.save();

            return res.status(200).json(result)
        }
    }
    return res.status(400).json({message: "Error with fetching Profile"})
}

