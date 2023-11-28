import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextareaMessage } from '../../../../redux/slices/textareaMessageSlice.js';

import style from './textarea.module.css';

const Textarea = React.memo(() => {
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  const dispatch = useDispatch();

  // функция, обработать изменение текстовой области
  const handleTextareaMessageChange = (event) => {
    const textTextarea = event.target.value;
    dispatch(setTextareaMessage(textTextarea));
  };

  return (
    <textarea
      className={style.item}
      rows='13'
      placeholder='Что нужно сделать?'
      value={textareaMessage}
      onChange={handleTextareaMessageChange}
    ></textarea>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
