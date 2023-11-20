import React from 'react';
import style from './textarea.module.css';

function Textarea({ placeholders }) {
  return (
    <textarea
      className={style.item}
      rows='13'
      placeholder={placeholders}
    ></textarea>
  );
}

export default Textarea;
