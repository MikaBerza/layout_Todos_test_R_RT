import React from 'react';
import style from './header.module.css';

const Header = () => {
  return (
    <header className={style.wrapper}>
      <h1 className={style.mainTitle}>Todos</h1>
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
