import React, { useContext, useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("")

   function hendleSubmit(e) {
      e.preventDefault()
      onRegister({email, password})
   }

  return (
   <div className='auth auth__register'>
   <div className='auth__container auth__container_register'>
     <h2 className='auth__title'>Регистрация</h2>
     <form className='auth__form auth__form_register' onSubmit={hendleSubmit}>
       <input 
         className='auth__input auth__input_type_email' 
         placeholder="Email"
         type='email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       >

       </input>
       <input 
         className='auth__input auth__input_type_password'
         placeholder="Password"
         type='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       >

       </input>

       <button 
       className='auth__button_submit'
       type="submit"
      >
       Зарегистрироваться
      </button>
     </form>
     
     <h3 className='auth__text auth__text_register'>Уже зарегистрированы? <Link className='auth__link' to="/sign-in">Войти</Link></h3>
   </div>
 </div>
  )
}