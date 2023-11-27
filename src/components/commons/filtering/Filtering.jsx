import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiltering } from '../../../redux/slices/filteringSlice';

import { arrNameOfFilters } from '../../../utils/modules';
import style from './filtering.module.css';

const Filtering = React.memo(({ title }) => {
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
});

// для отображения имени компонента в дереве компонентов 
// используем метод displayName
Filtering.displayName = 'Filtering';
export default Filtering;
