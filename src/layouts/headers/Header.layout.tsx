import { Grid, Group, Stack, Text } from "@mantine/core";
import unhasLogo from "../../assets/images/logo-unhas.png";
import React from "react";
import HeaderMenu from "./HeaderMenu.component";
import { MAINROUTES } from "../../utils/const/routes";
import { TPageName } from "../MainLayout.layout";
import { IconLogoutOutline } from "../../assets/icons/Fluent";

export interface IHeader {
  activePage: TPageName;
}

const Header: React.FC<IHeader> = ({ activePage }) => {
  return (
    <Grid className="pb-2 pt-4 px-8 z-10 border-b border-secondary shadow-md">
      <Grid.Col span={4} className="">
        <Group className="gap-3">
          <div className="w-10">
            <img src={unhasLogo} alt="" />
          </div>
          <Stack className="gap-0">
            <Text className="font-poppins-semibold text-lg text-start text-primary-text">
              Peminjaman Inventaris Departemen
            </Text>
            <Text className="text-start text-sm text-secondary-text -mt-1">
              Dep. Matematika, Fak. MIPA, Universitas Hasanuddin
            </Text>
          </Stack>
        </Group>
      </Grid.Col>
      <Grid.Col span={4} className="self-center">
        <Group className="justify-center align-middle gap-4 -mb-2">
          <HeaderMenu
            href={MAINROUTES.home}
            label="Beranda"
            activePage={activePage}
          />
          <HeaderMenu
            href={MAINROUTES.activity}
            label="Aktivitas"
            activePage={activePage}
          />
          {/* <HeaderMenu href={MAINROUTES.activity} label="Aktivitas2" activePage={activePage} /> */}
        </Group>
      </Grid.Col>
      <Grid.Col span={4} className="self-center">
        <Group className="justify-end gap-2 cursor-pointer">
          <Text className="text-primary-text font-semibold">Log Out</Text>
          <IconLogoutOutline
            className="rounded-full p-[5px] bg-red"
            color="#FFFFFF"
            size={28}
          />
        </Group>
      </Grid.Col>
    </Grid>
  );
};
export default Header;
