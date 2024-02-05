import { useState, useEffect } from 'react';

export default function ForecastComponent(city) {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchCity = city.city;

    useEffect(() => {
        const fetchForecast = async () => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b01876319e9d4a949d0154404242001&q=${searchCity}&days=3`);
            
            if (!response.ok) {
                throw new Error(`No city found for "${searchCity}"`);
            }

            const result = await response.json();
            setForecast(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        };

        fetchForecast();
    }, [searchCity]); // Le tableau vide [] en tant que dépendance signifie que cela s'exécute une seule fois après le rendu initial.

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        const message = `No city found for "${searchCity}"`;
        return (
            <div className="error-card">
                <h2>{message}</h2>
            </div>
        );
    }

    return (
        <ul className='forecast-list'>
            {forecast.forecast.forecastday.map((day) => (
                <li className='forecast-item' key={day.date}>
                    <div className='forecast-infos-wrapper'>
                        <div className='forecast-infos'>
                            <p className='forecast-date'>{day.date.split(' ')[0].split('-').reverse().join('/')}</p>
                            <p className='forecast-temp'>Max. <span className='forecast-temp-number'>{day.day.maxtemp_c}°C</span></p>
                            <p className='forecast-temp'>Min. <span className='forecast-temp-number'>{day.day.mintemp_c}°C</span></p>
                        </div>
                        <img className='forecast-condition' src={day.day.condition.icon} alt={day.day.condition.text} />
                    </div>
                    <div className='location-conditions'>
                        <p><i className="fa-solid fa-droplet"></i> Humidity: {day.day.avghumidity}%</p>
                        <p><i className="fa-solid fa-wind"></i> Wind: {day.day.maxwind_kph} km/h</p>
                        <p><i className="fa-solid fa-umbrella"></i> Risk of rain: {day.day.daily_chance_of_rain}%</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}