
import {similarAds,featuresList} from './data.js';

const similarAdsTemplate = document.querySelector('#card').content;

const similarListElement = document.querySelector('#map-canvas');

const generationSimilarAds = similarAds();

const similarListFragment = document.createDocumentFragment();


const featuresListElement = document.querySelector('.popup__features');

const modifiers = featuresList.map((feature) => `popup__feature--${feature}`);

document.querySelectorAll('.popup__feature').forEach((item) => {
  const modifier = item.classList[1];
  if (!modifiers.includes(modifier)) {
    item.remove;
  }
});

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


generationSimilarAds.forEach(({offer,author}) => {
  const adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = offer.title;
  adsElement.querySelector('.popup__text--address').textContent = offer.address;
  adsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = typeList[offer.type];
  adsElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms  } комнат для ${  offer.guests  } гостей`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${  offer.checkin  }, выезд до ${  offer.checkout}`;
  adsElement.querySelector('.popup__features').textContent = offer.features;
  adsElement.querySelector('.popup__description').textContent = offer.description;
  adsElement.querySelector('.popup__photo').src = offer.photos ;
  adsElement.querySelector('.popup__avatar').src = author.avatar;
  similarListFragment.appendChild(adsElement);
});

/*  similarListElement.appendChild(similarListFragment); */

export{modifiers};
