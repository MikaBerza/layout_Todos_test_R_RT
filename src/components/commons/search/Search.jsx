import React from 'react';
import style from './search.module.css';

export default function Search({ placeholders }) {
  return (
    <div className={style.wrapper}>
      <input className={style.item} type='search' placeholder={placeholders} />
    </div>
  );
}
