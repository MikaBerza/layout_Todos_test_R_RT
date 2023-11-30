import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import style from './button.module.css';

const Button = React.memo(({ name, handleButtonClick }) => {
  /*
  React имеет встроенные возможности проверки типов пропсов.
  Чтобы запустить проверку типов свойств в компоненте
  присвоим специальное свойство propTypes:
  */
  Button.propTypes = {
    name: PropTypes.string,
    handleButtonClick: PropTypes.func,
  };

  const { editButton } = useSelector((state) => state.buttonGroupSlice);

  return (
    <button
      className={!editButton ? style.item : `${style.item} ${style.edit}`}
      onClick={handleButtonClick}
    >
      {name}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
