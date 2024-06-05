import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  rounded?: "sm" | "md" | "lg";
  bgColor?: "black" | "red";
}

const Button: React.FC<ButtonProps> = ({
  children,
  rounded = "sm",
  bgColor = "black",
}) => {
  const buttonClasses = classNames(
    "inline-flex items-center justify-center whitespace-nowrap text-sm md:text-base font-medium disabled:pointer-events-none disabled:opacity-50 px-6 border-2 py-1.5 h-fit text-white w-full", // Base classes
    {
      "bg-black": bgColor === "black",
      rounded: rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
    }
  );

  return (
    <a href="" className={buttonClasses}>
      {children}
    </a>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  rounded: PropTypes.oneOf(["sm", "md", "lg"]),
  bgColor: PropTypes.oneOf(["black"]),
};

export default Button;
