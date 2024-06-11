import mongoose from 'mongoose'


export default async()=>{
    console.log("call");
    
// Mongo DB connection
mongoose.connect(process.env.MONGO_URI)
.then(result =>{
   // console.log(result)
   console.log("Connected")
}).catch(err=>{
    console.log(err)
})
}
