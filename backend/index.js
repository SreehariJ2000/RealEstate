import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Userrouter from './Router/Userrouter.js'
import Authroute from './Router/Authrouter.js'
import cors from 'cors';
dotenv.config()
const app=express()



mongoose.connect(process.env.MONGO)
.then(() =>
    {
        console.log('Connected to MongoDB...')
    })



app.listen(3000,()=>{
    console.log("app run on port 3000")
})

app.use(express.json())
app.use(cors());
app.use('/',Userrouter)
app.use('/auth/',Authroute)

app.use((err,req,res,next)=>{
    const errorStatus=err.statusCode || 500
    const message= err.message || 'internal server error'
    res.status(errorStatus).json({
        sucess:false,
        status:errorStatus,
        message})
})