import React from 'react'
import success from '../images/success.svg';
import fail from '../images/fail.svg';


export default function InfoTooltip({name, err, isOpen, onClose, message}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}>
      <div className={`popup__container popup__container_${name}`}>
      <button
        className={`popup__button-close popup__button-close_${name}`}
        type="button"
        onClick={onClose}
      />
        <img className='popup__img' src={err ? fail : success} alt="" />
        <h2 className="popup__title popup__title_info-tooltip">{message}</h2>
      </div>
    </div>
  )
}
