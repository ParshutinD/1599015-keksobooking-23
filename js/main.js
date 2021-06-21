function getRandomInt(min, max) {
  if (max >= min && max >= 0 && min >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomInt();

// Функция, возвращающая случайное число с плавающей точкой

function getRandomFloat(min, max, floatPoint) {
  if (max >= min && max >= 0 && min >= 0) {
    const randomNumber = (min + Math.random() * (max - min)).toFixed(
      Math.abs(floatPoint));
    return Math.abs(randomNumber);
  }
}

getRandomFloat();

// Генерация данных
let xx = getRandomInt(0,10);

if(xx < 10) {
  xx = `0${  xx}`;
}

const AUTHOR = {
  avatar: `img/avatars/user{${xx}}.png`,
};

const typeList = ['palace','flat','house','bungalow','hotel'];
const checkinList = ['12:00','13:00','14:00'];
const checkoutList = ['12:00','13:00','14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosList = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const resultsFeaturesList = featuresList
  .sort(() => .5 - Math.random())
  .slice(0, getRandomInt(1,6));

const resultsPhotosList = photosList
  .sort(() => .5 - Math.random())
  .slice(0, getRandomInt(1,3));


const LOCATION = {
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
};

const OFFER = {
  title: 'Информация о жилье',
  address: `{${LOCATION.lat}}, {${LOCATION.lng}}`,
  price: getRandomInt(1, 999999),
  type: typeList[getRandomInt(0,4)],
  rooms: getRandomInt(1, 999999),
  guests: getRandomInt(1, 999999),
  checkin: checkinList[getRandomInt(0,2)],
  checkout: checkoutList[getRandomInt(0,2)],
  features: resultsFeaturesList,
  description:'Уютно',
  photos: resultsPhotosList,
};

function createObject () {
  return {
    author:AUTHOR,
    offer:OFFER,
    location:LOCATION,
  };
}
const SIMILAR_ADS_COUNT = 10;


const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createObject());

// eslint-disable-next-line no-console
console.log(similarAds);
