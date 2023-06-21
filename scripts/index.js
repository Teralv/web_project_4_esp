//General
const root = document.querySelector('.root');
const page = root.querySelector('.page');

// Popup profile
const profileContainer = page.querySelector('#popup__profile-form')
const popupProfile = page.querySelector('.popup__profile');
const closeProfileBtn = popupProfile.querySelector('.popup__profile-close-btn');
const editBtn = page.querySelector('.profile__edit-btn');

// Popup place
const placesContainer = page.querySelector('#popup__places-form');
const popupPlaces = page.querySelector('.popup__places');
const closePlacesBtn = popupPlaces.querySelector('.popup__places-close-btn');
const addCardBtn = page.querySelector('.profile__add-btn');

// Cards
const cardElements = page.querySelector('#elements');
const trashBtn = cardElements.querySelector('.element__trash');

// Image zoom
const closeBigImage = page.querySelector('.image-popup__close-btn');

//Edit profile
editBtn.addEventListener('click', function () {
  popupProfile.classList.toggle('popup_opened-profile');
});

closeProfileBtn.addEventListener('click', function () {
  popupProfile.classList.toggle('popup_opened-profile');
});

function handleFormSubmit (evt) {
  evt.preventDefault();

  const popupName = page.querySelector('.profile__author');
  const popupJob = page.querySelector('.profile__about-me');

  const inputName = document.querySelector('.popup__name');
  const inputJob = document.querySelector('.popup__about-me');

  popupName.textContent = inputName.value;
  popupJob.textContent = inputJob.value;

  popupProfile.classList.toggle('popup_opened-profile');
}

profileContainer.addEventListener('submit', function (evt) {
  handleFormSubmit(evt)
});

// Add card element
addCardBtn.addEventListener('click', function () {
  popupPlaces.classList.toggle('popup_opened-places');
});

closePlacesBtn.addEventListener('click', function () {
  popupPlaces.classList.toggle('popup_opened-places');
})

// Initial Cards
function initialElements () {
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];

  initialCards.forEach(function(item) {
    addElement(item.name, item.link)
  })
}

initialElements();

// Add card elements, like, trash and zoom functions
function addElement (placeValue, imageValue) {
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
    const bigImages = document.querySelector('.image-popup');
    const bigImageTitle = document.querySelector('.image-popup__title');
    const bigImageLink = document.querySelector('.image-popup__image');

    bigImageTitle.textContent = placeValue;
    bigImageLink.src = imageValue;

    bigImages.classList.toggle('image-popup_opened');
  })

}

function handleFormSubmit2 (evt) {
  evt.preventDefault();
  popupPlaces.classList.toggle('popup_opened-places');
}

placesContainer.addEventListener('submit', function (evt) {
  const inputCardURL = document.querySelector('.popup__url');
  const inputCardName = document.querySelector('.popup__place');

  addElement(inputCardName.value, inputCardURL.value);

  handleFormSubmit2(evt);

  inputCardName.value = "";
  inputCardURL.value = "";
});

// Zoom
closeBigImage.addEventListener('click', function () {
  const image = document.querySelector('.image-popup');
  image.classList.toggle('image-popup_opened')
});