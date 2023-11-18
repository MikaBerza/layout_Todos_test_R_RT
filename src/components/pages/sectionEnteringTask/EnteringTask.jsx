import React from 'react';
import style from './enteringTask.module.css';

import Button from '../../commons/buttons/Button';
import Textarea from '../../commons/textareas/Textarea';
//
function EnteringTask() {
  return (
    <section className={style.wrapper}>
      <div className={style.textareas}>
        <Textarea />
      </div>
      <div className={style.buttons}>
        <Button name={'Выбрать всё'} />
        <Button name={'Удалить'} />
        <Button name={'Добавить'} />
      </div>
    </section>
  );
}

export default EnteringTask;
