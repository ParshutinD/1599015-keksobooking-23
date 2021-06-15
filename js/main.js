// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Функция, возвращающая случайное целое число

function getRandomInt(min, max) {
  if (max >= min && max >= 0 && min >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (max < 0 || min < 0) {
    return ReferenceError('Значение не может быть отрицательным');
  } else {
    return ReferenceError(
      'Минимальное значение не должно быть больше максимального или равное ему');
  }
}

getRandomInt();

// Функция, возвращающая случайное число с плавающей точкой

function getRandomFloat(min, max, floatPoint) {
  if (max >= min && max >= 0 && min >= 0) {
    const randomNumber = (min + Math.random() * (max - min)).toFixed(
      Math.abs(floatPoint));
    return Math.abs(randomNumber);
  } else if (max < 0 || min < 0) {
    return ReferenceError('Значение не может быть отрицательным');
  } else {
    return ReferenceError(
      'Минимальное значение не должно быть больше максимального или равное ему');
  }
}

getRandomFloat();

// Генерация данных
let xx = getRandomInt(1,10);

if(xx < 10) {
  xx = '0' + xx;
}

const author = {
  avatar: `img/avatars/user{${xx}}.png`,
};

const typeList = ['palace','flat','house','bungalow','hotel'];
const checkinList = ['12:00','13:00','14:00'];
const checkoutList = ['12:00','13:00','14:00'];
const featuresList = _.sampleSize(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], getRandomInt(1,6)) ;
const photosList = _.sampleSize(['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],getRandomInt(1,3));

const location = {
  lat:getRandomFloat(35.65000, 35.70000, 5),
  lng:getRandomFloat(139.70000, 139.80000, 5),
};

const offer = {
  title: 'Информация о жилье',
  address: `{${location.lat}}, {${location.lng}}`,
  price: getRandomInt(1, 999999),
  type: typeList[getRandomInt(0,4)],
  rooms: getRandomInt(1, 999999),
  guests: getRandomInt(1, 999999),
  checkin: checkinList[getRandomInt(0,2)],
  checkout: checkoutList[getRandomInt(0,2)],
  features: featuresList,
  description:'Уютно',
  photos:photosList,
};


const adDescription = [];

function createNewArray () {
  adDescription.push(author,location,offer);
}

createNewArray();

