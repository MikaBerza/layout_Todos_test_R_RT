import React from 'react';
import style from './button.module.css';

function Button({ name, addTaskToTheList }) {
  return (
    <>
      <button className={style.item} onClick={addTaskToTheList}>
        {name}
      </button>
    </>
  );
}

export default Button;
