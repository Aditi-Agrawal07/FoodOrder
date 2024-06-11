import mongoose, { Schema, Document, Model, mongo } from 'mongoose'
import { OrderDoc } from './Order';

interface DeliveryUserDoc extends Document {
    _id: string,
    email: string,
    password: string,
    salt: string,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    lat: number,
    lng: number,
    isAvailable: boolean,
    verified:boolean,
    pincode:string
}

// Schema for Vendor
const DeliveryUserSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
        // required: true
    },
    pincode: {
        type:String
    },
    phone: {
        type: String,
        required: true
    },
    verified: {
        type:Boolean
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isAvailable: {
        type:Boolean
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt

        }

    },
    timestamps: true
})

// Model for Schema
const DeliveryUser = mongoose.model<DeliveryUserDoc>('deliveryUser', DeliveryUserSchema)

export { DeliveryUser } 