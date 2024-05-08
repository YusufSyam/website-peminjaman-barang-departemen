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
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false)

  return (
    <>
      <MyModal
        opened={opened}
        setOpened={setOpened}
        title={label}
        onClose={() => {
          console.log("Terclose");
        }}
        minWidth={900}
      >
        <Group className="gap-10 flex-nowrap relative">
          <div className="rounded-lg rounded-bl-none overflow-hidden shrink-0 cursor-pointer bg-secondary-500">
            <img src={image || ""} alt="" className="w-96 h-96 object-cover" />
          </div>
          <Stack className="self-start gap-2 ">
            <Stack className="gap-0">
              <Text className="text-primary-text font-semibold">Status</Text>
              <Text className="text-green font-poppins text-2xl -mt-1">
                Tersedia
              </Text>
            </Stack>
            <Stack className="gap-0">
              <Text className="text-primary-text font-semibold">Stok</Text>
              <Group className="gap-10">
                <Stack className="gap-2">
                  <Text className="text-secondary-text text-md font-semibold">
                    Tersedia
                  </Text>
                  <Group className="gap-1">
                    <Text className="bg-green px-2 py-[2px] rounded-sm text-white font-poppins text-2xl -mt-1">
                      10
                    </Text>
                    <Text className="text-primary-text font-poppins text-xl -mt-1">
                      Item
                    </Text>
                  </Group>
                </Stack>
                <Stack className="gap-2">
                  <Text className="text-secondary-text text-md font-semibold">
                    Dipinjam
                  </Text>
                  <Group className="gap-1">
                    <Text className="bg-red px-2 py-[2px] rounded-sm text-white font-poppins text-2xl -mt-1">
                      10
                    </Text>
                    <Text className="text-primary-text font-poppins text-xl -mt-1">
                      Item
                    </Text>
                  </Group>
                </Stack>
                <Stack className="gap-2">
                  <Text className="text-secondary-text text-md font-semibold">
                    Total
                  </Text>
                  <Group className="gap-1">
                    <Text className="bg-secondary-text px-2 py-[2px] rounded-sm text-white font-poppins text-2xl -mt-1">
                      10
                    </Text>
                    <Text className="text-primary-text font-poppins text-xl -mt-1">
                      Item
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>
            <Stack className="gap-0 mt-4">
              <Text className="text-primary-text font-semibold">
                Deskripsi Barang
              </Text>
              <Text className="text-primary-text text-md font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                dolore porro pariatur quod, distinctio saepe error fugiat
                voluptatum molestiae dolorum. lorem1000
              </Text>
            </Stack>
            <Group className="absolute left-[422px] right-0 bottom-0 justify-between">
              <Group>
                <IconTrashFilled
                  size={36}
                  color={theme.colors["white"][5]}
                  onClick={()=>{
                    setOpenedDelete(true)
                  }}
                  className="p-[6px] rounded-md bg-dark-red cursor-pointer border border-dark-red"
                />
                <IconEditFilled
                  size={36}
                  color={theme.colors["orange"][5]}
                  className="p-[6px] rounded-md bg-white cursor-pointer border border-orange"
                />
              </Group>
              <Button className="bg-gradient-to-r from-dark-red to-red">
                Pinjam
              </Button>
            </Group>
          </Stack>
        </Group>
      </MyModal>
      <WarningModal
        opened={openedDelete}
        setOpened={setOpenedDelete}
        title={`Hapus Barang : ${label} ?`}
        onClose={() => {}}
        yesButtonLabel="Hapus"
        children={`Aksi ini akan menghapus barang dari katalog. Pastikan bahwa tidak ada peminjaman dari barang ini saat akan menghapus`}
        onSubmit={() => {
          setOpened(false)
          setOpenedDelete(false)
        }}
      />
      <Stack
        onClick={() => {
          setOpened(true);
        }}
        className="mb-8 w-full border border-secondary rounded-md overflow-hidden gap-0 hover:scale-[1.01] shadow-xl hover:shadow-2xl duration-200 cursor-pointer"
      >
        <div className="w-full h-[200px] rounded-t-md overflow-hidden">
          <img
            src={image}
            alt="Gambar Item"
            className="w-full h-full object-cover"
          />
        </div>
        <Group
          className={`px-4 py-[6px] ${
            isAvailable
              ? `bg-gradient-to-r from-green to-light-green`
              : `bg-gradient-to-r from-dark-red via-red to-light-red`
          } justify-between`}
        >
          {/* <Group className="px-4 py-[6px] bg-gradient-to-r from-dark-red via-red to-light-red justify-between"> */}
          <Text className="text-white font-poppins">
            {isAvailable ? "Tersedia" : "Tidak Tersedia"}
          </Text>
        </Group>
        <Group className="py-2 px-4 justify-between">
          <Stack className="gap-0">
            <Text className="text-primary-text font-poppins  text-start">
              {label}
            </Text>
            <Text className="text-secondary-text text-start text-md font-semibold">
              Tersisa {stock} Item
            </Text>
          </Stack>
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
        </Group>

        {/* <Button className="w-fit px-2 py-1" rightIcon={<IconRightArrowNoTail />}>
        Detail
      </Button> */}
      </Stack>
    </>
  );
};
export default CatalogItem;
