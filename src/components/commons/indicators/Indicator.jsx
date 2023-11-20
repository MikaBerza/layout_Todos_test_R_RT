import React from 'react';
import style from './indicator.module.css';

function Indicator({ nameOfStatuses }) {
  return (
    <div className={style.wrapper}>
      <div className={style.tasks}>
        {nameOfStatuses.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>
      <meter
        className={style.stripe}
        value='0'
        min='0'
        max='0'
        low='0'
        high='0'
      ></meter>
    </div>
  );
}

export default Indicator;
