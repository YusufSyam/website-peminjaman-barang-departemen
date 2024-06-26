import { Grid, Stack, Text } from "@mantine/core";
import React from "react";
import { StickerInventory } from "../../assets/icons/Fluent";

export interface IJumbotron {}

const Jumbotron: React.FC<IJumbotron> = ({}) => {
  return (
    <Stack className="bg-gradient-to-r from-dark-red via-red to-light-red w-full p-8 rounded-3xl">
      <Grid className="flex-nowrap" gutter={"xl"}>
        <Grid.Col span={2} className="overflow-hidden lg:block hidden">
            <StickerInventory size={200} />
          {/* <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Stack align={"center"}>{paginationComp}</Stack>
        </MediaQuery> */}
        </Grid.Col>
        <Grid.Col lg={10}>
          <Stack className="gap-2 lg:gap-10">
            <Stack className="self-start gap-0">
              <Text className="text-white font-poppins-semibold text-[32px] lg:text-[46px] text-start">
                Selamat Datang,
              </Text>
              <Text className="text-white font-poppins text-md lg:text-[18px] text-start pb-4 border-b-2 border-white">
                di{" "}
                <span className="text-yellow font-poppins-semibold text-lg lg:text-[20px]">
                  Layanan Peminjaman Inventaris
                </span>{" "}
                Departemen Matematika
              </Text>
            </Stack>
            <Text className="text-start text-white lg:text-lg text-md">
              Dengan portal peminjaman inventaris departemen kami, mahasiswa
              Departemen Matematika di Fakultas MIPA, Universitas Hasanuddin
              dapat dengan mudah menemukan dan meminjam berbagai peralatan untuk
              mendukung kegiatan akademis
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
export default Jumbotron;
