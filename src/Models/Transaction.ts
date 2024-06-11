import mongoose, {Schema, Document} from 'mongoose'


// Create Document
export interface TransactionDoc extends Document {

    customer: string;
    vendorId: string;
    orderId: string,
    orderValue: number,
    offerUsed: string,
    status: string,
    paymentMode: string;
    paymentResponse: string
  
}

// Create Schema for food
const transactionSchema = new Schema({
    customer: String,
    vendorId: String,
    orderId: String,
    orderValue: Number,
    offerUsed: String,
    status: String,
    paymentMode: String,
    paymentResponse: String
  
  

},
{
    toJSON:{
        transform(doc,ret){
delete ret.__v

        }
    },
    timestamps: true
})

// Create Model for food

const Transaction = mongoose.model<TransactionDoc>("transaction", transactionSchema)
export {Transaction}