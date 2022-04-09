import { Logo } from "../Logo/Logo";

export interface HeaderProperties {
  className?: string;
}

export const Header = ({ className = "" }: HeaderProperties) => (
  <header
    className={`bg-white flex text-primary p-3 font-heading ${className}`}
  >
    <Logo color="primary" width={30} />
  </header>
);
