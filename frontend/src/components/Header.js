import { Link, Route, Routes  } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useState, useEffect } from 'react';

function Header ({email, onExit, isOpen }) {
  const [group, setGroup] = useState(false);

  useEffect(() => {
    if (!email) {
      setGroup(false);
    }
  }, [email]);

  

  function handleGroupClick() {
    setGroup(true);
  }

  function handleGroupClose(){
    setGroup(false);
  }

  return (
    <header className={`header ${group ? 'header__reverse' : ''}`}>
      <img
        className={`logo header__logo ${group ? 'header__logo_reverse' : ''}`}
        src={logo}
        alt="Лого"
      />
      {email && <button 
        className={`header__group ${group ? 'header_inactive' : ''}`} 
        onClick={handleGroupClick}
      />}
      <div 
      className={`header__container ${email ? 'header__container_auth' : ''} ${group ? 'header_active' : ''}`}>
      {email && <span className='header__email'>
        {email}
      </span>}
      <Routes>
        <Route 
          path="/sign-up" 
          element={<Link className='header__link' 
          to="/sign-in"
          >
          Войти
        </Link>}/>
        <Route 
          path="/sign-in" 
          element={<Link className='header__link' 
          to="/sign-up"
          >
            Регистрация
        </Link>}/>
        <Route 
          path="/" 
          element={<Link className='header__link' 
          to="/sign-in" 
          onClick={onExit}
          >
            Выйти
        </Link>}/>
      </Routes>
      </div>
      {email && <button className={`header__close ${group ? 'header__close_active' : 'header__close'}`} onClick={handleGroupClose} />}
    </header>
  );
}

export default Header;