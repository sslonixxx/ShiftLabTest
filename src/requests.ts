import axios from "axios";
import { FormSchema } from "./validationSchema";

export const postUsersSignin = async (data:FormSchema) => 
  axios.post('https://shift-backend.onrender.com/users/signin', data, {
    headers: {
      'Content-Type': 'application/json',
    }})
  

export const handleSendRequest = async (data: FormSchema) => 
  axios.post('https://shift-backend.onrender.com/auth/otp', data, {
    headers: {
      'Content-Type': 'application/json',
    }})