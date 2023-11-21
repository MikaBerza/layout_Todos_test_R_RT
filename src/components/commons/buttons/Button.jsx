import React from 'react';
import { useSelector } from 'react-redux';

import style from './button.module.css';

const Button = ({ name, handleButtonClick }) => {
  const { editButton } = useSelector((state) => state.buttonGroupSlice);

  return (
    <>
      <button
        className={
          editButton === false ? style.item : `${style.item} ${style.edit}`
        }
        onClick={handleButtonClick}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
