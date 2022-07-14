import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios';
import CurrencyInput from './CurrencyInput'
import { HiSwitchHorizontal } from 'react-icons/hi';

const CurrencyConverter = ({ format }) => {
    const [info, setInfo] = useState([]);
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("eth");
    const [to, setTo] = useState("usd");
    const [options, setOptions] = useState([]);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [FromAmounts, setFromAmounts] = useState(0);
    const [ToAmounts, setToAmounts] = useState(0);
    const [input, setInput] = useState(false)


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
        setInput(true)
        // setFromAmounts(amount)


    }, [])

    const handleToAmountChange = useCallback((e) => {
        setAmount(e.target.value);
        setInput(false)
    }, [])

    useEffect(() => {
        setOptions(Object.keys(info));
    }, [info])

    // Function to switch between two currency

    const flip = () => {
        setAmountInFromCurrency(!amountInFromCurrency)

    }

    let fromAmount, toAmount;
    if (input) {
        fromAmount = amount;
        toAmount = format(amount * info[to], 3);
        // setAmount(toAmount);
    } else {
        toAmount = amount;
        fromAmount = amount
        // setFromAmounts(fromAmount)
    }

    return (
        <div className='parentConverter'>
            <div className='currency'>
                <h1>
                    ETH to USD Converter
                </h1>
                <div className='input_div'>
                    <CurrencyInput
                        amount={amountInFromCurrency ? fromAmount : toAmount}
                        onAmountChange={handleFromAmountChange}
                        options={options}
                        setCurrency={setFrom}
                        values={amountInFromCurrency ? from : to}
                    />
                    <div className="switch">
                        <HiSwitchHorizontal size="30px"
                            onClick={flip} />
                    </div>
                    <CurrencyInput
                        amount={amountInFromCurrency ? toAmount : fromAmount}
                        onAmountChange={handleToAmountChange}
                        options={options}
                        setCurrency={setTo}
                        values={amountInFromCurrency ? to : from}


                    />
                </div>

            </div>
        </div>
    )
}

export default CurrencyConverter
