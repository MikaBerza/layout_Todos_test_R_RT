import React from 'react';
import style from './outputTask.module.css';
//
function OutputTask() {
  return (
    <section className={style.wrapper}>
      <ul className={style.list}>
        <li className={style.item}>
          <div className={style.inner1}>
            <span className={style.text}>текст</span>
            <input className={style.checkbox} type='checkbox' checked='off' />
          </div>
          <div className={style.inner2}>
            <span className={style.date}>22/12/22, 13:32</span>
            <span className={style.remove}>x</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default OutputTask;
