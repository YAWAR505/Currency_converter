
import { MenuItem, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import '../App.css';

const CurrencyInput = ({ onAmountChange, amount, options, setCurrency, values, info }) => {



    return (

        <div className="container">
            <div className="left">
                <TextField
                    type="text"
                    label="Amount"
                    value={amount}
                    size="lg"
                    placeholder="Enter amount"
                    onChange={onAmountChange}
                    variant="outlined"
                    fullWidth

                />


                <Dropdown
                    options={options}
                    onChange={(e) => { setCurrency(e.value) }}
                    value={values}
                    placeholder="From"
                />
            </div>



        </div>

    );
}

export default CurrencyInput;
