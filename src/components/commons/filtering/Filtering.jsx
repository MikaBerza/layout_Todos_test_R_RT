import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiltering } from '../../../redux/slices/filteringSlice';

import { arrNameOfFilters } from '../../../utils/modules';
import style from './filtering.module.css';

const Filtering = ({ title }) => {
  const { filteringValue } = useSelector((state) => state.filteringSlice);
  const { searchValue } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  // функция, получить значение выбора
  const getTheSelectionValue = (event) => {
    dispatch(setFiltering(event.target.value));
  };

  return (
    <div className={style.wrapper}>
      <span className={style.text}>{title}</span>
      <select
        className={style.select}
        onChange={(event) => getTheSelectionValue(event)}
        value={
          searchValue.trim().length > 0 ? arrNameOfFilters[0] : filteringValue
        }
      >
        {arrNameOfFilters.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filtering;
