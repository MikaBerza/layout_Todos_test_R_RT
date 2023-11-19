import React from 'react';
import style from './homePage.module.css';

import Control from '../section/sectionControl/Control';
import EnteringTask from '../section/sectionEnteringTask/EnteringTask';
import OutputTask from '../section/sectionOutputTask/OutputTask';

function HomePage() {
  return (
    <>
      <div className={style.wrapper}>
        <main className={style.inner}>
          <Control />

          <EnteringTask />

          <OutputTask />
        </main>
      </div>
    </>
  );
}

export default HomePage;
