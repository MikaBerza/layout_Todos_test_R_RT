import React from 'react';
import { useSelector } from 'react-redux';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
import Textarea from '../../commons/textareas/Textarea';
import ButtonGroup from '../../group/buttonGroup/ButtonGroup.jsx';
import Task from '../../commons/task/Task';

import style from './homePage.module.css';

const HomePage = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);

  React.useEffect(() => {
    if (taskListData === null) {
      console.log('localStorage-ПУСТ!!!', taskListData);
    } else if (taskListData !== null) {
      console.log('localStorage-НЕ ПУСТ!!!', taskListData);
    }
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
