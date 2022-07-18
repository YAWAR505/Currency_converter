import React, { useEffect, useState } from "react";
import axios from "axios";

import CurrencyInput from "./CurrencyInput";
import { HiSwitchHorizontal } from "react-icons/hi";

const CurrencyConverter = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("eth");
  const [currency2, setCurrency2] = useState("usd");
  const [rates, setRates] = useState([]);
  const [swap, setSwap] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}.json`
      )
      .then((response) => {
        setRates(response.data[currency1]);
      });
  }, [currency1]);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(3);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  // Function to switch between two currency

  const flip = () => {
    setSwap(!swap);
  };

  return (
    <div className="parentConverter">
      <div className="currency">
        <h1>ETH to USD Converter</h1>
        <div className="input_div">
          {swap ? (
            <>
              <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(rates)}
                amount={amount1}
                currency={currency1}
              />
              <div className="switch">
                <HiSwitchHorizontal size="30px" onClick={flip} />
              </div>
              <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(rates)}
                amount={amount2}
                currency={currency2}
              />
            </>
          ) : (
            <>
              <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(rates)}
                amount={amount2}
                currency={currency2}
              />

              <div className="switch">
                <HiSwitchHorizontal size="30px" onClick={flip} />
              </div>

              <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(rates)}
                amount={amount1}
                currency={currency1}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
