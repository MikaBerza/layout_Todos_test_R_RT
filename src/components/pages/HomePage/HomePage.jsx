import React from 'react';
import style from './homePage.module.css';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';

import Textarea from '../../commons/textareas/Textarea';
import Button from '../../commons/buttons/Button';

import Task from '../../commons/task/Task';

// import Control from '../../section/sectionControl/Control';
// import EnteringTask from '../../section/sectionEnteringTask/EnteringTask';
// import OutputTask from '../../section/sectionOutputTask/OutputTask';

function HomePage() {
  return (
    <>
      <main className={style.wrapper}>
        <div className={style.inner}>
          <section className={style.control}>
            <Search placeholders={'🔍 поиск задач'} />
            <Indicator nameOfStatuses={['всего', 'активно', 'завершено']} />
            <Filtering
              title={'фильтрация'}
              nameOfFilters={['все', 'активные', 'завершенные']}
            />
          </section>

          <section className={style.enteringTask}>
            <Textarea />
            <div className={style.buttons}>
              <Button name={'Выбрать всё'} />
              <Button name={'Удалить'} />
              <Button name={'Добавить'} />
            </div>
          </section>

          <section className={style.outputTask}>
            <ul className={style.listTask}>
              <Task
                note={'текст1'}
                checking={'off'}
                calendarDate={'22/12/22, 13:32'}
                sign={'x'}
              />
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default HomePage;
