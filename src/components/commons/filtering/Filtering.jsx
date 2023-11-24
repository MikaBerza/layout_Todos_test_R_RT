import React from 'react';
import { useDispatch } from 'react-redux';
import { setFiltering } from '../../../redux/slices/filteringSlice';
import style from './filtering.module.css';

const Filtering = ({ title, nameOfFilters }) => {
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
      >
        {nameOfFilters.map((item, index) => {
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
