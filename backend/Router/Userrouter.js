import express from 'express'
import { user } from '../Controller/Usercontroller.js'
const router =express.Router()


router.get('/test',user)







export default router