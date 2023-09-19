import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeBtnClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-container">
          <button
            className={cardLikeBtnClassName}
            type="button"
            onClick={() => onCardLike(card)}
          ></button>
          <span className="card__likes-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__button-delete"
          type="button"
          onClick={() => onCardDelete(card)}
        ></button>
      )}
    </li>
  );
}

export default Card;
