import React, { Component } from 'react';
import css from './countries.module.css';

export default class Country extends Component {
    render() {
        const { country } = this.props;
        const { name, flag } = country;
        return (
            <div className={`${css.border} ${css.country}`}>
                <img src={flag} alt={name} />
                <span className={css.countryName}>{name}</span>
            </div>
        );
    }
}
