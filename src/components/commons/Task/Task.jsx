import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/listTaskGroupSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import { writeToLocalStorage } from '../../../utils/modules.js';
import style from './task.module.css';

// запись(date: calendarDate) означает, что значение свойства (date) теперь доступно под именем (calendarDate)
const Task = React.memo(
  ({ id, note, date: calendarDate, sign, tick: checking }) => {
    //
    Task.propTypes = {
      id: PropTypes.string,
      note: PropTypes.string,
      date: PropTypes.string,
      sign: PropTypes.string,
      tick: PropTypes.bool,
    };

    const { taskListData } = useSelector((state) => state.listTaskGroupSlice);
    const dispatch = useDispatch();

    // функция, обработать вход в режим редактирования задачи
    const handleEntryIntoTaskEditingMode = React.useCallback(
      (event) => {
        /*
      добавил проверку, является ли event.target элементом input,
      если да, то прекращаем выполнение функции. Проверка нужна,
      чтобы избежать перехода в режим редактирования при двойном клике по input.
      */
        if (event.target.tagName.toLowerCase() === 'input') {
          return;
        }

        const newTaskListData = taskListData.map((item) => {
          if (item.id === id && !item.tick) {
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
      },
      [dispatch, id, taskListData]
    );

    // функция, обработать изменение флажка
    const handleCheckboxChange = React.useCallback(() => {
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
    }, [dispatch, id, taskListData]);

    // функция, обработать удаление задачи
    const handleTaskRemove = React.useCallback(() => {
      // удаляем задачу из списка
      const newTaskListData = taskListData.filter((item) => item.id !== id);
      // обновляем данные списка задач
      dispatch(setTaskListData(newTaskListData));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData);
    }, [dispatch, id, taskListData]);

    return (
      <li className={style.item} onDoubleClick={handleEntryIntoTaskEditingMode}>
        <div className={style.inner1}>
          <span className={`${checking ? style.completed : ''} ${style.text}`}>
            {note}
          </span>
          <input
            className={style.checkbox}
            type='checkbox'
            checked={checking}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={style.inner2}>
          <span className={style.date}>{calendarDate}</span>
          <span className={style.remove} onClick={handleTaskRemove}>
            {sign}
          </span>
        </div>
      </li>
    );
  }
);

Task.displayName = 'Task';
export default Task;
