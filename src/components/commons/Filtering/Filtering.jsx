import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiltering } from '../../../redux/slices/filteringSlice';

import { arrNameOfFilters } from '../../../utils/modules';
import style from './filtering.module.css';

const Filtering = React.memo(() => {
  const { filteringValue } = useSelector((state) => state.filteringSlice);
  const { searchValue } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  // функция, получить значение выбора
  const getTheSelectionValue = (event) => {
    dispatch(setFiltering(event.target.value));
  };

  // вынес условие в отдельную константу
  const filteredValue = searchValue.trim().length
    ? arrNameOfFilters[0]
    : filteringValue;

  // функция, сгенерировать (JSX) элемент (option)
  const generateOptionElement = (item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  );

  return (
    <div className={style.wrapper}>
      <span className={style.text}>Фильтрация</span>
      <select
        className={style.select}
        onChange={getTheSelectionValue}
        value={filteredValue}
      >
        {arrNameOfFilters.map(generateOptionElement)}
      </select>
    </div>
  );
});

Filtering.displayName = 'Filtering';
export default Filtering;
