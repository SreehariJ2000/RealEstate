
import mongoose from "mongoose";

const UsermodelSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    },


},{timestamp:true})


const UserModel= mongoose.model("Usermodel",UsermodelSchema)
export default UserModel