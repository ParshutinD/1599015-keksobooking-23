import {activeForm, addressInput,resetButton,adForm,mapFilters,formSubmit,previewAvatar,previewHousing} from './form.js';
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

const createCustomPopup = (semilarAds) => {

  const popupElement = balloonTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = semilarAds.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = semilarAds.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${semilarAds.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = typeList[semilarAds.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${semilarAds.offer.rooms  } комнат для ${  semilarAds.offer.guests  } гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${  semilarAds.offer.checkin  }, выезд до ${  semilarAds.offer.checkout}`;
  popupElement.querySelector('.popup__description').textContent = semilarAds.offer.description;
  popupElement.querySelector('.popup__avatar').src = semilarAds.author.avatar;


  popupElement.querySelector('.popup__features').innerHTML = '';
  if (semilarAds.offer.features) {
    semilarAds.offer.features.forEach((item) => {
      const feature = document.createElement('li');
      const featureClass = `popup__feature--${item}`;
      feature.classList.add('popup__feature', featureClass);
      popupElement.querySelector('.popup__features').appendChild(feature);
    });
  } else {
    popupElement.querySelector('.popup__features').classList.add('hidden');
  }

  const photoListElementFragment = document.createDocumentFragment();
  const popupPhotos = popupElement.querySelector('.popup__photos');
  if (semilarAds.offer.photos) {
    semilarAds.offer.photos.forEach((photo) => {
      const photoElement =  popupPhotos.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;
      photoListElementFragment.appendChild(photoElement);
    });
    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(photoListElementFragment);
  } else {
    popupPhotos.classList.add('hidden');
  }

  return popupElement;
};


const markerGroup = L.layerGroup().addTo(map);
const removeAllPins = () => markerGroup.clearLayers();

const createPinMarker = (semilarAds) => {
  const pin = L.marker(
    semilarAds.location,
    {
      icon: pinIcon,
    },
  );
  pin
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(semilarAds),
      {
        keepInView: true,
      },
    );
};

const setResetButtonClick = (callback) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    mapFilters.reset();
    previewAvatar.src= 'img/muffin-grey.svg';
    previewHousing.innerHTML='';
    mainPinMarker.setLatLng({
      lat: 35.68951,
      lng: 139.69171,
    });
    addressInput.value = `${Object.values(mainPinMarker._latlng)}`;
    callback();
  });

};


export{mainPinMarker,createCustomPopup,createPinMarker,removeAllPins,setResetButtonClick};
