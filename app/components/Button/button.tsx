import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  rounded?: "sm" | "md" | "lg";
  bgColor?: "black" | "red";
  width?: "full" | "fit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  rounded = "sm",
  bgColor = "black",
  width = "full",
}) => {
  const buttonClasses = classNames(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 px-6 border-2 py-2 h-fit text-white", // Base classes
    {
      "w-full": width === "full",
      "w-fit": width === "fit",
      "bg-black": bgColor === "black",
      "bg-red": bgColor === "red",
      rounded: rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
    }
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return <button className={buttonClasses}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  rounded: PropTypes.oneOf(["sm", "md", "lg"]),
  bgColor: PropTypes.oneOf(["black", "red"]),
  width: PropTypes.oneOf(["full", "fit"]),
};

export default Button;
