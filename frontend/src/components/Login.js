import React, { useState } from 'react'

export default function Login({onLogin}) {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("")

   function hendleSubmit(e) {
      e.preventDefault()
      onLogin({email, password})
   }
  
  return (
   <div className='auth auth__register'>
   <div className='auth__container auth__container_register'>
     <h2 className='auth__title'>Войти</h2>
     <form className='auth__form auth__form_register' onSubmit={hendleSubmit}>
       <input 
         className='auth__input auth__input_type_email' 
         placeholder="Email"
         type='email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       >

       </input>
       <input 
         className='auth__input auth__input_type_password'
         placeholder="Password"
         type='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       >

       </input>

       <button 
       className='auth__button_submit'
       type="submit"
       >
       Войти
       </button>
     </form>     
   </div>
 </div>
  )
}
