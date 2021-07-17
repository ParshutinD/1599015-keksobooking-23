import './data.js';
import './generation-ads.js';
import './form.js';
import './map.js';
import './api.js';
import {createCustomPopup,createPinMarker} from './map.js';
import {getData} from './api.js';


const SIMILAR_ADS_COUNT = 10;

getData((ads) => {
  createPinMarker(ads.slice(0,SIMILAR_ADS_COUNT));
});


