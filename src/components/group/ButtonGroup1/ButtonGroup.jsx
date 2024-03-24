import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/listTaskGroupSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import {
  writeToLocalStorage,
  addTaskToTheList,
  replaceTaskToTheListWhenEditing,
} from '../../../utils/modules.js';

import { Button } from '../../commons/Button';
import style from './buttonGroup.module.css';

const ButtonGroup = React.memo(() => {
  const { taskListData } = useSelector((state) => state.listTaskGroupSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaSlice
  );
  const { editButton } = useSelector((state) => state.buttonGroupSlice);
  const dispatch = useDispatch();

  // функция, обработать добавление задачи с помощью кнопки 'Добавить'
  const handleAddTaskByAddButton = React.useCallback(() => {
    // запишем в константу результат выполнения функции
    const executionResults = addTaskToTheList(taskListData, textareaMessage);

    if (executionResults !== null) {
      // запишем в константу статус выполнения функции
      const executionStatus = executionResults[0];

      // если задача записывается _ПЕРВЫЙ_ раз
      if (executionStatus === 'first task') {
        // запишем в константу возвращенный объект с данными задачи
        const objectWithTaskData = executionResults[1];
        // запишем в константу возвращенный массив данных списка задач
        const arrayOfTaskListData = executionResults[2];

        // обновляем данные списка задач
        dispatch(setTaskListData([objectWithTaskData]));
        // записываем данные в localStorage
        writeToLocalStorage(arrayOfTaskListData, objectWithTaskData);
        // обновляем(очищаем) поле textarea
        dispatch(setTextareaMessage(''));
      }

      // если задача записывается _ОЧЕРЕДНОЙ_ раз
      if (executionStatus === 'next task') {
        // запишем в константу возвращенный объект с данными задачи
        const objectWithTaskData = executionResults[1];
        // запишем в константу возвращенный массив данных списка задач
        const arrayOfTaskListData = executionResults[2];

        // обновляем данные списка задач (чтобы новый объект был вначале)
        dispatch(setTaskListData([objectWithTaskData, ...arrayOfTaskListData]));
        // записываем данные в localStorage
        writeToLocalStorage(arrayOfTaskListData, objectWithTaskData);
        // обновляем(очищаем) поле textarea
        dispatch(setTextareaMessage(''));
      }
    }
  }, [dispatch, taskListData, textareaMessage]);

  // функция, обработать замену задачи с помощью кнопки 'Редактировать'
  const handleAddTaskByReplaceButton = React.useCallback(() => {
    // запишем в константу возвращенный массив данных списка задач
    const arrayOfTaskListData = replaceTaskToTheListWhenEditing(
      taskListData,
      textareaMessage
    );

    // обновляем данные списка задач
    dispatch(setTaskListData(arrayOfTaskListData));
    // записываем данные в localStorage
    writeToLocalStorage(arrayOfTaskListData);
    // обновляем(очищаем) поле textarea
    dispatch(setTextareaMessage(''));
    // скрываем кнопку (редактировать)
    dispatch(setEditButton(false));
    // показываем все задачи
    dispatch(setShowTasks(true));
  }, [dispatch, taskListData, textareaMessage]);

  // функция, установить или снять все флажки
  const checkOrClearAllCheckboxes = React.useCallback(() => {
    if (taskListData !== null) {
      /*
      Метод массива .every() позволяет узнать, удовлетворяют ли
      все элементы в массиве условию в функции-колбэке
      */
      // определяем все ли флажки стоят
      const isAllChecked = taskListData.every((item) => item.tick);
      // собираем мапом новый массив исходя из isAllChecked
      const newTaskListData = taskListData.map((item) => ({
        ...item,
        tick: !isAllChecked, // если все вкл, то выключаем иначе все включаем
      }));

      // обновляем данные списка задач
      dispatch(setTaskListData(newTaskListData));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData);
    }
  }, [dispatch, taskListData]);

  // константа, содержащая результат хука(useMemo), наличие флажка
  const presenceOfCheckbox = React.useMemo(() => {
    if (taskListData !== null) {
      /*
      Метод массива .some(), проверяет, есть ли в массиве
      хоть один элемент, подходящий под условие
      */
      return taskListData.some((item) => item.tick);
    }
    return false;
  }, [taskListData]);

  // функция, удалить задачи с флажками
  const removeTasksWithCheckboxes = React.useCallback(() => {
    if (taskListData !== null) {
      // удаляем задачу из списка
      const newTaskListData = taskListData.filter((item) => !item.tick);
      // обновляем данные списка задач
      dispatch(setTaskListData(newTaskListData));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData);
    }
  }, [dispatch, taskListData]);

  return (
    <div className={style.buttons}>
      {!editButton ? (
        <>
          <Button
            name='Выбрать всё'
            handleButtonClick={checkOrClearAllCheckboxes}
          />
          {presenceOfCheckbox && (
            <Button
              name='Удалить'
              handleButtonClick={removeTasksWithCheckboxes}
            />
          )}
          <Button
            name='Добавить'
            handleButtonClick={handleAddTaskByAddButton}
          />
        </>
      ) : (
        <Button
          name='Редактировать'
          handleButtonClick={handleAddTaskByReplaceButton}
        />
      )}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
export default ButtonGroup;
