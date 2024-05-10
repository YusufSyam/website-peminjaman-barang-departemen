import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React, { useState } from "react";
import { IconTrashFilled, IconEditFilled } from "../../../assets/icons/Fluent";
import MyModal from "../../../components/MyModal.component";
import WarningModal from "../../../components/WarningModal.component";
import EditNewCatalogModal from "./EditNewCatalogModal.component";

export interface ICatalogItemDetailModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  image: string;
  stock: number;
  borrowed: number;
}

const CatalogItemDetailModal: React.FC<ICatalogItemDetailModal> = ({
  opened,
  setOpened,
  label,
  image,
  borrowed,
  stock
}) => {
  const isAvailable = borrowed < stock;
  const theme = useMantineTheme();

  const [openedDelete, setOpenedDelete] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  return (
    <>
      <MyModal
        opened={opened}
        setOpened={setOpened}
        title={label}
        onClose={() => {
          console.log("Terclose");
        }}
        minWidth={950}
      >
        <Group className="gap-10 flex-nowrap relative">
          <div className="rounded-lg rounded-bl-none overflow-hidden shrink-0 cursor-pointer bg-secondary-500">
            <img src={image || ""} alt="" className="w-96 h-96 object-cover" />
          </div>
          <Stack className="self-start">
            <Stack className="gap-1">
              <Text className="text-primary-text font-semibold text-xl">Status</Text>
              <Text
                className={`
              ${
                isAvailable ? `text-green` : `text-red`
              } font-poppins -mt-1`}
              >
                {isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </Text>
            </Stack>
            <Stack className="gap-0">
              <Text className="text-primary-text font-semibold text-xl">Stok</Text>
              <Group className="gap-10">
                <Stack className="gap-2">
                  <Text className="text-secondary-text text-md font-semibold">
                    Tersedia
                  </Text>
                  <Group className="gap-1">
                    <Text className="bg-green px-2 py-[2px] rounded-xl text-white font-poppins text-2xl -mt-1">
                      {stock-borrowed}
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
                    <Text className="bg-red px-2 py-[2px] rounded-xl text-white font-poppins text-2xl -mt-1">
                      {borrowed}
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
                    <Text className="bg-primary-text px-2 py-[2px] rounded-xl text-white font-poppins text-2xl -mt-1">
                      {stock}
                    </Text>
                    <Text className="text-primary-text font-poppins text-xl -mt-1">
                      Item
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>
            <Stack className="gap-1 mt-1">
              <Text className="text-primary-text font-semibold text-xl">
                Deskripsi Barang
              </Text>
              <Text className="text-primary-text text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                dolore porro pariatur quod, distinctio saepe error fugiat
                voluptatum molestiae dolorum. lorem1000
              </Text>
            </Stack>
            <Grid className="absolute bottom-0 right-0 left-[422px]">
              <Grid.Col span={3} className="">
                <Group className="flex-nowrap">
                  <IconTrashFilled
                    size={36}
                    color={theme.colors["white"][5]}
                    onClick={() => {
                      setOpenedDelete(true);
                    }}
                    className="h-10 w-full p-[6px] rounded-full bg-dark-red cursor-pointer border border-dark-red"
                  />
                  <IconEditFilled
                    size={36}
                    color={theme.colors["orange"][5]}
                    onClick={() => {
                      setOpenedEdit(true);
                    }}
                    className="h-10 w-full p-[6px] rounded-full bg-white cursor-pointer border-2 border-orange"
                  />
                </Group>
              </Grid.Col>

              <Grid.Col span={9}>
                <Button size="md" className="rounded-full bg-red hover:bg-light-red duration-200 w-full">
                  Pinjam
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </Group>
      </MyModal>
      <EditNewCatalogModal opened={openedEdit} setOpened={setOpenedEdit} />
      <WarningModal
        opened={openedDelete}
        setOpened={setOpenedDelete}
        title={`Hapus Barang : ${label} ?`}
        onClose={() => {}}
        yesButtonLabel="Hapus"
        children={`Aksi ini akan menghapus barang dari katalog. Pastikan bahwa tidak ada peminjaman dari barang ini saat akan menghapus`}
        onSubmit={() => {
          setOpened(false);
          setOpenedDelete(false);
        }}
      />
    </>
  );
};
export default CatalogItemDetailModal;
