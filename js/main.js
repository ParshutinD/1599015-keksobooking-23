import './form.js';
import './map.js';
import './api.js';
import './filters.js';
import {debounce} from './utils/debounce.js';
import {setResetButtonClick} from './map.js';
import {getData} from './api.js';
import {createPinList,setFilterChange} from './filters.js';
import {disableFilterForm,activeForm} from './form.js';

const CREATE_DELAY = 500;
disableFilterForm();

getData((ads) => {
  createPinList(ads);
  setFilterChange(debounce(
    () => createPinList(ads),
    CREATE_DELAY,
  ));
  setResetButtonClick(() => createPinList(ads));
  activeForm();
});
