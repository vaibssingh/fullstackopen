import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const CountryDetails = ({ name, capital, population, languages, flag }) => {
    return <div key={name}>
        <h2>{name}</h2>
        <p>Capital {capital}</p>
        <p>Population {population}</p>
        <h4>Spoken Languages</h4>
        <ul><Languages languages={languages} /></ul>
        <p><img src={flag} alt='the country flag' width="200" height="150" /></p>
        <h2>Weather in <strong>{capital}</strong></h2>
        <Weather capital={capital} />
    </div>;
}

export default CountryDetails