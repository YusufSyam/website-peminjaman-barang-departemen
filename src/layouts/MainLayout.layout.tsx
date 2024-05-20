import { AppShell, Stack, Text } from "@mantine/core";
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
      footer={
        <Stack className="bg-dark-red w-full py-6 mt-12 border-t-4 border-yellow">
          <Text className="text-center text-white">&copy; 2024 Dept. Matematika, Fak. MIPA, Universitas Hasanuddin. All rights reserved.</Text>
        </Stack>
      }
      // padding={"0px"}
      className=""
    >
      <div>{children}</div>
    </AppShell>
  );
};
export default MainLayout;
