import React from 'react';
import CountryDetails from './CountryDetails';

const ShowCountryName = (filteredCountries, onButtonClick) => {
    return filteredCountries.map(country =>
        <div>
            <li key={country.name}> {country.name} <button onClick={onButtonClick} country={country.name}>show</button></li>
        </div>
    )
}

const Countries = ({ countries, filter, onButtonClick }) => {
    if (filter) {
        let filteredCountries = countries.filter(country => new RegExp(filter, "i").test(country.name));

        if (filteredCountries.length > 10) {
            return <div>Too many matches, specify another filter</div>
        }

        if (filteredCountries.length === 1) {
            return filteredCountries.map(country => {
                return <CountryDetails key={country.alpha2Code} name={country.name} capital={country.capital}
                    population={country.population} languages={country.languages} flag={country.flag} />
            })
        }
        else {
            return ShowCountryName(filteredCountries, onButtonClick)
        }
    }
    else {
        return null
    }
}

export default Countries