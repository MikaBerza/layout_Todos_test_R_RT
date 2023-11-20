import React from 'react';
import style from './task.module.css';

function Task({
  id,
  note,
  calendarDate,
  sign,
  checking,
  handleCheckboxChange,
  removeTask,
}) {
  return (
    <li className={style.item}>
      <div className={style.inner1}>
        <span className={`${checking ? style.completed : ''} ${style.text}`}>
          {note}
        </span>
        <input
          className={style.checkbox}
          type='checkbox'
          defaultChecked={checking}
          onClick={() => handleCheckboxChange(id)}
        />
      </div>
      <div className={style.inner2}>
        <span className={style.date}>{calendarDate}</span>
        <span className={style.remove} onClick={() => removeTask(id)}>
          {sign}
        </span>
      </div>
    </li>
  );
}

export default Task;
