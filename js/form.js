/* eslint-disable id-length */
import {sendData} from './api.js';
import {resetMainPinMarker,mainPinMarker} from './map.js';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

// Форма объявления
const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormFieldset = document.querySelectorAll('.ad-form__element');
const titleInput = document.querySelector('#title');
const addressInput = document.querySelector('#address');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const resetButton = document.querySelector('.ad-form__reset');

// Фильтрация объявлений
const mapFilters = document.querySelector('.map__filters');
const housingTypeSelect = document.querySelector('#housing-type');
const housingPriceSelect = document.querySelector('#housing-price');
const housingRoomsSelect = document.querySelector('#housing-rooms');
const housingGuestsSelect = document.querySelector('#housing-guests');
const housingfeatures = document.querySelector('#housing-features');

const mapFiltersArr = [housingTypeSelect,housingPriceSelect,housingRoomsSelect,housingGuestsSelect,housingfeatures];

const disableForm = function () {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormFieldset.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFiltersArr.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const disableFilterForm = function () {
  mapFilters.classList.add('ad-form--disabled');
  mapFiltersArr.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const activeForm = function () {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled', 'disabled');
  adFormFieldset.forEach((element) => element.removeAttribute('disabled', 'disabled'));
  mapFiltersArr.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

disableForm();

// Валидации формы добавления объявления

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } символы`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


priceInput.addEventListener('input', () => {
  priceInput.reportValidity('');
});


// Валидация формы количество комнат и количество мест
const capacityOption = capacitySelect.querySelectorAll('option');

const guestsInTheRoom = {
  '1': {
    value: 1,
    items: [2],
  },
  '2': {
    value: 2,
    items: [1, 2],
  },
  '3': {
    value: 3,
    items: [0, 1, 2],
  },
  '100': {
    value: 0,
    items: [3],
  },
};

const guestsOptionCount = 4;

const setAllOptions = function (count) {
  for (let i = 0; i < count; i++) {
    capacityOption[i].classList.add('hidden');
    if (capacityOption[i].selected === true) {
      capacityOption[i].removeAttribute('selected');
    }
  }
};

const disableCapacityOption = function() {
  setAllOptions(guestsOptionCount);
  guestsInTheRoom[roomNumberSelect.value].items.forEach((item) => {
    capacityOption[item].classList.remove('hidden');
  });
  capacitySelect.value = guestsInTheRoom[roomNumberSelect.value].value;
};

roomNumberSelect.addEventListener('change',disableCapacityOption);

//Валидация «Тип жилья»
const typeHousing = {
  'bungalow': {
    value: 0,

  },
  'flat': {
    value: 1000,

  },
  'hotel': {
    value: 3000,

  },
  'house': {
    value: 5000,

  },
  'palace': {
    value: 10000,
  },
};

const choiceHousing = function () {
  priceInput.value = typeHousing[typeInput.value].value;
};

typeInput.addEventListener('change', choiceHousing);

// Валидация «Время заезда», «Время выезда»

const timeInInputChange = function (evt) {
  timeOutInput.value = evt.target.value;
};

const timeOutInputChange = function (evt) {
  timeInInput.value = evt.target.value;
};

timeInInput.addEventListener('change', timeInInputChange);
timeOutInput.addEventListener('change', timeOutInputChange);

const createMessageError = () => {
  const erorrTemplate = document.querySelector('#error').content.querySelector('.error');
  const popupError = erorrTemplate.cloneNode(true);
  const errorBtn = popupError.querySelector('.error__button');
  errorBtn.addEventListener('click', () => {
    popupError.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      popupError.remove();
    }
  });
  document.body.append(popupError);
};

// Uploading avatar
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

//Uploading photos housing
const fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
const previewHousing = document.querySelector('.ad-form__photo');

fileChooserHousing.addEventListener('change', () => {
  const file = fileChooserHousing.files[0];
  const fileName = file.name.toLowerCase();
  const createElement = document.createElement('img');
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewHousing.appendChild(createElement);
      createElement.style.width= '70px';
      createElement.style.height= '70px';
      createElement.style.borderRadius= '10px';
      createElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const popupSuccess = successTemplate.cloneNode(true);

const removePopup = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    resetMainPinMarker();
    popupSuccess.remove();
    adForm.reset();
    previewAvatar.src= 'img/muffin-grey.svg';
    previewHousing.innerHTML='';
    addressInput.value = `${Object.values(mainPinMarker._latlng)}`;
  }
};

const createMessageSuccess = () => {
  document.body.append(popupSuccess);
  document.addEventListener('keydown', removePopup, { once: true });
  popupSuccess.addEventListener('mousedown', () => {
    popupSuccess.remove();
    adForm.reset();
    previewAvatar.src= 'img/muffin-grey.svg';
    previewHousing.innerHTML='';
    resetMainPinMarker();
    addressInput.value = `${Object.values(mainPinMarker._latlng)}`;
  });
};

const formSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(
      () => createMessageSuccess(),
      () => createMessageError(),
      formData,
    );
  });
};


export{activeForm,addressInput,resetButton,formSubmit,adForm,mapFilters,previewAvatar,previewHousing,disableFilterForm};
