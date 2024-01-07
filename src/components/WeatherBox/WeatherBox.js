import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setWeatherData(null);
    setIsLoading(true);
    setError(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e8129ecc5de7d75d1b88b08deccddb4&units=metric`)
      .then(res =>{
        if(res.status ===200){
          return res.json()
            .then(data => {
              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main,
              });
              setIsLoading(false);
              console.log(data);
            })
        } else {
          setError(true);
          setIsLoading(false);
        }

      }
      )
  },[]);
  
  return (
    <section>
      <PickCity onSearch={handleCityChange} />
      { weatherData && <WeatherSummary {...weatherData} /> }
      { isLoading && <Loader /> }
      { error && <ErrorBox>There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;