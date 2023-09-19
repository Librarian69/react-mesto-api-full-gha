import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import Api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  // const [group, setGroup] = useState(false);

  const api = new Api({
    baseUrl: "https://api.mikhail.students.nomoredomainsrocks.ru",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if(isAuth) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
    }   
  }, [isAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      auth.checkToken(token).then((res) => {
        setCurrentUser(res)
        setIsAuth(true)
        setEmail(res.data.email)
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false)
    // setGroup(false)
  };
  

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(obj) {
    if(!obj.email || !obj.password) {
      return
    }

    auth.login(obj).then((data) => {
      if(data.token) {
        setIsAuth(true);
        localStorage.setItem("token", data.token);
        setEmail(obj.email);
        navigate("/");
        }
      })
      .catch((err) => {
        setErr(true)
        setIsInfoTooltipOpen((prev) => !prev)
      });
  }

  function handleRegister(obj) {
    if(!obj.email || !obj.password) {
      return
    }

    auth.register(obj).then((data) => {
      setErr(false)
      setIsInfoTooltipOpen((prev) => !prev)
      navigate("/sign-in");

      })
      .catch((err) => {
        setErr(true)
        setIsInfoTooltipOpen((prev) => !prev)
      });
  }  

  function handleExit() {
    setEmail("")
    localStorage.removeItem("token")

  }
  

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Header email={email} onExit={handleExit}  />
      <Routes>      
      <Route path="/" element={
        <ProtectedRoute isAuth={isAuth}>
        <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      </ProtectedRoute>
      } />
      <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
      <Route path="/sign-in" element={<Login onLogin={handleLogin}/>} />      
      </Routes>

      <InfoTooltip 
        name="infoTooltip"
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        err={err}
        message={err ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}
      />

      <Footer />      

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        title="Вы уверены?"
        name="delete"
        buttonText="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default App;
