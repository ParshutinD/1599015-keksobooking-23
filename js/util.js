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

export {getRandomInt, getRandomFloat};
