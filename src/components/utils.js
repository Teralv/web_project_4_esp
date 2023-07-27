import {
  profileAuthor,
  profileAbout,
  popupProfile,
  inputProfileName,
  inputProfileAbout,
  closeProfileBtn,
  editProfileBtn,
  submitProfileBtn,
  placesContainer,
  popupPlaces,
  closePlacesBtn,
  addCardBtn,
  inputPlaceName,
  inputPlaceLink,
  popupImage,
  createNewCard
} from './index.js'

// Toggle popup
function togglePopup(item) {
  item.classList.toggle('popup_opened');
}

//Toggle Edit Form
const toggleProfilePopup = () => {
  popupProfile.classList.toggle('popup_opened');
}

const openProfilePopup = () => {
  popupProfile.classList.add('popup_opened');

  inputProfileName.value = profileAuthor.textContent;
  inputProfileAbout.value = profileAbout.textContent;


  submitProfileBtn.classList.add('popup__btn_inactive');
}

editProfileBtn.addEventListener('click', openProfilePopup);
closeProfileBtn.addEventListener('click', toggleProfilePopup);

// Toggle Submit New Card
const toggleAddCardsPopup = () => {
  popupPlaces.classList.toggle('popup_opened');

  inputPlaceName.value = '';
  inputPlaceLink.value = '';
}

addCardBtn.addEventListener('click', toggleAddCardsPopup);
closePlacesBtn.addEventListener('click', toggleAddCardsPopup);

// Submit edit profile form
function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  profileAuthor.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;

  toggleProfilePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleProfileSubmitForm);

// Submit add places form
function handleCardSubmitForm(evt) {
  const submitPlacesBtn = placesContainer.querySelector('.popup__btn');
  evt.preventDefault();

  const newCard = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };

  createNewCard(newCard);
  submitPlacesBtn.classList.add('popup__btn_inactive');

  toggleAddCardsPopup(popupPlaces);
}

popupPlaces.addEventListener('submit', handleCardSubmitForm);

// Escape key for closing popups
function handleEscapeKey(evt) {
  const popupContainers = [popupImage, popupProfile, popupPlaces];
  if (evt.key === 'Escape') {
    popupContainers.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        togglePopup(popup);
      }
    });
  }
}

document.addEventListener('keydown', handleEscapeKey);

// Outside click for closing popups
function handleOutsideClick(popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__background')) {
        popupElement.classList.remove('popup_opened');
      }
  });
}

handleOutsideClick(popupImage);
handleOutsideClick(popupProfile);
handleOutsideClick(popupPlaces);