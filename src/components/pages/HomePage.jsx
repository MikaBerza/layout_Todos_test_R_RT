import React from 'react';
import style from './homePage.module.css';

import Header from '../commons/headers/Header';
import Content from './content/Content';
import Footer from '../commons/footers/Footer';

function HomePage() {
  return (
    <>
      <div className={style.wrapper}>
        <Header title={'Todos'} />
        <Content />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
