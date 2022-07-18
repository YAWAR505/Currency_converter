import "react-dropdown/style.css";
import "../App.css";
const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <div className="container">
      <div className="left">
        <input
          className="text_field"
          type="text"
          value={amount}
          onChange={(ev) => onAmountChange(ev.target.value)}
        />
        <select
          className="select_box"
          value={currency}
          onChange={(ev) => onCurrencyChange(ev.target.value)}
        >
          {currencies.map((currency) => (
            <option value={currency} key={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;
