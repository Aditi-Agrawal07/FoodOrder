import express from 'express'
import App from './Services/ExpressApp'
import dbConnection from './Services/Database'
import {PORT} from './config/index'
require('dotenv').config()

const StartServer = async()=>{
    const app = express()

    await dbConnection()

    await App(app)

    app.listen(process.env.PORT, ()=>{
        console.clear()
        console.log(`App is listening to the port ${process.env.PORT}`)
    })
}

StartServer()
