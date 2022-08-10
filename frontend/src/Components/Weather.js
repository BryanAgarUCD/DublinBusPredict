import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useState, useEffect } from 'react';
import countries from 'i18n-iso-countries';
const customStyles = {
	fontFamily:  'Helvetica, sans-serif',
	gradientStart:  '#0181C2',
	gradientMid:  '#04A7F9',
	gradientEnd:  '#4BC4F7',
	locationFontColor:  '#FFF',
	todayTempFontColor:  '#FFF',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',
};

function WeatherCard() {
//   const { data,isLoading, errorMessage } = useOpenWeather({
//     key: 'f775d12211646f76b3f266a5076c78a9',
//     lat: '53.344',
//     lon: '-6.2672',
//     lang: 'en',
//     unit: 'metric', // values are (metric, standard, imperial)
//   });

const [apiData, setApiData] = useState({});
const [getState, setGetState] = useState('Dublin');
const [state, setState] = useState('Dublin');

const apiKey = 'f775d12211646f76b3f266a5076c78a9';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  
  const submitHandler = () => {
    setState(getState);
  };
  
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
    <header className="flex justify-center items-center">
      <h2 className='text-3xl font-bold mb-8'>Current weather in Dublin</h2>
    </header>
    <div className="container mx-auto sm:px-4">
      <div className="mt-3 flex flex-col justify-center items-center">
        <div class="col-auto">
          {/* <label for="location-name" class="col-form-label">
            Enter Location :
          </label> */}
        </div>
        <div class="col-auto">
          
        </div>
        {/* <button className="btn btn-primary mt-2" onClick={submitHandler}>
          Search
        </button> */}
      </div>
        
      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mt-3 mx-auto">
        {apiData.main ? (
          <div class="flex-auto p-6 text-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <p className="h2">
              {kelvinToFarenheit(apiData.main.temp)}&deg; C
            </p>

            <p className="h5">
              <i className="fas fa-map-marker-alt"></i>{' '}
              <strong>{apiData.name}</strong>
            </p>

            <div className="flex flex-wrap  mt-4">
              <div className="md:w-1/2 pr-4 pl-4">
                <p>
                  <i class="fas fa-temperature-low "></i>{' MIN '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                  </strong>
                </p>
                <p>
                  <i className="fas fa-temperature-high"></i>{' MAX '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                  </strong>
                </p>
              </div>
              <div className="md:w-1/2 pr-4 pl-4">
                <p>
                  {'  '}
                  <strong>{apiData.weather[0].main}</strong>
                </p>
                <p>
                  <strong>
                    {' '}
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official',
                    })}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
    <footer className="footer">
    </footer>
  </div>
  );
          }
export default WeatherCard;