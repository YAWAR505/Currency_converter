
import { MenuItem, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import '../App.css';

const CurrencyInput = ({ onAmountChange, amount, options, setCurrency, values }) => {
    return (

        <div className="container">
            <div className="left">
                <input
                    className="text_field"
                    type="text"
                    value={amount}
                    onChange={onAmountChange}
                />
                <Dropdown
                    className='dropdown'
                    options={options}
                    onChange={(e) => { setCurrency(e.value) }}
                    value={values.toUpperCase()}
                    placeholder="From"
                />
            </div>



        </div>

    );
}

export default CurrencyInput;
