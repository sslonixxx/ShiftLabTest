import axios from "axios";
import { FormSchema } from "./validationSchema";

export const postUsersSignin = async (data:FormSchema) => {
    try {
      await axios.post('https://shift-backend.onrender.com/users/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  

export const handleSendRequest = async (data: FormSchema) => {
  try {
    await axios.post('https://shift-backend.onrender.com/auth/otp', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log(e);
  }
};