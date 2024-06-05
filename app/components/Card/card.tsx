import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

interface CardProps {
  children: React.ReactNode;
  rounded?: "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({ children, rounded = "sm" }) => {
  const cardClasses = classNames(
    "p-4 border mb-4", // Base classes
    {
      rounded: rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
    }
  );

  return <div className={cardClasses}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  rounded: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Card;
