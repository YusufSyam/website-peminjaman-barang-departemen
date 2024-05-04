import React from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import { Group, Stack, Text } from "@mantine/core";

export interface IHome {}

const Home: React.FC<IHome> = ({}) => {
  return (
    <MainLayout activePage="Beranda">
      <Text className="">Halo</Text>
    </MainLayout>
  );
};
export default Home;
