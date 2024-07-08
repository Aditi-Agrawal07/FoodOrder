
// Email


// Notification

// OTP
export const GenerateOtp = ()=>{

    const otp =  Math.floor( 100000 + Math.random() * 900000)

    let expiry = new Date()

    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return {otp, expiry}

}

export const onRequestOtp = async(otp:number, toPhoneNumber: string)=>{

    const accountsId = process.env.ACCOUNTID
   const authToken = process.env.AUTHTOKEN

   const client = require('twilio')(accountsId, authToken)

   const response = await client.messages.create({
    body:`Your OTP number is ${otp}`,
    from : '+16267689388',
    to: `+91${toPhoneNumber}`
   })

   return response
}

// Payment notification or emails