import UserModel from "../Models/Usermodel.js"
import bcryptjs from 'bcryptjs'
export const signup=async (req,res,next)=>{
     const {username,email,password}=req.body
     

     try {
      const hashedPassword= await bcryptjs.hash(password,10)
        const newuser= new UserModel({username,email,password:hashedPassword})
        await  newuser.save()
        res.status(200).json({message:"sucess"})
        
     } catch (error) {
        next(error)
     }

    
    
    
}