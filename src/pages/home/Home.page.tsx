import React from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import { Group, Stack, Text } from "@mantine/core";
import Jumbotron from "./Jumbotron.section";
import Catalog from "./Catalog/Catalog.section";

export interface IHome {}

const Home: React.FC<IHome> = ({}) => {
  return (
    <MainLayout activePage="Beranda">
      <Stack className="px-8 mt-6 gap-10">
        <Jumbotron />
        <Catalog />
      </Stack>
    </MainLayout>
  );
};
export default Home;
