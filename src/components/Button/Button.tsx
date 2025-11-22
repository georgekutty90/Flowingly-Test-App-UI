import React from 'react';

export interface ButtonProps {
  className: string;
  value: string;
  isEnable: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  value,
  isEnable,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${isEnable ? className : 'disable'}`}
      disabled={!isEnable}
    >
      {value}
    </button>
  );
};

export default Button;