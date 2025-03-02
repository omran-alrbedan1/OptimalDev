import Link from "next/link";
import React from "react";

// Define the type for the props
interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "link" | "submit" | "reset";
  isExternal?: boolean;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onClick,
    type = "button",
    isExternal = false,
    href = "",
    className = "",
    style = {},
    target = "",
    children,
  } = props;

  const onClickHandler = () => {
    if (onClick) onClick();
  };

  if (type === "link") {
    if (isExternal) {
      return (
        <a
          href={href}
          className={className}
          style={style}
          target={target === "_blank" ? "_blank" : undefined}
          rel="noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={className}
        style={style}
        onClick={onClickHandler}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type}
      style={style}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
