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

// Валидации формы добавления объявления
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

