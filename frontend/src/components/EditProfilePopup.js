import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setDescription(currentUser?.about || "");
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser);
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfileForm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="userName"
        placeholder="Имя"
        minLength="2"
        id="input-userName"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="popup__input-error input-userName-error"></span>
      <input
        className="popup__input popup__input_type_about"
        type="text"
        name="aboutUser"
        placeholder="О себе"
        minLength="2"
        id="input-aboutUser"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <span className="popup__input-error input-aboutUser-error"></span>
    </PopupWithForm>
  );
}