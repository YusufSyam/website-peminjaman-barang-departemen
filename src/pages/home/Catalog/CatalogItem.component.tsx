import {
  Group,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { UseMutationResult } from "react-query";
import {
  IconRightArrowNoTail
} from "../../../assets/icons/Fluent";
import noItem from "../../../assets/images/no-item.png";
import { IEditItem } from "../../../utils/query/item-query";
import CatalogItemDetailModal from "./CatalogItemDetailModal.component";
import { ILentItem } from "./CatalogItemInputInterfaces.interface";

export interface ICatalogItem {
  itemId?: string;
  label?: string;
  stock?: number;
  borrowed?: number;
  image?: string;
  description: string;
  putEditItemMutation?: UseMutationResult<any, unknown, IEditItem, unknown>;
  deleteItemMutation?: UseMutationResult<any, unknown, string, unknown>;
  postLentItemMutation?: UseMutationResult<any, unknown, ILentItem, unknown>;
}

const CatalogItem: React.FC<ICatalogItem> = ({
  label = "Kamera",
  stock = 11,
  borrowed = 5,
  image = noItem,
  itemId,
  description,
  putEditItemMutation,
  deleteItemMutation,
  postLentItemMutation
}) => {
  const theme = useMantineTheme();
  const isAvailable = (stock-borrowed>0);

  useEffect(()=>{
    if(postLentItemMutation?.isSuccess){
      setOpened(false)
    }
  },[postLentItemMutation?.isSuccess])

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
        putEditItemMutation={putEditItemMutation}
        postLentItemMutation={postLentItemMutation}
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
          <Group className="mt-4 mb-2 mx-1 py-2 px-4 bg-white relative rounded-3xl justify-between border border-secondary-text hover:bg-secondary/70 duration-200">
            <Stack className="gap-0 z-50 ">
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
              className={`p-1 rounded-full duration-100 absolute right-4
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
