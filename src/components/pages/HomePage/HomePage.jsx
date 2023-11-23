import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
import Textarea from '../../commons/textareas/Textarea';
import ButtonGroup from '../../group/buttonGroup/ButtonGroup.jsx';
import Task from '../../commons/task/Task';

import {
  writeToLocalStorage,
  addTaskToTheList,
  replaceTaskToTheListWhenEditing,
} from '../../../utils/modules.js';

import style from './homePage.module.css';

const HomePage = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  const { editButton } = useSelector((state) => state.buttonGroupSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // если во время редактирования задачи, страница перезагрузиться,
    // данные с ключом editing(состояние редактирования) перезапишутся
    return () => {
      if (taskListData !== null) {
        const newTaskListData = taskListData.map((item) => {
          if (item.editing === true) {
            // изменяем состояние поля с ключом (editing), с (true) на (false)
            const newItem = { ...item, editing: false };
            return newItem;
          }
          // возвращаем элемент массива без изменений если он не соответствует условию
          return item;
        });
        // обновляем данные списка задач
        dispatch(setTaskListData(newTaskListData));
        // обновляем данные в localStorage
        writeToLocalStorage(newTaskListData);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // функция, обработать добавление задачи нажатием клавиши 'Enter'
  // с помощью клавиши 'Enter' (имитируем нажатие кнопки "ДОБАВИТЬ")
  const handleAddTaskByEnterKeystroke = (event) => {
    // запишем в константу результат выполнения функции
    const executionResults = addTaskToTheList(taskListData, textareaMessage);

    if (executionResults !== null && event.key === 'Enter') {
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
  };

  // функция, обработать замену задачи нажатием клавиши 'Enter'
  // с помощью клавиши 'Enter' (имитируем нажатие кнопки "РЕДАКТИРОВАТЬ")
  const handleReplaceTaskByEnterKeystroke = (event) => {
    if (event.key === 'Enter') {
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
    }
  };

  return (
    <>
      <main
        className={style.content}
        onKeyDown={
          editButton === false
            ? handleAddTaskByEnterKeystroke
            : handleReplaceTaskByEnterKeystroke
        }
        tabIndex={0}
      >
        <section className={style.control}>
          <Search placeholders={'🔍 поиск задач'} />
          <Indicator nameOfStatuses={['всего', 'активно', 'завершено']} />
          <Filtering
            title={'фильтрация'}
            nameOfFilters={['все', 'активные', 'завершенные']}
          />
        </section>

        <section className={style.enteringTask}>
          <Textarea placeholders={'Что нужно сделать?'} />
          <ButtonGroup />
        </section>

        <section className={style.outputTask}>
          <ul className={style.listTask}>
            {taskListData === null
              ? ''
              : taskListData.map((item) => {
                  return (
                    <Task
                      key={item.id}
                      id={item.id}
                      note={item.note}
                      calendarDate={item.date}
                      sign={item.sign}
                      checking={item.tick}
                      editing={item.editing}
                    />
                  );
                })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default HomePage;
