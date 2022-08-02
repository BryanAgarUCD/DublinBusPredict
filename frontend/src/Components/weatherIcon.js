import { useState, useEffect } from 'react';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function WeatherIcon() {

    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState('Dublin');
    const [state, setState] = useState('Dublin');

    const apiKey = '3d2cae43935ab6fcf8436e45feb7510e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setApiData(data));
    }, [apiUrl]);

    return (
            
        <div>

            {apiData.main ? (
            <div class="weatherIconContainer">
                <span className='weatherDescription'>
                    {capitalize(apiData.weather[0].description)}
                </span>
                <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weatherIcon"
                />
            </div>

            ) : (
            <h1>Loading</h1>
            )}
        </div>

    );

}

export default WeatherIcon;
