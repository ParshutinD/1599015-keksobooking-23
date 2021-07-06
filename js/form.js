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
const adDescription = document.querySelector('#description');
const submitButton = document.querySelector('.ad-form__submit');
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

const activeForm = function () {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled', 'disabled');
  adFormFieldset.forEach((element) => element.removeAttribute('disabled', 'disabled'));
  mapFiltersArr.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};


