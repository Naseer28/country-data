import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import countriesData from './countries.json';  // Import your JSON data
import './SearchBar.css';  // Import your CSS file

// Function to get suggestions based on input value
const getSuggestions = (value) => {
  const inputValue = value.toLowerCase();
  return countriesData.countries.filter(country =>
    country.country.toLowerCase().includes(inputValue) ||
    country.capital.toLowerCase().includes(inputValue)
  );
};

// Function to get the value of a suggestion
const getSuggestionValue = (suggestion) => suggestion.country;

// Function to render each suggestion
const renderSuggestion = (suggestion) => {
  // Check if official_language is an array or a string
  const officialLanguage = Array.isArray(suggestion.official_language)
    ? suggestion.official_language.join(', ')
    : suggestion.official_language;

  return (
    <div className="react-autosuggest__suggestion">
      <div className="suggestion-text">{suggestion.country}</div>
      <div className="suggestion-info">{suggestion.capital}</div>
      <div className="suggestion-details">
        <div>Population: {suggestion.population.toLocaleString()}</div>
        <div>Currency: {suggestion.currency}</div>
        <div>Languages: {officialLanguage}</div>
      </div>
    </div>
  );
};

const SearchBar = () => {
  const [value, setValue] = useState('');  // State for input value
  const [suggestions, setSuggestions] = useState([]);  // State for suggestions
  const [selectedCountry, setSelectedCountry] = useState(null);  // State for selected country

  // Handle input change
  const onChange = (event, { newValue }) => {
    setValue(newValue);

    // Clear selected country if input is empty
    if (newValue === '') {
      setSelectedCountry(null);
    }
  };

  // Fetch suggestions when input value changes
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Clear suggestions when input value is cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Handle suggestion selection
  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedCountry(suggestion);
    setValue(suggestion.country); // Optionally set the input value to the selected country
  };

  // Props for the input element
  const inputProps = {
    placeholder: 'Search by country name or capital',
    value,
    onChange,
    className: 'autosuggest-input'
  };

  return (
    <div className="search-bar-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}  // Handle selection
      />
      
      {selectedCountry && value !== '' && (
        <div className="country-details">
          <h2>{selectedCountry.country}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Currency:</strong> {selectedCountry.currency}</p>
          <p><strong>Official Language(s):</strong> {Array.isArray(selectedCountry.official_language)
            ? selectedCountry.official_language.join(', ')
            : selectedCountry.official_language}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
