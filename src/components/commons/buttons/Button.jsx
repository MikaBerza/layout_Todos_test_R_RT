import React from 'react';
import style from './button.module.css';

const Button = ({ name, addTaskToTheList }) => {
  return (
    <>
      <button className={style.item} onClick={addTaskToTheList}>
        {name}
      </button>
    </>
  );
};

export default Button;
