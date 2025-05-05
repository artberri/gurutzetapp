import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment, type JSX, type ReactNode } from "react";
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export interface TabPage {
	id: string;
	content: ReactNode;
	icon: JSX.Element;
	iconSelected: JSX.Element;
}

export interface TabsProperties {
	pages: TabPage[];
	selectedIndex: number;
	onChange?: (index: number) => void;
}

export const Tabs = ({ pages, selectedIndex, onChange }: TabsProperties) => (
	<TabGroup as={Fragment} selectedIndex={selectedIndex} onChange={onChange}>
		<TabPanels className=" grow flex flex-col overflow-y-auto">
			{pages.map(({ id, content }) => (
				<TabPanel key={id} className="w-full h-full">
					{content}
				</TabPanel>
			))}
		</TabPanels>
		<TabList className="flex-none flex bg-primary p-3 justify-around w-full">
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
		</TabList>
	</TabGroup>
);
