import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../../redux/slices/searchSlice';
import style from './search.module.css';

const Search = React.memo(({ placeholders }) => {
  const { searchValue } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  // функция, обработать изменение ввода
  const handleInputChange = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  return (
    <div className={style.wrapper}>
      <input
        className={style.item}
        type='search'
        placeholder={placeholders}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
});

Search.displayName = 'Search';
export default Search;
