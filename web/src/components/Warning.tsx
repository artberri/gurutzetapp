import { ReactNode } from "react";

export interface WarningProperties {
  children: ReactNode;
}

export const Warning = ({ children }: WarningProperties) => (
  <div className="w-full h-full flex justify-center items-center p-5">
    <div className="w-full h-full flex flex-col justify-center items-center text-center text-amber-600 bg-amber-100 border border-amber-300 rounded-md p-5">
      {children}
    </div>
  </div>
);
