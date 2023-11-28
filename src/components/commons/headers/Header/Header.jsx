import React from 'react';
import style from './header.module.css';

const Header = ({ title }) => {
  return (
    <header className={style.wrapper}>
      <h1 className={style.mainTitle}>{title}</h1>
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
