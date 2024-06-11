import mongoose, {Schema, Document} from 'mongoose'


// Create Document
export interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description:string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating:number;
    images: [string]
}

// Create Schema for food
const foodSchema = new Schema({

    vendorId: {
        type:String
    },
    name: {
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category: {
        type:String
    },
    foodType: {
        type:String,
        required: true
    },
    readyTime: {
        type:Number
    },
    price: {
        type:Number,
        required: true
    },
    rating:{
        type: Number
    },
    images:{
        type:[String]
    }

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

const Food = mongoose.model<FoodDoc>("food", foodSchema)
export {Food}