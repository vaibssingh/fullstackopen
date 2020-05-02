import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data)
            })
            .catch(err => {
                console.log('Error in getting weather data', err);
            })
    }

    useEffect(hook, [])

    if (!weather || weather.length === 0) {
        return <div>No weather data found</div>
    }

    else {
        return (
            <div>
                <p><strong>Temperature</strong> {weather.current.temperature} Celsius<br />
                    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} /></p>
                <p><strong>Wind</strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}  </p>
            </div>
        )
    }
}

export default Weather