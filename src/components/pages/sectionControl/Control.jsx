import React from 'react';
import style from './control.module.css';

import Search from '../../commons/search/Search';
import Counters from '../../commons/counters/Counters';
import Filtering from '../../commons/filtering/Filtering';
//
function Control() {
  return (
    <section className={style.wrapper}>
      <Search placeholders={'🔍 поиск задач'} />
      <Counters nameOfStatuses={['всего', 'активно', 'завершено']} />
      <Filtering
        title={'фильтрация'}
        nameOfFilters={['все', 'активные', 'завершенные']}
      />
    </section>
  );
}

export default Control;
