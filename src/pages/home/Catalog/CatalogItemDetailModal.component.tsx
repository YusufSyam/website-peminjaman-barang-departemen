import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { IconTrashFilled, IconEditFilled } from "../../../assets/icons/Fluent";
import MyModal from "../../../components/MyModal.component";
import WarningModal from "../../../components/WarningModal.component";
import EditNewCatalogModal from "./EditNewCatalogModal.component";
import { UseMutationResult } from "react-query";
import { IAddNewItem, IEditItem } from "../../../utils/query/item-query";
import LentItemModal from "./LentItemModal.component";
import { ILentItem } from "./CatalogItemInputInterfaces.interface";
import { AuthContext } from "../../../context/AuthContext.context";
import InformationNotification from "../../../components/InformationNotification.component";

export interface ICatalogItemDetailModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  image: string;
  stock: number;
  borrowed: number;
  description: string;
  putEditItemMutation?: UseMutationResult<any, unknown, IEditItem, unknown>;
  deleteItemMutation?: UseMutationResult<any, unknown, string, unknown>;
  postLentItemMutation?: UseMutationResult<any, unknown, ILentItem, unknown>;
  itemId: string;
}

const CatalogItemDetailModal: React.FC<ICatalogItemDetailModal> = ({
  opened,
  setOpened,
  label,
  image,
  borrowed,
  stock,
  description = "-",
  putEditItemMutation,
  deleteItemMutation,
  itemId,
  postLentItemMutation
}) => {
  const isAvailable = (stock-borrowed>0);
  const theme = useMantineTheme();

  function handleDeleteItem() {
    deleteItemMutation?.mutate(itemId);
  }

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = authContext;

  useEffect(() => {
    if (deleteItemMutation?.isSuccess) {
      setOpened(false);
      setOpenedDelete(false);
    }
  }, [deleteItemMutation?.isSuccess]);

  const [openedDelete, setOpenedDelete] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedLentItem, setOpenedLentItem] = useState(false);
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
              <Text className="text-primary-text font-semibold text-xl">
                Status
              </Text>
              <Text
                className={`
              ${isAvailable ? `text-green` : `text-red`} font-poppins -mt-1`}
              >
                {isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </Text>
            </Stack>
            <Stack className="gap-0">
              <Text className="text-primary-text font-semibold text-xl">
                Stok
              </Text>
              <Group className="gap-10">
                <Stack className="gap-2">
                  <Text className="text-secondary-text text-md font-semibold">
                    Tersedia
                  </Text>
                  <Group className="gap-1">
                    <Text className="bg-green px-2 py-[2px] rounded-xl text-white font-poppins text-2xl -mt-1">
                      {stock - borrowed}
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
                {description}
              </Text>
            </Stack>
            {isLoggedIn ? (
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
                  <Button
                    size="md"
                    className="rounded-full bg-red hover:bg-light-red duration-200 w-full"
                    onClick={() => {
                      setOpenedLentItem(true);
                    }}
                    disabled={!isAvailable}
                  >
                    Pinjam
                  </Button>
                </Grid.Col>
              </Grid>
            ) : (
              <div className="absolute bottom-0 right-0 left-[422px] text-red">
                <InformationNotification
                  info={
                    "Untuk meminjam barang, silahkan datang ke departemen dengan membawa Kartu Mahasiswa (KTM) "
                  }
                />
              </div>
            )}
          </Stack>
        </Group>
      </MyModal>
      <EditNewCatalogModal
        opened={openedEdit}
        setOpened={setOpenedEdit}
        putEditItemMutation={putEditItemMutation}
        label={label}
        image={image}
        stock={stock}
        description={description}
        itemId={itemId}
      />
      <LentItemModal
        opened={openedLentItem}
        setOpened={setOpenedLentItem}
        postLentItemMutation={postLentItemMutation}
        itemId={itemId}
      />
      <WarningModal
        opened={openedDelete}
        setOpened={setOpenedDelete}
        title={`Hapus Barang : ${label} ?`}
        onClose={() => {}}
        yesButtonLabel="Hapus"
        children={`Aksi ini akan menghapus barang dari katalog. Pastikan bahwa tidak ada peminjaman dari barang ini saat akan menghapus`}
        onSubmit={() => {
          handleDeleteItem();
        }}
      />
    </>
  );
};
export default CatalogItemDetailModal;
