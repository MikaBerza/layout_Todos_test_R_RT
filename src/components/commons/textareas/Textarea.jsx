import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';

import style from './textarea.module.css';

const Textarea = React.memo(({ placeholders }) => {
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
      placeholder={placeholders}
      value={textareaMessage}
      onChange={handleTextareaMessageChange}
    ></textarea>
  );
});

// для отображения имени компонента в дереве компонентов
// используем метод displayName
Textarea.displayName = 'Textarea';
export default Textarea;
