import React from 'react';
import style from './counters.module.css';
//
function Counters({ nameOfStatuses }) {
  return (
    <div className={style.wrapper}>
      <div className={style.tasks}>
        {nameOfStatuses.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>
      <meter
        className={style.indicator}
        value='0'
        min='0'
        max='0'
        low='0'
        high='0'
      ></meter>
    </div>
  );
}

export default Counters;
