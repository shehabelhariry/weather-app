import React from "react";

const Button = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: Function | undefined;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-20 ${className}`}
      onClick={() => onClick?.()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
