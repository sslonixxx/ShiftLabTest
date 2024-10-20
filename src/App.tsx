import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import { formSchema, FormSchema, formWithOTP } from './validationSchema';
import { handleSendRequest, postUsersSignin } from './requests';



export const App = () => {
  const [isPhoneSent, setIsPhoneSent] = useState(false);

  const {
    register,
    handleSubmit,
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
          <label htmlFor='code' className='label'>Введите проверочный код</label>
          <input {...register('code')} type="text" id="code" name="code" placeholder='Проверочный код' />
          {errors.code?.message &&(<span role = 'alert' className='error'>
        {errors.code.message}</span>)}
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