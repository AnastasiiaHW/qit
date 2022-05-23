import { Data } from "../types/types";

export const initialValue = (
  page: number,
  country: [] | null | undefined | Data[]
) => {
  const startSlice = page === 1 ? 0 : page * 10;
  const endSlice = page === 1 ? 10 : page * 10 + 10;
  return country ? country?.slice(startSlice, endSlice) : [];
};

export const reverseValue = (
  page: number,
  country: Data[] | null | undefined
) => {
  const startSlice = page === 1 ? 0 : page * 10;
  const endSlice = page === 1 ? 10 : page * 10 + 10;
  return country ? country?.reverse().slice(startSlice, endSlice) : [];
};
