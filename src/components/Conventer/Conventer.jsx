import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../App";

const Conventer = () => {
  const currencies = useContext(CurrencyContext);
  const [form, setForm] = useState({
    firstInput: "",
    firstSelect: "",
    secondInput: "",
    secondSelect: "",
  });
  useEffect(() => {
    if (!!currencies.length) {
      setForm({
        firstInput: "",
        firstSelect: currencies[0].cc,
        secondInput: "",
        secondSelect: currencies[1].cc,
      });
    }
  }, [currencies]);
  console.log(form);
  return (
    <div>
      <div>
        <div>
          <select
            value={form.firstSelect}
            onChange={(e) => {
              setForm({ ...form, firstSelect: e.target.value });
            }}
          >
            {!!currencies.length &&
              currencies.map((item) => (
                <option key={item.r030} value={item.cc}>
                  {item.txt}
                </option>
              ))}
          </select>
          <input
            placeholder="count"
            value={form.firstInput}
            onChange={(e) => {
              const value = e.target.value;
              const firstRate = currencies.find(
                (currency) => currency.cc === form.firstSelect
              ).rate;
              const secondRate = currencies.find(
                (currency) => currency.cc === form.secondSelect
              ).rate;
              console.log(firstRate, secondRate);
              const UAH = value * firstRate;
              console.log(UAH);
              setForm({ ...form, firstInput: value, secondInput: UAH / secondRate });
            }}
          />
        </div>
        <div>
          <select
            value={form.secondSelect}
            onChange={(e) => {
              setForm({ ...form, secondSelect: e.target.value });
            }}
          >
            {!!currencies.length &&
              currencies.map((item) => (
                <option key={item.r030} value={item.cc}>
                  {item.txt}
                </option>
              ))}
          </select>
          <input
            placeholder="count"
            value={form.secondInput}
            onChange={(e) => {
              setForm({ ...form, secondInput: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Conventer;
