import { useCallback } from 'react';
import './App.css';
import CurrencyConverter from './Components/CurrencyConverter';

function App() {
  const format = useCallback((value, number) => {
    if (!(value % 1 === 0)) {
      return value.toFixed(number);
    } else {
      return value;
    }
  }, [])
  return (
    <div >
      <CurrencyConverter format={format} />
    </div>
  );
}

export default App;
