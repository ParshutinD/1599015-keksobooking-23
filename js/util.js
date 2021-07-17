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

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, getRandomFloat,showAlert};

