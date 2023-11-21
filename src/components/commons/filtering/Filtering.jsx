import React from 'react';
import style from './filtering.module.css';

const Filtering = ({ title, nameOfFilters }) => {
  return (
    <div className={style.wrapper}>
      <span className={style.text}>{title}</span>
      <select className={style.select}>
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
