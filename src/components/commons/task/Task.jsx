import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskListData } from '../../../redux/slices/taskListDataSlice.js';

import { writeToLocalStorage } from '../../../utils/modules.js';

import style from './task.module.css';

function Task({ id, note, calendarDate, sign, checking }) {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  /*
     useDispatch - это хук библиотеки Redux, используем его
     для получения функции dispatch из Redux store. 
     Функция dispatch принимает действие(action) в качестве аргумента
     и передает его в редюсеры для обновления состояния приложения.
     Вызов функции dispatch позволяет инициировать изменения состояния Redux.
  */
  const dispatch = useDispatch();

  // функция, обработать изменение флажка
  const handleCheckboxChange = (id) => {
    const newTaskListData = taskListData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          tick: !item.tick,
        };
      }
      return item;
    });
    // обновляем данные списка задач
    dispatch(setTaskListData(newTaskListData));
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
    <li className={style.item}>
      <div className={style.inner1}>
        <span className={`${checking ? style.completed : ''} ${style.text}`}>
          {note}
        </span>
        <input
          className={style.checkbox}
          type='checkbox'
          defaultChecked={checking}
          onClick={() => handleCheckboxChange(id)}
        />
      </div>
      <div className={style.inner2}>
        <span className={style.date}>{calendarDate}</span>
        <span className={style.remove} onClick={() => handleTaskRemove(id)}>
          {sign}
        </span>
      </div>
    </li>
  );
}

export default Task;
