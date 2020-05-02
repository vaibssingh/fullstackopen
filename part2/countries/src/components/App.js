import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const handleFilterChange = (event) => setFilter(event.target.value)
    const handleButtonClick = (event) => setFilter(event.target.attributes.country.value)


    return (
        <div>
            <Filter
                filter={filter}
                onFilterChange={handleFilterChange}
            />
            <Countries 
            countries={countries}
            filter={filter}
            onButtonClick={handleButtonClick}
            />
        </div>
    )
}

export default App