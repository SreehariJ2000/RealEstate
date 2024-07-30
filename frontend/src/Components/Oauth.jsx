import React from 'react';
import Button from '@mui/material/Button';
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Oauth({ fullWidth = true, variant = "contained", sx = { mt: 3, mb: 2 } }) {
    const dispatch=useDispatch()

    const handleGoogleAuth= async ()=>{
        try {
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result)
           await axios.post('http://127.0.0.1:3000/auth/google',{
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })
            .then((response)=>{
                    console.log(response.data)
                    dispatch(signInSuccess(response.data))
            })
        } catch (error) {
            console.log("Could not signin with google" ,error)
        }
    }
  return (
    <Button
    onClick={handleGoogleAuth}
    type="button"
      fullWidth={fullWidth}
      variant={variant}
      sx={sx}
    >
      Continue with Google
    </Button>
  );
}

export default Oauth;
