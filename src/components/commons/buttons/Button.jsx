import React from 'react';
import { useSelector } from 'react-redux';
import style from './button.module.css';

const Button = React.memo(({ name, handleButtonClick }) => {
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
});

Button.displayName = 'Button';
export default Button;
