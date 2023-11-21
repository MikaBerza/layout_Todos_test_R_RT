import React from 'react';
import style from './search.module.css';

const Search = ({ placeholders }) => {
  return (
    <div className={style.wrapper}>
      <input className={style.item} type='search' placeholder={placeholders} />
    </div>
  );
};

export default Search;
