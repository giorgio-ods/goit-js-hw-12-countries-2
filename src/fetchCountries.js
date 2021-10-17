export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(res => {return res.json()});
 }