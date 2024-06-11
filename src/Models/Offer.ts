import mongoose, { Schema, Document } from 'mongoose'


// Create Document
export interface OfferDoc extends Document {

    offerType: string;//VENDOR // GENERIC
    vendors: [any];
    title: string,
    description: string,
    minValue: number,
    offerAmount: number,
    startValidity: Date,
    endValidity: Date,
    promoCode: string,
    promoType: string,
    bank: [any],
    bins: [any],
    pinCode: string,
    isActive: boolean


}

// Create Schema for food
const offerSchema = new Schema({

    offerType: { type: String, require: true },//VENDOR // GENERIC
    vendors: [{
        type: Schema.Types.ObjectId,
        ref: 'vendor'
    }],
    title: { type: String, require: true },
    description: { type: String, require: true },
    minValue: { type: Number, require: true },
    offerAmount: { type: Number, require: true },
    startValidity: Date,
    endValidity: Date,
    promoCode: { type: String, require: true },
    promoType: { type: String, require: true },
    bank: [{
        type: String
    }],
    bins: [{
        type: Number
    }],
    pinCode: { type: String, require: true },
    isActive: Boolean



},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v

            }
        },
        timestamps: true
    })

// Create Model for food

const Offer = mongoose.model<OfferDoc>("offer", offerSchema)
export { Offer }