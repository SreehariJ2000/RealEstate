import UserModel from "../Models/Usermodel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../Utils/error.js"
import jwt from 'jsonwebtoken'
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

export const signin=async (req,res,next)=>{
   
   try {
      const {email,password}=req.body
   const validateuser=await UserModel.findOne({email})
   if(!validateuser) return next(errorHandler(404,'Email id is not registered'))
   const validatePassword=bcryptjs.compareSync(password,validateuser.password)
if(!validatePassword) return next(errorHandler(404,'Invalid password'))
   const token=jwt.sign({id:validateuser._id},process.env.JWT_SECRET)
    const{password:pass,...rest}=validateuser._doc
   res.cookie('acess-token',token,{httpOnly:true}).status(200).json(rest)
      
   } catch (error) {
      next(error)
   }

}


export const google = async (req, res, next) => {
   try {
     const user = await UserModel.findOne({ email: req.body.email });
     if (user) {
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       const { password: pass, ...rest } = user._doc;
       res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
     } else {
       const generatedPassword =
         Math.random().toString(36).slice(-8) +
         Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
       const newUser = new UserModel({
         username:
           req.body.name.split(' ').join('').toLowerCase() +
           Math.random().toString(36).slice(-4),
         email: req.body.email,
         password: hashedPassword,
         avatar: req.body.photo,
       });
       await newUser.save();
       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
       const { password: pass, ...rest } = newUser._doc;
       res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
     }
   } catch (error) {
     next(error);
   }
 };