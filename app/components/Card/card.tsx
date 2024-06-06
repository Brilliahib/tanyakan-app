import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  rounded?: "sm" | "md" | "lg";
  href?: string;
}

const Card: React.FC<CardProps> = ({ children, rounded = "sm", href }) => {
  const cardClasses = classNames(
    "p-4 border mb-4 bg-white border-gray-300", // Base classes
    {
      "rounded-sm": rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
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
};

export default Card;
