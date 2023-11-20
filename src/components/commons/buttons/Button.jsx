import React from 'react';
import style from './button.module.css';
//
function Button({ name }) {
  return (
    <>
      <button className={style.item}>{name}</button>
    </>
  );
}

export default Button;
