import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../../redux/slices/textareaMessageSlice.js';
import { setEditButton } from '../../../../redux/slices/buttonGroupSlice.js';

import { writeToLocalStorage } from '../../../../utils/modules.js';
import style from './task.module.css';
// запись(date: calendarDate) означает, что значение свойства (date) теперь доступно под именем (calendarDate)

const Task = React.memo(
  ({ id, note, date: calendarDate, sign, tick: checking }) => {
    const { taskListData } = useSelector((state) => state.taskListDataSlice);
    const dispatch = useDispatch();

    // функция, обработать вход в режим редактирования задачи
    const handleEntryIntoTaskEditingMode = (event, id) => {
      /*
      добавил проверку, является ли event.target элементом input,
      если да, то прекращаем выполнение функции. Проверка нужна,
      чтобы избежать перехода в режим редактирования при двойном клике по input.
      */
      if (event.target.tagName.toLowerCase() === 'input') {
        return;
      }

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
      <li
        className={style.item}
        onDoubleClick={(event) => handleEntryIntoTaskEditingMode(event, id)}
      >
        <div className={style.inner1}>
          <span className={`${checking ? style.completed : ''} ${style.text}`}>
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
    );
  }
);

Task.displayName = 'Task';
export default Task;
