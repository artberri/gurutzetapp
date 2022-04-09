import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export interface TabPage {
  id: string;
  content: ReactNode;
  icon: JSX.Element;
  iconSelected: JSX.Element;
}

export interface TabsProperties {
  pages: TabPage[];
}

export const Tabs = ({ pages }: TabsProperties) => (
  <Tab.Group defaultIndex={0}>
    <Tab.Panels className=" grow flex flex-col overflow-y-auto">
      {pages.map(({ id, content }) => (
        <Tab.Panel key={id} className="w-full h-full">
          {content}
        </Tab.Panel>
      ))}
    </Tab.Panels>
    <Tab.List className="flex-none flex bg-primary p-3 justify-around w-full">
      {pages.map(({ id, icon, iconSelected }) => (
        <Tab
          key={id}
          className={({ selected }) =>
            classNames("p-2", "rounded-xl", selected ? "bg-white/20" : "")
          }
        >
          {({ selected }) => (
            <div className="w-6">{selected ? iconSelected : icon}</div>
          )}
        </Tab>
      ))}
    </Tab.List>
  </Tab.Group>
);
