import React from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import { Group, Stack, Text } from "@mantine/core";
import Jumbotron from "./Jumbotron.section";

export interface IHome {}

const Home: React.FC<IHome> = ({}) => {
  return (
    <MainLayout activePage="Beranda">
      <Stack className="px-8 mt-4">
        <Jumbotron />
      </Stack>
    </MainLayout>
  );
};
export default Home;
