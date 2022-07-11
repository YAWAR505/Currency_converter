import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios';
import CurrencyInput from './CurrencyInput'
import { HiSwitchHorizontal } from 'react-icons/hi';

const CurrencyConverter = ({ format }) => {
    const [info, setInfo] = useState([]);
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("eth");
    const [to, setTo] = useState("usd");
    const [options, setOptions] = useState([]);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    const handleFromAmountChange = useCallback((e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }, [])

    const handleToAmountChange = useCallback((e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }, [])

    // Calling the convert function whenever
    // a user switches the currency

    useEffect(() => {
        setOptions(Object.keys(info));
    }, [info])
    // Function to switch between two currency

    const flip = () => {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
    let fromAmount, toAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        var rate = info[to]
        console.log(rate, 'rate');
        toAmount = format((amount * rate), 3);

    } else {
        toAmount = amount
        fromAmount = format((amount / rate), 3);

    }

    return (
        <div className='currency'>
            < CurrencyInput amount={fromAmount} onAmountChange={handleFromAmountChange} options={options} setCurrency={setFrom} values={from} info />
            <div className="switch">
                <HiSwitchHorizontal size="30px"
                    onClick={flip} />
            </div>
            < CurrencyInput amount={toAmount} onAmountChange={handleToAmountChange} options={options} setCurrency={setTo} values={to} info={info} />

        </div>
    )
}

export default CurrencyConverter
