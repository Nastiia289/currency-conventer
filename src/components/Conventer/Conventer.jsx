import React, { useCallback, useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../App";
import s from "./Conventer.module.css";

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
  const getConvertedValue = useCallback(
    (value, currencyFrom, currencyTo) => {
      const firstRate = currencies.find(
        (currency) => currency.cc === currencyFrom
      ).rate;
      const secondRate = currencies.find(
        (currency) => currency.cc === currencyTo
      ).rate;
      const UAH = value * firstRate;
      return UAH / secondRate;
    },
    [currencies]
  );

  const getRoundToTwoDecimalNumbers = useCallback((number) => {
    return Math.round(number * 100) / 100;
  }, []);

  return (
    <div className={s.conventer_general}>
      <div>
        <select
          className={s.conventer_select}
          value={form.firstSelect}
          onChange={(e) => {
            const currencyCode = e.target.value;
            setForm({
              ...form,
              firstSelect: currencyCode,
              firstInput: getRoundToTwoDecimalNumbers(
                getConvertedValue(
                  form.secondInput,
                  form.secondSelect,
                  currencyCode
                )
              ),
            });
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
          type="number"
          placeholder="count"
          className={s.conventer_input}
          value={form.firstInput}
          onChange={(e) => {
            const value = e.target.value;
            setForm({
              ...form,
              firstInput: value,
              secondInput: getRoundToTwoDecimalNumbers(
                getConvertedValue(value, form.firstSelect, form.secondSelect)
              ),
            });
          }}
        />
      </div>
      <div>
        <select
          className={s.conventer_select}
          value={form.secondSelect}
          onChange={(e) => {
            const currencyCode = e.target.value;
            setForm({
              ...form,
              secondSelect: currencyCode,
              secondInput: getRoundToTwoDecimalNumbers(
                getConvertedValue(
                  form.firstInput,
                  form.firstSelect,
                  currencyCode
                )
              ),
            });
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
          type="number"
          className={s.conventer_input}
          placeholder="count"
          value={form.secondInput}
          onChange={(e) => {
            const value = e.target.value;
            setForm({
              ...form,
              secondInput: value,
              firstInput: getRoundToTwoDecimalNumbers(
                getConvertedValue(value, form.secondSelect, form.firstSelect)
              ),
            });
          }}
        />
      </div>
    </div>
  );
};

export default Conventer;
