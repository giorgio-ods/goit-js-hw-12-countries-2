import fetchCountries from './fetchCountries.js';
import './sass/main.scss';
import countryTpl from '../templates/country-card.hbs';
import countriesTpl from '../templates/countries-list.hbs';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';    
const debounce = require('lodash.debounce');
let foundCountry = ' ';

// function fetchCountries() {
//     return fetch(`https://restcountries.eu/rest/v2/name/ukraine`).then(res => {return res.json() });
   
// }

    const inputField = document.getElementById('js-search-input');
    const countriesContainer = document.getElementById('js-countries-container')

   
inputField.addEventListener('input', 
  debounce(() => {
    onSearch();
  }, 500),
);


function onSearch() {
  resetSearch();
  foundCountry = inputField.value;
  return fetchCountries(foundCountry)
    .then(renderMarkup)
    .catch(err => console.log(err));
}

function resetSearch() {
  countriesContainer.innerHTML = ' ';
}

function renderMarkup(countries) {
  if (countries.length === 1) {
    resetSearch();
    markupCountries(countryTpl, countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    resetSearch();
    markupCountries(countriesTpl, countries);
  } else if (countries.length > 10) {
    resultMessage(
      error,
      'To many matches found. Please enter a more specific query!',
    );
  } else {
    resultMessage(info, 'No matches found!');
  }
}

function resultMessage(typeInfo, textInfo) {
  typeInfo({
    text: `${textInfo}`,
    delay: 1000,
    closerHover: true,
  });
}

function markupCountries(tpl, countries) {
  countriesContainer.insertAdjacentHTML('beforeend', tpl(countries));
}   