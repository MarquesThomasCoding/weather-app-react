import TodayComponent from "./components/Today";
import ForecastComponent from "./components/Forecast";
import SearchComponent from "./components/Search";
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("Paris");

  const searchSetCity = (city) => {
    setCity(city);
  }

  return (
    <div className="app">
      <div className="search-card">
        <SearchComponent setCity={searchSetCity} />
      </div>
      <TodayComponent city={city} />
      <h2 className="forecast-title">Next 5 days :</h2>
      <ForecastComponent city={city} />
    </div>
  );
};

export default App;
