// General
let root = document.querySelector('.root');
let profile = root.querySelector('.profile');

// Profile form
let profileForm = root.querySelector('.popup__profile');

// Open profile form
let profileEditBtn = profile.querySelector('.profile__edit-btn');

function openProfileForm() {
  profileForm.classList.remove('popup_opened-profile');
}

profileEditBtn.addEventListener('click', openProfileForm);

// Close profile form
let closeProfileBtn = root.querySelector('.popup__profile-close-btn');

function closeProfileForm() {
  profileForm.classList.add('popup_opened-profile');
}

closeProfileBtn.addEventListener('click', closeProfileForm);

// Submit profile form
function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileInfo = profile.querySelector('.profile__info');
  let profileName = profileInfo.querySelector('.profile__author');
  let profileJob = profileInfo.querySelector('.profile__about-me');

  let inputProfileName = profileForm.querySelector('.popup__name');
  let inputProfileJob = profileForm.querySelector('.popup__about-me');

  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  closeProfileForm();
}

let profileContainer = profileForm.querySelector('.popup__container-profile');

profileContainer.addEventListener('submit', handleFormSubmit);

// Cards form
let placesForm = root.querySelector('.popup__add-places');

// Open cards form
let addCardBtn = profile.querySelector('.profile__add-btn');

function openPlacesForm() {
  placesForm.classList.remove('popup_opened-places');
}

addCardBtn.addEventListener('click', openPlacesForm);

// Close cards form
closePlacesBtn = placesForm.querySelector('.popup__places-close-btn');

function closePlacesForm() {
  placesForm.classList.add('popup_opened-places');
}

closePlacesBtn.addEventListener('click', closePlacesForm);

// Submit cards form
let placesContainer = placesForm.querySelector('.popup__container-places')
let cardElements = root.querySelector('.elements');

let cardGrid = document.querySelector('.elements-grid');

let inputCardURL = document.querySelector('.popup__url');
let inputCardName = document.querySelector('.popup__place');

function addCard() {
  cardGrid.insertAdjacentHTML('afterbegin', `
    <section class="elements">
      <div class="element">
        <img class="element__image" src="${inputCardURL.value}" alt="Imagen de paisaje">
        <div class="element__background">
          <div class="element__info">
            <h3 class="element__name">${inputCardName.value}</h3>
            <button class="element__heart"></button>
            <button class="element__trash"></button>
          </div>
        </div>
      </div>
    </section>
  `);

  inputCardName.value = ''
  inputCardURL.value = ''
}

function handleFormSubmit2 (evt) {
  evt.preventDefault();
  closePlacesForm();
  addCard();
}

placesContainer.addEventListener('submit', handleFormSubmit2);