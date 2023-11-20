import React from 'react';
import style from './task.module.css';
//
function Task({ note, checking, calendarDate, sign }) {
  return (
    <li className={style.item}>
      <div className={style.inner1}>
        <span className={style.text}>{note}</span>
        <input
          className={style.checkbox}
          type='checkbox'
          checked={checking}
        />
      </div>
      <div className={style.inner2}>
        <span className={style.date}>{calendarDate}</span>
        <span className={style.remove}>{sign}</span>
      </div>
    </li>
  );
}

export default Task;
