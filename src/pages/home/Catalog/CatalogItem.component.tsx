import {
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React, { useState } from "react";
import noItem from "../../../assets/images/no-item.png";
import {
  IconEditFilled,
  IconRightArrow,
  IconRightArrowNoTail,
  IconTrashFilled
} from "../../../assets/icons/Fluent";
import MyModal from "../../../components/MyModal.component";
import WarningModal from "../../../components/WarningModal.component";
import EditNewCatalogModal from "./EditNewCatalogModal.component";
import CatalogItemDetailModal from "./CatalogItemDetailModal.component";
import { UseMutationResult } from "react-query";

export interface ICatalogItem {
  itemId?: string;
  label?: string;
  stock?: number;
  borrowed?: number;
  image?: string;
  description: string;
  deleteItemMutation?: UseMutationResult<any, unknown, string, unknown>;
}

const CatalogItem: React.FC<ICatalogItem> = ({
  label = "Kamera",
  stock = 11,
  borrowed = 5,
  image = noItem,
  itemId,
  description,
  deleteItemMutation
}) => {
  const theme = useMantineTheme();
  const isAvailable = borrowed < stock;

  const [opened, setOpened] = useState(false);

  return (
    <>
      <CatalogItemDetailModal
        itemId={itemId || ""}
        opened={opened}
        setOpened={setOpened}
        label={label}
        image={image == "" ? noItem : image}
        stock={stock}
        borrowed={borrowed}
        description={description}
        deleteItemMutation={deleteItemMutation}
      />
      <div
        className={`p-2 rounded-[24px] mb-4 hover:shadow-2xl shadow-xl duration-200 cursor-pointer
        bg-white border-2 
        ${
          isAvailable
            ? `border-secondary-text/75 `
            : `border-secondary-text/75 `
        }
        `}
      >
        <Stack
          onClick={() => {
            setOpened(true);
          }}
          className="w-full rounded-[16px] overflow-hidden gap-0 "
        >
          <div className="w-full h-[200px] overflow-hidden rounded-[16px] p-1 bg-white ">
            <img
              src={image == "" ? noItem : image}
              alt="Gambar Item"
              className="w-full h-full object-cover rounded-[16px]"
            />
          </div>
          <Group className="mt-4 mb-2 mx-1 py-2 px-4 bg-white rounded-3xl justify-between border border-secondary-text hover:bg-secondary/70 duration-200">
            <Stack className="gap-0  ">
              <Text className="text-start font-poppins text-primary-text">
                {label}
              </Text>
              <Text
                className={`font-poppins text-md text-start -mt-1
              ${isAvailable ? `text-green` : `text-red`}
              `}
              >
                {isAvailable ? "Tersedia" : "Tidak Tersedia"}
                {isAvailable && (
                  <span className="text-sm text-secondary-text font-normal">
                    {" "}
                    ({stock - borrowed} Item)
                  </span>
                )}
              </Text>
            </Stack>
            <IconRightArrowNoTail
              color={theme.colors["white"][5]}
              size={32}
              className={`p-1 rounded-full duration-100
              ${isAvailable ? `bg-green` : `bg-red`}`}
            />
          </Group>
          {/* <Text className="text-primary-text text-md font-semibold">
          {stock} Item
        </Text> */}
          {/* <Group className="self-center  gap-1 pl-3 pr-3 py-[2px] rounded-md cursor-pointer border border-primary-text bg-secondary">
          <Text className="text-primary-text font-semibold">Detail</Text>
          <IconRightArrowNoTail
            color={theme.colors["primary-text"][5]}
            size={24}
            className="mt-[2px]"
          />
          <IconRightArrowNoTail color={theme.colors['white'][5]} size={24} className="bg-primary-text p-1 rounded-full" />
        </Group> */}

          {/* <Button className="w-fit px-2 py-1" rightIcon={<IconRightArrowNoTail />}>
        Detail
      </Button> */}
        </Stack>
      </div>
    </>
  );
};
export default CatalogItem;
