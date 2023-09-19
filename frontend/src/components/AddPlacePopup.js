import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm 
      title="Новое место" 
      name="addPhotoForm" 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_appellation"
        type="text"
        name="titleForm"
        id="input-titleForm"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="popup__input-error input-titleForm-error"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="linkForm"
        id="input-linkForm"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error input-linkForm-error"></span>
    </PopupWithForm>  
  );
}