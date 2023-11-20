import React from 'react';
import style from './header.module.css';

function Header({ title }) {
  return (
    <header className={style.wrapper}>
      <h1 className={style.mainTitle}>{title}</h1>
    </header>
  );
}

export default Header;
