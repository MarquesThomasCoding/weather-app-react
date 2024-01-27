import { useState, useEffect } from 'react';

export default function TodayComponent(city) {
    const [today, setToday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchCity = city.city;

    useEffect(() => {
        const fetchToday = async () => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b01876319e9d4a949d0154404242001&q=${searchCity}`);
            
            if (!response.ok) {
                throw new Error(`No city found for "${searchCity}"`);
            }

        const result = await response.json();
        setToday(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        };

        fetchToday();
    },[searchCity]); // Le tableau vide [] en tant que dépendance signifie que cela s'exécute une seule fois après le rendu initial.

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        const message = `No city found for "${searchCity}"`;
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return (
            <div className="error-card">
                <h2>{message}</h2>
                <p>You will be redirected in 2 seconds</p>
            </div>
        );
    }

    return (
        <div className="location-card">
            <h2>Current weather: <span>{today.current.condition.text}</span></h2>
            <aside className='section-current-conditions'>
                <img src={today.current.condition.icon} alt={today.current.condition.text} />
                <p className='location-temp'>{today.current.temp_c}°C</p>
                <div className='location-conditions'>
                    <p><i className="fa-solid fa-droplet"></i> Humidity: {today.current.humidity}%</p>
                    <p><i className="fa-solid fa-wind"></i> Wind: {today.current.wind_kph} km/h</p>
                    <p><i className="fa-solid fa-arrow-down"></i> Pressure: {today.current.pressure_mb} mb</p>
                </div>
            </aside>
            <div className='location'>
                <h2 className="location-name">{today.location.name}</h2>
                <p className='location-region'>{today.location.region}, {today.location.country}</p>
                {/* Date mise en format jj/mm/aaaa hh:mm */}
                <p className='location-date'>{today.location.localtime.split(' ')[0].split('-').reverse().join('/')} {today.location.localtime.split(' ')[1]}</p>
            </div>
        </div>
    );
}