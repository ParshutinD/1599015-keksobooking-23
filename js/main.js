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
