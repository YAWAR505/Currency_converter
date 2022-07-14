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
    const [FromAmounts, setFromAmounts] = useState(0);
    const [ToAmounts, setToAmounts] = useState(0);


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


    useEffect(() => {
        setOptions(Object.keys(info));
    }, [info])

    // Function to switch between two currency

    const flip = () => {
        var temp = from;
        // var swap = toAmount
        // toAmount = fromAmount
        // setAmount(swap)
        setFrom(to);
        setTo(temp);
    }

    //  average the values  

    useEffect(() => {
        setToAmounts(format((amount * info[to]), 3))
        setFromAmounts(format((amount / info[from]), 3))
    }, [amount, info])
    return (
        <div className='parentConverter'>
            <div className='currency'>
                <h1>
                    ETH to USD Converter
                </h1>
                <div className='input_div'>
                    <CurrencyInput
                        amount={FromAmounts}
                        onAmountChange={handleFromAmountChange}
                        options={options.map((name) => name.toUpperCase())}
                        setCurrency={setFrom}
                        values={from}
                    />
                    <div className="switch">
                        <HiSwitchHorizontal size="30px"
                            onClick={flip} />
                    </div>
                    <CurrencyInput
                        amount={ToAmounts}
                        onAmountChange={handleToAmountChange}
                        options={options.map((name) => name.toUpperCase())}
                        setCurrency={setTo}
                        values={to}

                    />
                </div>

            </div>
        </div>
    )
}

export default CurrencyConverter
