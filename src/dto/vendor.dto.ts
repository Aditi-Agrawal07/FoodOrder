export interface CreateVendorInput{
    name: string,
    ownerName: string,
    foodType: string,
    pinCode: string,
    address: string,
    phone: string,
    email: string,
    password: string
}

export interface EditVendorInput{
    name: string,
    address: string,
    phone: string,
    foodTypes: [string]

}



export interface vendorLoginInput{
    email: string,
    password: string
}

export interface VendorPayload{
     [x: string]: any
     _id: string,
     email: string,
     name: string,
     foodTypes:string[] 
}

export interface createOfferInput{
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