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


    console.log(info, 'info');
    // Calling the api whenever the dependency changes

    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/.json`)
            .then((res) => {
                setInfo(res.data);
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


    useEffect(() => {
        setOptions(Object.keys(info));
    }, [info])
    // Function to switch between two currency

    const flip = () => {
        var temp = from;
        // var current = toAmount
        // toAmount = amount
        // setAmount(current)
        setFrom(to);
        setTo(temp);
    }

    let fromAmount, toAmount
    useEffect(() => {
        if (amountInFromCurrency) {
            fromAmount = amount
            var rate = info[to]
            toAmount = format((amount * rate), 3);
            // setToAmounts(toAmount)
        } else {
            toAmount = amount
            var rates = info[to]
            fromAmount = format((amount / rates), 3);
            // setFromAmounts(fromAmount)
        }
    }, [amountInFromCurrency, amount, info])

    return (
        <div className='parentConverter'>
            <div className='currency'>
                <h1>
                    ETH to USD Converter
                </h1>
                <div className='input_div'>
                    <CurrencyInput
                        amount={fromAmount}
                        onAmountChange={handleFromAmountChange}
                        options={options.filter((name) => name === "eth".toUpperCase())}
                        setCurrency={setFrom}
                        values={from}
                    />
                    <div className="switch">
                        <HiSwitchHorizontal size="30px"
                            onClick={flip} />
                    </div>
                    <CurrencyInput
                        amount={toAmount}
                        onAmountChange={handleToAmountChange}
                        options={options.filter((name) => name === "usd".toUpperCase())}
                        setCurrency={setTo}
                        values={to}

                    />
                </div>

            </div>
        </div>
    )
}

export default CurrencyConverter
