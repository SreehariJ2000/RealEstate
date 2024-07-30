import express from 'express'
import { signup,signin,google } from '../Controller/Authcontroller.js'
const Authroute = express.Router()


Authroute.post("/signup",signup)
Authroute.post("/signin",signin)
Authroute.post("/google",google)





export default Authroute