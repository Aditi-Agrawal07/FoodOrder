import { NextFunction,Response,Request } from "express";
import { AuthPayload } from "../dto";
import { validateSignature } from "../utility";

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload
        }
    }
}

export const Authenticate = async(req: Request,res: Response, next: NextFunction)=>{
    const validate = await validateSignature(req)
    console.log(validate)

    if(validate){
     
next()
    }else{
        // console.log("called")
        return res.json({"message": "User not Active"})
    }
} 