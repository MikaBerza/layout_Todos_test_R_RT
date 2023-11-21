import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskListData } from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';

import {
  generateId,
  checkLengthOfTheString,
  writeToLocalStorage,
} from '../../../utils/modules.js';

import Button from '../../commons/buttons/Button.jsx';

import style from './buttonGroup.module.css';

const ButtonGroup = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  /*
     useDispatch - это хук библиотеки Redux, используем его
     для получения функции dispatch из Redux store. 
     Функция dispatch принимает действие(action) в качестве аргумента
     и передает его в редюсеры для обновления состояния приложения.
     Вызов функции dispatch позволяет инициировать изменения состояния Redux.
     */
  const dispatch = useDispatch();

  // функция, добавить задачу в список задач
  const addTaskToTheList = () => {
    // формируем объект с датой
    const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    if (
      taskListData === null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // создаем пустой массив
      const newTaskListData = [];
      // формируем объект с данными
      const objTaskData = {
        id: generateId(),
        note: textareaMessage,
        date: recordingDate,
        tick: false,
        editing: false,
        sign: 'x',
      };
      // обновляем данные списка задач
      dispatch(setTaskListData([objTaskData]));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData, objTaskData);
      // обновляем(очищаем) поле textarea
      dispatch(setTextareaMessage(''));
    }

    if (
      taskListData !== null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // копируем список задач с помощью оператора spread
      const copyTaskListData = [...taskListData];
      // формируем объект с данными
      const objTaskData = {
        id: generateId(),
        note: textareaMessage,
        date: recordingDate,
        tick: false,
        editing: false,
        sign: 'x',
      };
      // обновляем данные списка задач (чтобы новый объект был вначале)
      dispatch(setTaskListData([objTaskData, ...copyTaskListData]));
      // записываем данные в localStorage
      writeToLocalStorage(copyTaskListData, objTaskData);
      // обновляем(очищаем) поле textarea
      dispatch(setTextareaMessage(''));
    }
  };

  return (
    <div className={style.buttons}>
      <Button name={'Выбрать всё'} />
      <Button name={'Удалить'} />
      <Button name={'Добавить'} addTaskToTheList={addTaskToTheList} />
    </div>
  );
};

export default ButtonGroup;
