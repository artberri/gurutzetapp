import { HTMLProps } from "react";

export interface ButtonProperties
  extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  type = "button",
  children,
  ...properties
}: ButtonProperties) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
  <button type={type} {...properties}>
    {children}
  </button>
);
