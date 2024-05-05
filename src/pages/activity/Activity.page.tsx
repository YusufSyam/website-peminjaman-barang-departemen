import React from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import { Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import ActivityItem from "./ActivityItem.component";
import { TextInput } from "../../components/TextInput";
import { SearchFilled } from "../../assets/icons/Fluent";

export interface IActivity {}

const Activity: React.FC<IActivity> = ({}) => {
  return (
    <MainLayout activePage="Aktivitas">
      <Stack className="px-12 mt-6 gap-10">
        <Group className="justify-between">
          <Stack className="gap-0">
            <Text className="text-primary-text font-poppins-semibold text-[32px] text-start">
              Riwayat Peminjaman
            </Text>
            <Text className="text-secondary-text text-start -mt-1">
              Telusuri riwayat aktivitas peminjaman barang
            </Text>
          </Stack>
          <TextInput
            icon={<SearchFilled color="#dfdfdf" />}
            onChange={() => {}}
            placeholder="Cari barang / nim . . ."
            size="md"
          />
        </Group>
        <Stack className="">
          <ActivityItem />
        </Stack>
      </Stack>
    </MainLayout>
  );
};
export default Activity;
