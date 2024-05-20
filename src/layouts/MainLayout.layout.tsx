import { AppShell, Stack } from "@mantine/core";
import React from "react";
import Header from "./headers/Header.layout";

export type TPageName = "Beranda" | "Aktivitas" | "";

export interface IMainLayout {
  children: JSX.Element;
  activePage: TPageName;
}

const MainLayout: React.FC<IMainLayout> = ({ children, activePage }) => {
  return (
    <AppShell
      header={<Header activePage={activePage} />}
      // navbar={<SideNavbar />}
      footer={<div className="text-primary-navy-500">.</div>}
      // padding={"0px"}
      className=""
    >
      <div>{children}</div>
    </AppShell>
  );
};
export default MainLayout;
