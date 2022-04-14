import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export interface HeaderProperties {
  className?: string;
}

export const Header = ({ className = "" }: HeaderProperties) => (
  <header
    className={`bg-white flex justify-between text-primary p-3 font-heading ${className}`}
  >
    <Logo color="primary" width={30} />
    <LanguageSwitch />
  </header>
);
