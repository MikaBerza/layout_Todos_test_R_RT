import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../../commons/task/Task.jsx';

import style from './listTask.module.css';

const ListTask = ({ nameOfFilters }) => {
  // присвоим значения массива, в переменные all, active, completed
  const [all, active, completed] = nameOfFilters;
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { filteringValue } = useSelector((state) => state.filteringSlice);

  // если условие выполняется, то дальше по коду не идем, вернет null
  if (taskListData === null) {
    return null;
  }

  return (
    <ul className={style.item}>
      {taskListData
        .filter((item) => {
          if (filteringValue === all) {
            return true;
          }
          if (filteringValue === active && item.tick === false) {
            return false;
          }
          if (filteringValue === completed && item.tick === true) {
            return false;
          }
          return true;
        })
        .map((objectWithTaskData) => {
          return <Task key={objectWithTaskData.id} {...objectWithTaskData} />;
        })}
    </ul>
  );
};

export default ListTask;
