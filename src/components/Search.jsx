import { useState } from 'react';

export default function SearchComponent(searchSetCity) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        searchSetCity.setCity(searchInput);
    };

    return (
        <div className="search-card">
            <h2>Search for a city</h2>
            <div className='search-input'>
                <input
                    id='search-input'
                    type="text"
                    placeholder="Enter a city"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button onClick={handleSearch} type="submit">
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>
        </div>
    );
}
