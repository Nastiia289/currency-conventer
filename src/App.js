import { createContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Conventer from "./components/Conventer/Conventer";
import Header from "./components/Header/Header";
import { CURRENCIES } from "./constants/constants";

export const CurrencyContext = createContext([]);

function App() {
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
        { crossDomain: true }
      )
      .then((res) => res.data)
      .then((result) => {
        const arr = [];
        [CURRENCIES.USD, CURRENCIES.EUR, CURRENCIES.PLN].forEach(
          (currencyCode) => {
            const currency = result.find(
              (currency) => currency.cc === currencyCode
            );
            if (currency) {
              arr.push(currency);
            }
          }
        );
        setCurrencies(arr);
      });
  }, []);
  return (
    <CurrencyContext.Provider value={currencies}>
      <div className="App">
        <Header />
        <h2 className="body_title">Конвертатор коштів</h2>
        <Conventer />
      </div>
    </CurrencyContext.Provider>
  );
}

export default App;
