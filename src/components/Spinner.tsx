import React from "react";

interface Props {
  isVisible: boolean;
  className?: string;
}

export default function Spinner({
  isVisible,
  className,
}: Props) {
  return (
    <div
      className={`spinner ${
        isVisible ? "spinner_visible" : ""
      } ${className ? className : ""}`}>
      <i></i>
    </div>
  );
}
