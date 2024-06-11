import mongoose, {Schema, Document, Model, mongo} from 'mongoose'

interface vendorDoc extends Document{
    _id: string
    name: string,
    ownerName: string,
    foodType: [string],
    pinCode: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    salt: string,
    serviceAvailable: boolean,
    coverImage: [string],
    rating: number,
    foods: [any],
    lat: number,
    lng: number
}

// Schema for Vendor
const vendorSchema = new Schema({

    name: {
        type:String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    foodType: {
        type: [String]
    },
    pinCode: {
        type: String,
        require: true
    },
    address: {
        type: String,

    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    } ,
    salt: {
        type: String,
        require: true
    },
    serviceAvailable: {type: Boolean},
    coverImage: {
        type: [String]
    },
    rating: {
        type:Number
    },
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'food'
    }],
    lat:{type:Number},
    lng: {type:Number}

},{
    toJSON:{
        transform(doc,ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt

        }

    },
    timestamps:true
})

// Model for Schema
const Vendor = mongoose.model<vendorDoc>('vendor', vendorSchema)

export {Vendor} 