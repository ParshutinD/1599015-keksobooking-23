import './data.js';
import './generation-ads.js';
import './form.js';
import './map.js';
import './api.js';
import {createCustomPopup,createPinMarker} from './map.js';
import {getData} from './api.js';


const SIMILAR_ADS_COUNT = 11;

getData((ads) => {
  console.log(ads);
  console.log(createCustomPopup(ads));
  createPinMarker(ads.slice(0, SIMILAR_ADS_COUNT));
});


