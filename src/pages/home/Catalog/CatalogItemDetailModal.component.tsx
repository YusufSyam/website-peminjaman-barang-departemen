import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
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
}

const CatalogItemDetailModal: React.FC<ICatalogItemDetailModal> = ({
  opened,
  setOpened,
  label,
  image
}) => {
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
                    <Text className="bg-green px-2 py-[2px] rounded-md text-white font-poppins text-2xl -mt-1">
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
                    <Text className="bg-red px-2 py-[2px] rounded-md text-white font-poppins text-2xl -mt-1">
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
                    <Text className="bg-secondary-text px-2 py-[2px] rounded-md text-white font-poppins text-2xl -mt-1">
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
                  onClick={() => {
                    setOpenedDelete(true);
                  }}
                  className="p-[6px] rounded-md bg-dark-red cursor-pointer border border-dark-red"
                />
                <IconEditFilled
                  size={36}
                  color={theme.colors["orange"][5]}
                  onClick={()=>{
                    setOpenedEdit(true)
                  }}
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
