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
const submitPlacesBtn = placesContainer.querySelector('.popup__btn');

// Popup image
export const popupImage = pageContainer.querySelector('#image-popup');

document.querySelector('.profile__container').addEventListener('click', () => {
  const prueba = document.querySelector('#popup__avatar-image');
  prueba.classList.add('popup_opened');
})

// Initial cards
const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg'
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg'
  },
  {
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg'
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg'
  }
];

// Nuevo Codigo
const profileInfo = new UserInfo({
  nameSelector: profileAuthor,
  aboutSelector: profileAbout
});

const deleteCard = new PopupWithConfirmation({
  popupSelector: document.querySelector('#popup__delte'),
  submitButton: document.querySelector('.popup__confirm-btn')
});

deleteCard.setEventListeners();

const api = new Api({
  baseURL: 'https://around.nomoreparties.co/v1/web_es_cohort_08',
  headers: {
    authorization: 'b7e71284-4020-44f4-a80f-43722c5b3ece',
    'Content-Type': 'application/json'
  }
});

const editProfile = new PopupWithForm({
  popupSelector: '#popup__profile',
  submitCallback: (data) => {
    api.editProfileInfo(data.name, data.aboutMe).then((res) => {
      profileInfo.getUserInfo(res);
      editProfile.close()
    })
    .catch((err) => console.log(err))
  }
});
editProfile.setEventListeners();



// Render initial cards
const initialCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const defaultCard = new Card(item, '#element-template', {
      handleCardClick: (link, name) => {
        const popupImage = new PopupWithImage('#image-popup', link, name);
        popupImage.open();
      }
    });
    const defaultElementCard = defaultCard.generateCard();
    initialCardList.addInitalItems(defaultElementCard);
  }
}, '#elements');

initialCardList.renderedItems();

// Create new cards
function createCards(item) {
  const card = new Card(item, '#element-template', {
    handleCardClick: (link, name) => {
      const imagePopup = new PopupWithImage('#image-popup', link, name);
      imagePopup.open();
    },
  });
  const cardElement = card.generateCard();
  initialCardList.addItems(cardElement);
}

const cardsForm = new PopupWithForm({
  popupSelector: '#popup__cards',
  submitCallback: (item) => {
    createCards(item);
    cardsForm.close();
  }
});

cardsForm.setEventListeners();

// Change user information
/*const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup__profile',
  submitCallback: () => {
    const setInfo = new UserInfo({
      nameSelector: profileAuthor,
      aboutSelector: profileAbout
    })
    setInfo.setUserInfo();
  }
});

userInfoPopup.setEventListeners();*/

const toggleAddCardsPopup = () => {
  popupPlaces.classList.toggle('popup_opened');
}

addCardBtn.addEventListener('click', toggleAddCardsPopup);

const openProfilePopup = () => {
  popupProfile.classList.add('popup_opened');
  submitProfileBtn.classList.add('popup__btn_inactive');
}

editProfileBtn.addEventListener('click', openProfilePopup);

export function createNewCard(card) {
  const newCard = new Card(card, '#element-template');
  const newCardElement = newCard.generateCard();

  document.querySelector('#elements').prepend(newCardElement);
}

// Input validations
const validation = new FormValidator(document);


validation.enableValidation();