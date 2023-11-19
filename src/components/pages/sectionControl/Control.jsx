import React from 'react';
import style from './control.module.css';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
//
function Control() {
  return (
    <section className={style.wrapper}>
      <Search placeholders={'🔍 поиск задач'} />
      <Indicator nameOfStatuses={['всего', 'активно', 'завершено']} />
      <Filtering
        title={'фильтрация'}
        nameOfFilters={['все', 'активные', 'завершенные']}
      />
    </section>
  );
}

export default Control;
