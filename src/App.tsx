import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import axios from 'axios';

const formSchema = z
.object({
  phone: z
  .string()
  .min(1, {message: 'Поле является обязательным'}),
})

const formWithOTP = z.object({
  phone: z
  .string()
  .min(1, {message: 'Поле является обязательным'}),
  code: z
  .string()
  .length(6, {message:'Код должен содержать 6 цифр'})
})

type FormSchema= z.infer<typeof formWithOTP>

const App = () => {
  const [isPhoneSent, setIsPhoneSent] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: {errors},
  }=useForm<FormSchema>({ resolver: isPhoneSent ? zodResolver(formWithOTP) : zodResolver(formSchema) })

  const handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/(?!^\+)[^\d]/g, '').replace(/(?<=\+.*)\+/g, '');
    setValue('phone', result)
  }
  

  const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
    if(isPhoneSent){
      await postUsersSignin(data)
      return;
    }
    await handleSendRequest(data);
    setIsPhoneSent(true);
    console.log(data)
  };

  const postUsersSignin = async (data:FormSchema) => {
    try {
      await axios.post('https://shift-backend.onrender.com/users/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  useEffect (() => {
    setFocus('phone');
},[setFocus]);

const handleSendRequest = async (data: FormSchema) => {

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


  return (
  <div className='wrapper'>
    <h1 className='title'> Вход</h1> 
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='phone'>
      <label htmlFor='phone' className='label'>Введите номер телефона для входа в личный кабинет</label>
      <input {...register('phone')} type="tel" id="phone" name="phone" onChange={handleChange} placeholder='Телефон' aria-invalid={errors.phone ? 'true' : 'false'} />
      {errors.phone?.message && (<span role = 'alert' className='error'>
        {errors.phone?.message}
        </span>)}
      </div>
      {isPhoneSent && (<div className='new-field'>
          <label htmlFor='code' className='label'>Введите код из SMS</label>
          <input {...register('code')} type="text" id="code" name="code" placeholder='Проверочный код' />
          {errors.code?.message &&(<span role = 'alert' className='error'>
        {errors.code?.message}
        </span>)}
        </div> )}
      <div className='button'>
        <button
          type='submit'
          className='btnBySubmit'>
          {isPhoneSent ? 'Войти' : 'Продолжить'} 
        </button>
      </div>
      
    </form>
  </div>)
}

export default App