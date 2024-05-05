import { Grid, Group, Stack, Text } from "@mantine/core";
import React from "react";
import CatalogItem, { ICatalogItem } from "./CatalogItem.component";
import { dummyCatalogList } from "../../../utils/const/dummy";

export interface ICatalog {}

const Catalog: React.FC<ICatalog> = ({}) => {
  return (
    <Stack>
      <Group>
        <Stack className="gap-0">
          <Text className="text-primary-text font-poppins-semibold text-[32px]">
            Katalog Inventaris
          </Text>
          <Text className="text-secondary-text text-start">
            Lihat barang tersedia dan tidak tersedia
          </Text>
        </Stack>
      </Group>
      <Grid className="" gutter={28}>
        {dummyCatalogList?.map((item: ICatalogItem, idx: number) => {
          return (
            <Grid.Col key={idx} span={3}>
              <CatalogItem {...item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
};
export default Catalog;
