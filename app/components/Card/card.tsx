import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  rounded?: "sm" | "md" | "lg";
  href?: string;
  width?: "full" | "base" | "fit";
}

const Card: React.FC<CardProps> = ({
  children,
  rounded = "sm",
  href,
  width = "full",
}) => {
  const cardClasses = classNames(
    "p-4 border bg-white border-gray-300 md:mb-0 mb-4 overflow-hidden", // Base classes
    {
      "rounded-sm": rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
      "w-full": width === "full",
      "w-[400px]": width === "base",
      "w-fit": width === "fit",
      block: href,
    }
  );

  if (href) {
    return (
      <Link className={cardClasses} href={href}>
        {children}
      </Link>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  rounded: PropTypes.oneOf(["sm", "md", "lg"]),
  href: PropTypes.string,
  width: PropTypes.oneOf(["base", "fit", "full"]),
};

export default Card;
