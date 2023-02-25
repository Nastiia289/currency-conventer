import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import s from "./Header.module.css";
import { CurrencyContext } from "../../App";

const Header = () => {
  const currencies = useContext(CurrencyContext);
  return (
    <div className={s.header}>
      <div className={s.header_logo}>
        <img src="https://cdn-icons-png.flaticon.com/512/3037/3037156.png" />
        <p>Поточний курс валют</p>
      </div>
      <div className={s.header_list}>
        {!!currencies.length &&
          currencies.map((item) => (
            <div className={s.header_item} key={item.r030}>
              {item.txt} {item.rate}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
