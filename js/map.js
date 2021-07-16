import {activeForm, addressInput,resetButton,adForm,formSubmit } from './form.js';
import {modifiers,similarListFragment,similarListElement} from './generation-ads.js';
import {similarAds} from './data.js';

const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
    formSubmit();
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

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
const popupPhotos = popupElement.querySelector('.popup__photos');
const popupAvatar = popupElement.querySelector('.popup__avatar');

const createFeatureElement  = function (features, featureList) {
  let featureClass = '';
  if (features.length === 0) {
    featureList.style.display = 'none';
    return featureClass;
  }
  features.forEach((feature) => {
    switch (feature) {
      case 'wifi':
        featureClass += '<li class="popup__feature popup__feature--wifi"></li>';
        break;
      case 'dishwasher':
        featureClass += '<li class="popup__feature popup__feature--dishwasher"></li>';
        break;
      case 'parking':
        featureClass += '<li class="popup__feature popup__feature--parking"></li>';
        break;
      case 'washer':
        featureClass += '<li class="popup__feature popup__feature--washer"></li>';
        break;
      case 'elevator':
        featureClass += '<li class="popup__feature popup__feature--elevator"></li>';
        break;
      case 'conditioner':
        featureClass += '<li class="popup__feature popup__feature--conditioner"></li>';
        break;
    }
  });
  return featureClass;
};

const createPhotosFragment = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((way) => {
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = way;
    photosFragment.appendChild(popupPhotoItem);
  });
  return photosFragment;
};

/* const createCustomPopup = (semilarAds) => {
  semilarAds.forEach(({ offer, author }) => {
    popupTitle.textContent = offer.title;
    popupAddress.textContent = `Координаты: ${offer.address}`;
    popupPrice.textContent = `${offer.price} ₽/ночь`;
    popupType.textContent = typeList[offer.type];
    popupCapacity.textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    popupElement.querySelector('.popup__features').innerHTML = createFeatureElement(offer.features, popupElement.querySelector('.popup__features'));
    popupDescription.textContent = offer.description;
    popupElement.querySelector('.popup__photos').removeChild(popupElement.querySelector('.popup__photo'));
    popupPhotos.appendChild(createPhotosFragment(offer.photos));
    popupAvatar.src = author.avatar;
  });
  return popupElement;
}; */


const createCustomPopup = (semilarAds) => {
  for (let i = 0; i < semilarAds.length; i++) {
    popupTitle.textContent = semilarAds[i].offer.title;
    popupAddress.textContent = `Координаты: ${semilarAds[i].offer.address}`;
    popupPrice.textContent = `${semilarAds[i].offer.price} ₽/ночь`;
    popupType.textContent = typeList[semilarAds[i].offer.type];
    popupCapacity.textContent = `${semilarAds[i].offer.rooms} комнат для ${semilarAds[i].offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${semilarAds[i].offer.checkin}, выезд до ${semilarAds[i].offer.checkout}`;
    popupElement.querySelector('.popup__features').innerHTML = createFeatureElement(semilarAds[i].offer.features, popupElement.querySelector('.popup__features'));
    popupDescription.textContent = semilarAds[i].offer.description;
    popupElement.querySelector('.popup__photos').removeChild(popupElement.querySelector('.popup__photo'));
    popupPhotos.appendChild(createPhotosFragment(semilarAds[i].offer.photos));
    popupAvatar.src = semilarAds[i].author.avatar;
    return popupElement;
  }
};



const createPinMarker = (semilarAds) => {
  semilarAds.forEach(({location})=> {
    const pinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    pinMarker.addTo(map);
    pinMarker.bindPopup(createCustomPopup(semilarAds));
  });

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
