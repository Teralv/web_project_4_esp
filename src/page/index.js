import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

//General
const rootElement = document.querySelector('.root');
const pageContainer = rootElement.querySelector('.page');

//Profile container
export const profileAuthor = pageContainer.querySelector('.profile__author');
export const profileAbout = pageContainer.querySelector('.profile__about-me');
const profilePhoto = pageContainer.querySelector('.profile__photo');

// Popup profile
const profileContainer = pageContainer.querySelector('#popup__profile-form');
export const popupProfile = pageContainer.querySelector('#popup__profile');
export const inputProfileName = profileContainer.querySelector('#name-input');
export const inputProfileAbout = profileContainer.querySelector('#about-input');
export const closeProfileBtn = popupProfile.querySelector('.popup__profile-close-btn');
export const editProfileBtn = pageContainer.querySelector('.profile__edit-btn');
export const submitProfileBtn = popupProfile.querySelector('.popup__btn');

// Popup place
export const placesContainer = pageContainer.querySelector('#popup__places-form');
export const popupPlaces = pageContainer.querySelector('#popup__cards');
export const closePlacesBtn = popupPlaces.querySelector('.popup__places-close-btn');
export const addCardBtn = pageContainer.querySelector('.profile__add-btn');
export const inputPlaceName = placesContainer.querySelector('.popup__place');
export const inputPlaceLink = placesContainer.querySelector('.popup__url');

// Popup image
export const popupImage = pageContainer.querySelector('#image-popup');

// Popup delete card
const popupDelete = pageContainer.querySelector('#popup__delete');
const popupDeleteConfirmBtn = popupDelete.querySelector('.popup__confirm-btn');

// Nuevo Codigo
const profileInfo = new UserInfo({
  nameSelector: profileAuthor,
  aboutSelector: profileAbout,
  avatarSelector: profilePhoto
});

const removeCard = new PopupWithConfirmation({
  popupSelector: '#popup__delete',
  submitButton: popupDeleteConfirmBtn
});

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

removeCard.setEventListeners();

const api = new Api({
  baseURL: 'https://around.nomoreparties.co/v1/web_es_07',
  headers: {
    authorization: 'b7e71284-4020-44f4-a80f-43722c5b3ece',
    'Content-Type': 'application/json'
  }
});

api.deleteCard('65d834bcfa885700125cf522');

const editProfile = new PopupWithForm({
  popupSelector: '#popup__profile',
  btnForPopup: '.profile__edit-btn',
  submitCallback: (data) => {
    api
      .editProfileInfo(data.name, data.about)
      .then((res) => {
        profileInfo.setUserInfo({username: res.name, about: res.about});
        editProfile.close()
    })
    .catch((err) => console.log(err))
  }
});
editProfile.setEventListeners();

api.getUserInfo().then((res) => {
  profileInfo.setUserInfo({username: res.name, about: res.about});
  profileInfo.userId = res._id;
})
.then(() => {
  api.getInitialCards().then((res) => {
    const cardSection = new Section({
      data: res,
      renderer: (data) => {
        const cardElement = createCard(data);
        cardSection.addInitalItems(cardElement);
      }
    }, '#elements')

    cardSection.renderedItems();

    const addCard = new PopupWithForm({
      popupSelector: '#popup__cards',
      btnForPopup: '.profile__add-btn',
      submitCallback: (data) => {
        api
          .addNewCard(data.name, data.link)
          .then((card) => {
            const newCardElement = createCard(card);
            cardSection.addItems(newCardElement);
            addCard.close();
          })
          .catch((err) => console.log(err));
      }
    });

    addCard.setEventListeners();

  })
});

const changeAvatarPopup = new PopupWithForm({
  popupSelector: '#popup__avatar-image',
  btnForPopup: '.profile__container',
  submitCallback: (avatar) => {
    api
      .avatarImage(avatar.link)
      .then(() => {
        profileInfo.setUserAvatar(avatar.link)
        changeAvatarPopup.close()
      })
      .catch((err) => console.log(err));
  }
})
changeAvatarPopup.setEventListeners();

function createCard(data) {
  const newCard = new Card(data , '#element-template', {
    handleCardClick:({name, link}) => {
      imagePopup.open({name, link})
    },
    handleDeleteClick: ({id}) => {
      removeCard.open();
      removeCard.setSubmitAction(() => {
        api.deleteCard('65d834bcfa885700125cf522').then(() => {
          removeCard.close();
          newCard._trashBtn();
        })
        .catch((err) => console.log(err));
      });
    },
    handleAddLike: ({id}) => {
      api.addLike(id).then((res) => {
        newCard.updateLikes(res.likes);
        newCard.addLikeFilter();
      })
      .catch((err) => console.log(err));
    },
    handleRemoveLike: ({id}) => {
      api.deleteLike(id).then((res) => {
        newCard.updateLikes(res.likes);
        newCard.removeLikeFilter();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        newCard.updateForZeroLikes();
      })
    },
    userID: profileInfo.userId
  });

  return newCard.generateCard();
};

// Input validations
const validation = new FormValidator(document);
validation.enableValidation();