import React from 'react';
import style from './content.module.css';

import Control from '../sectionControl/Control';
import EnteringTask from '../sectionEnteringTask/EnteringTask';
import OutputTask from '../sectionOutputTask/OutputTask';
//
function Content() {
  return (
    <main className={style.wrapper}>
      <Control />

      <EnteringTask />

      <OutputTask />
    </main>
  );
}

export default Content;
