import {createPinMarker,removeAllPins} from './map.js';

const MAX_ADS_COUNT = 10;
const DEFAULT_FILTER_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingTypeSelect = document.querySelector('#housing-type');
const housingPriceSelect = document.querySelector('#housing-price');
const housingRoomsSelect = document.querySelector('#housing-rooms');
const housingGuestsSelect = document.querySelector('#housing-guests');

const priceMap = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity,
  },
};


const setFilterChange = (callback) => {
  mapFilters.addEventListener('change', () => {
    callback();
  });
};


const filterAds = ({offer}) => {
  const housingfeaturesChecked = document.querySelectorAll('input[type="checkbox"]:checked');

  const checkFeature = () => {
    if (offer.features) {
      return [...housingfeaturesChecked].every((feature) => (offer.features.includes(feature.value)));
    }
  };

  const checkType = () => offer.type === housingTypeSelect.value || housingTypeSelect.value === DEFAULT_FILTER_VALUE;
  const checkRooms = () => offer.rooms === +housingRoomsSelect.value || housingRoomsSelect.value === DEFAULT_FILTER_VALUE;
  const checkGuests = () => offer.guests === +housingGuestsSelect.value || housingGuestsSelect.value === DEFAULT_FILTER_VALUE;
  const checkPrice = () => housingPriceSelect.value === DEFAULT_FILTER_VALUE ? true :
    offer.price >= priceMap[housingPriceSelect.value].start && offer.price < priceMap[housingPriceSelect.value].end;

  if (
    checkType() &&
    checkRooms() &&
    checkGuests() &&
    checkPrice() &&
    checkFeature()
  ) {
    return true;
  }
};

const createPinList = (offers) => {
  removeAllPins();
  offers
    .slice()
    .filter(filterAds)
    .slice(0, MAX_ADS_COUNT)
    .forEach((offer) => {
      createPinMarker(offer);
    });
};

export {createPinList,setFilterChange,mapFilters};
