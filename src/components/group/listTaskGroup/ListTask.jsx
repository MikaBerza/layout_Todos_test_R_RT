import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../../commons/task/Task';
import style from './listTask.module.css';

const ListTask = () => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { filteringValue } = useSelector((state) => state.filteringSlice);

  return (
    <ul className={style.item}>
      {taskListData === null
        ? ''
        : taskListData.map((objectWithTaskData) => {
            return (
              <>
                {/* условие, для фильтрация(отображения) задач */}
                {filteringValue === 'все' ||
                (filteringValue === 'завершенные' &&
                  objectWithTaskData.tick === true) ||
                (filteringValue === 'активные' &&
                  objectWithTaskData.tick === false) ? (
                  <Task key={objectWithTaskData.id} {...objectWithTaskData} />
                ) : (
                  ''
                )}
              </>
            );
          })}
    </ul>
  );
};

export default ListTask;
