import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../../redux/slices/searchSlice';
import style from './search.module.css';

const Search = ({ placeholders }) => {
  const { searchValue } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

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
};

export default Search;
