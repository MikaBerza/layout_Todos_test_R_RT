import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskListData } from '../../../redux/slices/taskListDataSlice.js';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
import Textarea from '../../commons/textareas/Textarea';
import ButtonGroup from '../../group/buttonGroup/ButtonGroup.jsx';
import Task from '../../commons/task/Task';

import { writeToLocalStorage } from '../../../utils/modules.js';

import style from './homePage.module.css';

const HomePage = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
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

  return (
    <>
      <main className={style.content}>
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
