import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import { writeToLocalStorage } from '../../../utils/modules.js';
import style from './task.module.css';

const Task = ({ id, note, calendarDate, sign, checking, editing }) => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData, showTasks } = useSelector(
    (state) => state.taskListDataSlice
  );
  /*
     useDispatch - это хук библиотеки Redux, используем его
     для получения функции dispatch из Redux store. 
     Функция dispatch принимает действие(action) в качестве аргумента
     и передает его в редюсеры для обновления состояния приложения.
     Вызов функции dispatch позволяет инициировать изменения состояния Redux.
  */
  const dispatch = useDispatch();

  // функция, обработать редактирование задачи
  const handleTaskEditing = (id) => {
    const newTaskListData = taskListData.map((item) => {
      if (item.id === id && item.tick !== true) {
        // обновляем(устанавливаем) в поле textarea
        dispatch(setTextareaMessage(item.note));
        // показываем кнопку (редактировать) изменим ее состояние на (true), скрываем остальные кнопки
        dispatch(setEditButton(true));
        // скрываем все задачи, обновляя состояние
        dispatch(setShowTasks(false));

        // изменяем состояние поля с ключом (editing), с (false) на (true)
        const newItem = { ...item, editing: true };
        return newItem;
      }
      // возвращаем элемент массива без изменений если он не соответствует условию
      return item;
    });
    // обновляем данные списка задач
    dispatch(setTaskListData(newTaskListData));
    // обновляем данные в localStorage
    writeToLocalStorage(newTaskListData);
  };

  // функция, обработать изменение флажка
  const handleCheckboxChange = (id) => {
    const newTaskListData = taskListData.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, tick: !item.tick };
        return newItem;
      }
      return item;
    });
    // обновляем данные списка задач
    dispatch(setTaskListData(newTaskListData));
    // записываем данные в localStorage
    writeToLocalStorage(newTaskListData);
  };

  // функция, обработать удаление задачи
  const handleTaskRemove = (id) => {
    // копируем список задач с помощью оператора spread
    const copyTaskListData = [...taskListData];
    // удаляем задачу из списка
    const newTaskListData = copyTaskListData.filter((item) => item.id !== id);
    // обновляем данные списка задач
    dispatch(setTaskListData(newTaskListData));
    // записываем данные в localStorage
    writeToLocalStorage(newTaskListData);
  };

  return (
    <>
      {showTasks === true ? (
        <li className={style.item} onDoubleClick={() => handleTaskEditing(id)}>
          <div className={style.inner1}>
            <span
              className={`${checking ? style.completed : ''} ${style.text}`}
            >
              {note}
            </span>
            <input
              className={style.checkbox}
              type='checkbox'
              checked={checking}
              onChange={() => handleCheckboxChange(id)}
            />
          </div>
          <div className={style.inner2}>
            <span className={style.date}>{calendarDate}</span>
            <span className={style.remove} onClick={() => handleTaskRemove(id)}>
              {sign}
            </span>
          </div>
        </li>
      ) : (
        ''
      )}
    </>
  );
};

export default Task;
