import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";
import noItem from "../../../assets/images/no-item.png";

export interface ICatalogItem {
  label?: string;
  stock?: number;
  image?: string;
}

const CatalogItem: React.FC<ICatalogItem> = ({
  label = "Kamera",
  stock = 11,
  image = noItem
}) => {
  const isAvailable = stock > 0;

  return (
    <Stack className="w-full border border-secondary rounded-xl overflow-hidden gap-0 shadow-xl hover:-translate-y-1 transition-all duration-500">
      <div className="w-full h-[200px] object-contain rounded-t-xl overflow-hidden">
        <img src={image} alt="Gambar Item" />
      </div>
      <Group
        className={`px-4 py-[6px] ${
          isAvailable
            ? `bg-gradient-to-r from-green to-light-green`
            : `bg-gradient-to-r from-dark-red via-red to-light-red`
        } justify-between`}
      >
        {/* <Group className="px-4 py-[6px] bg-gradient-to-r from-dark-red via-red to-light-red justify-between"> */}
        <Text className="text-white font-poppins">{
          isAvailable? "Tersedia" : "Tidak Tersedia"
        }</Text>
      </Group>
      <Group className="py-2 px-4 justify-between">
        <Text className="text-primary-text font-poppins  text-start">
          {label}
        </Text>
        <Text className="text-primary-text text-md font-semibold">
          {stock} Item
        </Text>
      </Group>
    </Stack>
  );
};
export default CatalogItem;
