import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CustomerPayload, VendorPayload } from '../dto'
// import { APP_SECRET } from '../config'
import { AuthPayload } from '../dto/Auth.dto'
import { Request } from 'express'

export const GenerateSalt = async()=>{
    return await bcrypt.genSalt()

}

export const GeneratePassword = async(password: string, salt: string)=>{
    return await  bcrypt.hash(password,salt)
}

export const ValidatePassword = async(enteredPassword: string,savedPassword: string,salt: string)=>{

    return await GeneratePassword(enteredPassword, salt) === savedPassword
}

export const GenerateSignature = (payload: AuthPayload)=>{

    return jwt.sign(payload, process.env.APP_SECRET, {expiresIn: '1d'})   

}

export const validateSignature = async(req: Request)=>{

    const signature = req.get('Authorization')

    console.log(signature)

    if(signature){

        try{
            console.log(signature.split(' ')[1])
            const payload = await jwt.verify(signature.split(' ')[1], process.env.APP_SECRET) as AuthPayload

            console.log(payload)

            req.user = payload
            return true
        }catch(err){
return false
        }

        
    }
    return false


}