import { activeForm, addressInput,resetButton,adForm } from './form.js';
import {modifiers,similarListFragment,similarListElement} from './generation-ads.js';
import {similarAds} from './data.js';

const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
  })
  .setView(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    10,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68951,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

addressInput.value = `${Object.values(mainPinMarker._latlng)}`;

mainPinMarker.on('moveend', (evt) => {
  const сoordinates = evt.target.getLatLng();
  addressInput.value = `${сoordinates.lat.toFixed(5)},${сoordinates.lng.toFixed(
    5,
  )}`;
});

const adsArr = similarAds();

const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupElement = balloonTemplate.cloneNode(true);

const popupTitle = popupElement.querySelector('.popup__title');
const popupAddress = popupElement.querySelector('.popup__text--address');
const popupPrice = popupElement.querySelector('.popup__text--price');
const popupType = popupElement.querySelector('.popup__type');
const popupCapacity = popupElement.querySelector('.popup__text--capacity');
const popupTime = popupElement.querySelector('.popup__text--time');
const popupFeatures = popupElement.querySelector('.popup__features');
const popupDescription = popupElement.querySelector('.popup__description');
const popupPhoto = popupElement.querySelector('.popup__photo');
const popupAvatar = popupElement.querySelector('.popup__avatar');

const createFeatureElement = function () {
  const featureFragment = document.createDocumentFragment();
  modifiers.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.className = `popup__feature ${  item}`;
    featureFragment.appendChild(featureItem);
  });
  return featureFragment;
};

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCustomPopup = (semilarAds) => {
  semilarAds.forEach(({ offer, author }) => {
    popupTitle.textContent = offer.title;
    popupAddress.textContent = `Координаты: ${offer.address}`;
    popupPrice.textContent = `${offer.price} ₽/ночь`;
    popupType.textContent = typeList[offer.type];
    popupCapacity.textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    popupFeatures.innerHTML = '';
    popupFeatures.appendChild(createFeatureElement());
    popupDescription.textContent = offer.description;
    popupPhoto.src = offer.photos;
    popupAvatar.src = author.avatar;
  });
  return popupElement;
};

const createPinMarker = (semilarAds) => {
  for (let i = 0; i < semilarAds.length; i++) {
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const pinMarker = L.marker(
      {
        lat: semilarAds[i].location.lat,
        lng: semilarAds[i].location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    pinMarker.addTo(map);
    pinMarker.bindPopup(createCustomPopup(semilarAds),
    );
  }
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mainPinMarker.setLatLng({
    lat: 35.68951,
    lng: 139.69171,
  });
  addressInput.value = `${Object.values(mainPinMarker._latlng)}`;
});


export{createCustomPopup,createPinMarker};
