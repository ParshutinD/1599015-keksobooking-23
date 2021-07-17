import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((semilarAds) => {
      onSuccess(semilarAds);
    })
    .catch(() => showAlert('Не удалось загрузить данные с сервера. Попробуйте ещё раз'));
};


const sendData = function (onSuccess, onFail, body) {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
