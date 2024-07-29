import express from 'express'
import { signup } from '../Controller/Authcontroller.js'
const Authroute = express.Router()


Authroute.post("/signup",signup)





export default Authroute