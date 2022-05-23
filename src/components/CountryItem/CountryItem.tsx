import React from "react";
import { Data } from "../../shared/types/types";

import style from "./CountryItem.module.css";

interface Props {
  country: Data;
}

export default function CountryItem({ country }: Props) {
  return (
    <li className={style.item}>
      <h2 className={style.title}>
        <span className={style.description}>Name: </span> {country.name}
      </h2>
      <p className={style.text}>
        <span className={style.description}>Region: </span> {country.region}
      </p>
      <p className={style.text}>
        <span className={style.description}>Area: </span>
        {country.area}
      </p>
    </li>
  );
}
