import mongoose, {Schema, Document} from 'mongoose'


// Create Document
export interface OrderDoc extends Document {
    _id: string,
    orderId:string,
    vendorId: string,
    items: [any],
    totalAmount: number,
    paidAmount:  number,
    orderDate: Date,
    orderStatus: string,
    remarks: string,
    deliveryId: string,
    readyTime: string
}

// Create Schema for food
const orderSchema = new Schema({
    orderId:{type: String, required: true},
    vendorId: {type: String, require: true},
    items: [
        {
            food: {type: Schema.Types.ObjectId, ref: "food", required: true},
            unit: {type: Number, required: true}
        }
    ],
    totalAmount: {
        type: Number,required: true
    },
    paidAmount: {
        type: Number,required: true
    },
    orderDate: {type: Date},
    
    orderStatus: {type:String},
    remarks: {type:String},
    deliveryId: {type:String},
    readyTime: {type:String}

},
{
    toJSON:{
        transform(doc,ret){
delete ret.__v,
delete ret.createdAt,
delete ret.updatedAt
        }
    },
    timestamps: true
})

// Create Model for food

const Order = mongoose.model<OrderDoc>("order", orderSchema)
export {Order}