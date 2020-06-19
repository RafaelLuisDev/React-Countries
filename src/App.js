import React, { Component } from 'react';
import Countries from './Components/countries/Countries';
import Header from './Components/header/Header';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            allCountries: [],
            filteredCountries: [],
            filteredPopulation: 0,
            filter: '',
        };
    }

    async componentDidMount() {
        const res = await fetch('https://restcountries.eu/rest/v2/all');
        const json = await res.json();

        const allCountries = json.map(({ name, numericCode, flag, population }) => {
            return {
                id: numericCode,
                name,
                filterName: name.toLowerCase(),
                flag,
                population,
            };
        });

        this.setState({
            allCountries,
            filteredCountries: allCountries,
            filteredPopulation: this.calculateTotalPopulationFrom(allCountries),
        });
    }

    calculateTotalPopulationFrom = (countries) => {
        const totalPopulation = countries.reduce((total, country) => {
            return total + country.population;
        }, 0);

        return totalPopulation;
    };

    handleChangeFilter = (newText) => {
        this.setState({
            filter: newText,
        });

        const newTextLowerCase = newText.toLowerCase();

        const filteredCountries = this.state.allCountries.filter((country) => {
            return country.filterName.includes(newTextLowerCase);
        });

        this.setState({
            filteredCountries,
            filteredPopulation: this.calculateTotalPopulationFrom(filteredCountries),
        });
    };

    render() {
        const { filteredCountries, filteredPopulation, filter } = this.state;

        return (
            <div className="container">
                <h1 className="title">React Countries</h1>
                <Header filter={filter} countryCount={filteredCountries.length} totalPopulation={filteredPopulation} onChangeFilter={this.handleChangeFilter} />
                <Countries countries={filteredCountries} />
            </div>
        );
    }
}
