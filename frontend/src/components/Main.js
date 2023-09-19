import React, { useState, useEffect, useContext } from "react";
import Api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__button-edit-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="Фото профиля"
            />
          </button>
          <h1 className="profile__name">{currentUser?.name}</h1>
          <p className="profile__description">{currentUser?.about}</p>
          <button
            className="profile__button-edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards-grid">
        <ul className="cards-grid__list">
          {cards.map((card, _id) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
