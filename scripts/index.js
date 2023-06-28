//General
const rootElement = document.querySelector('.root');
const pageContainer = rootElement.querySelector('.page');

// Popup profile
const profileContainer = pageContainer.querySelector('#popup__profile-form');
const popupProfile = pageContainer.querySelector('#popup__profile');
const closeProfileBtn = popupProfile.querySelector('.popup__profile-close-btn');
const editBtn = pageContainer.querySelector('.profile__edit-btn');

// Popup place
const placesContainer = pageContainer.querySelector('#popup__places-form');
const popupPlaces = pageContainer.querySelector('#popup__cards');
const closePlacesBtn = popupPlaces.querySelector('.popup__places-close-btn');
const addCardBtn = pageContainer.querySelector('.profile__add-btn');

// Cards
const cardElements = pageContainer.querySelector('#elements');
const trashBtn = cardElements.querySelector('.element__trash');

// Image zoom
const popupImage = pageContainer.querySelector('.image-popup')
const closeBigImage = pageContainer.querySelector('.image-popup__close-btn');

//Edit profile
const toggleProfilePopup = () => {
  popupProfile.classList.toggle('popup__profile_opened');
}

editBtn.addEventListener('click', toggleProfilePopup);

closeProfileBtn.addEventListener('click', toggleProfilePopup);

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  const popupName = pageContainer.querySelector('.profile__author');
  const popupJob = pageContainer.querySelector('.profile__about-me');

  const inputName = document.querySelector('.popup__name');
  const inputJob = document.querySelector('.popup__about-me');

  popupName.textContent = inputName.value;
  popupJob.textContent = inputJob.value;

  toggleProfilePopup();
}

profileContainer.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt)
});

// Escape and outside click functions
function clickAndKeyClosePopup (popupElement) {
  const popupList = Array.from(pageContainer.querySelectorAll('.popup'));
  popupList.push(pageContainer.querySelector('.image-popup'));

  popupList.forEach((popup) => {
    popupElement.addEventListener('click', (evt) => {
      if (!popup.classList.contains(`${popup.id}`)) {
        if (evt.target.classList.contains('popup__background')) {
          popup.classList.remove(`${popup.id}_opened`);
        }
      }
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape" && popup.classList.contains(`${popup.id}_opened`)) {
        popup.classList.remove(`${popup.id}_opened`);
      }
    });
  });
}

popupImage.addEventListener('click', (evt) => {
  if (!popupImage.classList.contains('image-popup__container')) {
    if (evt.target.classList.contains('image-popup__background')) {
      popupImage.classList.remove('image-popup_opened');
    }
  }
});

clickAndKeyClosePopup(popupProfile);
clickAndKeyClosePopup(popupPlaces);
clickAndKeyClosePopup(popupImage);

// Add card element
const toggleAddCardsPopup = () => {
  popupPlaces.classList.toggle('popup__cards_opened');
}

addCardBtn.addEventListener('click', toggleAddCardsPopup);

closePlacesBtn.addEventListener('click', toggleAddCardsPopup);

// Initial Cards
function initialElements () {
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

  initialCards.forEach((item) => {
    createCardElement(item.name, item.link);
  })
}

initialElements();

// Add card elements, like, trash and zoom functions
function createCardElement (placeValue, imageValue) {
  const placeTemplate = document.querySelector('#element-template').content;
  const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

  placeElement.querySelector('.element__name').textContent = placeValue;
  placeElement.querySelector('.element__image').src = imageValue;

  cardElements.prepend(placeElement);

  placeElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_black');
  });

  placeElement.querySelector('.element__trash').addEventListener('click', function () {
    const eliminateCard = placeElement.closest('.element')
    eliminateCard.remove()
  });

  placeElement.querySelector('.element__image').addEventListener('click', function() {
    const bigImageTitle = document.querySelector('.image-popup__title');
    const bigImageLink = document.querySelector('.image-popup__image');

    bigImageTitle.textContent = placeValue;
    bigImageLink.src = imageValue;

    popupImage.classList.toggle('image-popup_opened');
  })
}

placesContainer.addEventListener('submit', (evt) => {
  const inputCardURL = document.querySelector('.popup__url');
  const inputCardName = document.querySelector('.popup__place');

  createCardElement(inputCardName.value, inputCardURL.value);

  evt.preventDefault();
  toggleAddCardsPopup();

  inputCardName.value = '';
  inputCardURL.value = '';
});

// Zoom
closeBigImage.addEventListener('click', () => {
  popupImage.classList.toggle('image-popup_opened')
});