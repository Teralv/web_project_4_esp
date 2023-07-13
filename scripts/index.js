import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// Popup image
export const popupImage = pageContainer.querySelector('#image-popup');

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

// Create initial cards
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, '#element-template');
  const cardElement = card.generateCard();

  document.querySelector('#elements').append(cardElement);
});

// Create new cards
export function createNewCard(card) {
  const newCard = new Card(card, '#element-template');
  const newCardElement = newCard.generateCard();

  document.querySelector('#elements').prepend(newCardElement);
}

// Input validations
const validation = new FormValidator(document);


validation.enableValidation();