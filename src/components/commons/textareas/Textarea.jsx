import React from 'react';
import style from './textarea.module.css';
//
function Textarea() {
  return (
    <textarea
      className={style.textarea}
      rows='13'
      placeholder='Что нужно сделать?'
    ></textarea>
  );
}

export default Textarea;