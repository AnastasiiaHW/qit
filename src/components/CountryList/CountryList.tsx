import React, { useEffect, useId, useState } from "react";
import Select from "react-select";
import {
  initialValue,
  reverseValue,
} from "../../shared/components/countOfPage";
import { Pagination } from "../../shared/components/Pagination/Pagination";
import useAxiosFetch from "../../shared/hooks/useAxios";
import { url } from "../../shared/services";
import { Data } from "../../shared/types/types";
import { iOption } from "../../shared/types/types";
import CountryItem from "../CountryItem/CountryItem";
import style from "./CountryList.module.css";

export default function CountryList() {
  const { data } = useAxiosFetch(url, 0);
  const [page, setPage] = useState(1);

  const [countries, setCountries] = useState<Data[]>([]);

  useEffect(() => {
    if (data) setCountries(initialValue(page, data));
  }, [data, page]);

  const totalPages = data ? data?.length / 10 : 10;

  const handlePages = (updatePage: number) => {
    if (updatePage < 1 || updatePage > totalPages) return;
    setPage(updatePage);
    setCountries(initialValue(page, data));
  };

  const id = useId();

  const sortByName = () => {
    setCountries(reverseValue(page, data));
  };

  const filterC = (value: {}) => {
    const sortArea = data?.filter((el: Data) => el.area < 65300);
    const sortRegion = data?.filter((el: Data) => el.region === "Oceania");

    if (value === 65300) setCountries(initialValue(page, sortArea));
    if (value === "Oceania") setCountries(initialValue(page, sortRegion));
  };

  const options = [
    { value: 65300, label: "Small than Lithuania" },
    { value: "Oceania", label: "Oceania region" },
  ];

  return (
    <>
      <div className={style.container}>
        <div className={style.filter}>
          <button onClick={sortByName} className={style.btn}>
            Sort by name
          </button>
          <Select
            options={options}
            isMulti={false}
            onChange={(option) => filterC((option as iOption).value)}
          />
        </div>
        <ul className={style.list}>
          {countries?.map((el: Data, idx) => (
            <CountryItem country={el} key={`${id} + ${idx}`} />
          ))}
        </ul>
      </div>
      <div className="container">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePages}
        />
      </div>
    </>
  );
}
