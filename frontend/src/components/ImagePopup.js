function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup  popup_card-photo ${
        card && card?.link ? "popup_active" : ""
      }`}
    >
      <div className="popup__container popup__container_photo">
        <img className="popup__photo" src={card?.link} alt={card?.name} />
        <h2 className="popup__photo-title">{card?.name}</h2>
        <button
          className="popup__button-close popup__button-close_photo"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
