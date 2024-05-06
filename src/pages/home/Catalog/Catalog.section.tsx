import {
  Button,
  Grid,
  Group,
  Pagination,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CatalogItem, { ICatalogItem } from "./CatalogItem.component";
import { dummyCatalogList } from "../../../utils/const/dummy";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAddFilled, SearchFilled } from "../../../assets/icons/Fluent";
import MyModal from "../../../components/MyModal.component";
import {
  MyNumberInput,
  MyTextInput
} from "../../../components/FormInput.component";
import {
  IAddNewCatalogItemInterfaces,
  AddNewCatalogItemSchema
} from "./AddNewCatalogItemInterfaces.interface";
import { useForm, yupResolver } from "@mantine/form";
import DocumentInput from "../../../components/DocumentInput.component";
import { MIME_TYPES } from "@mantine/dropzone";

export interface ICatalog {}

const Catalog: React.FC<ICatalog> = ({}) => {
  const theme = useMantineTheme();

  const [catalogList, setCatalogList] =
    useState<Array<ICatalogItem>>(dummyCatalogList);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query] = useDebouncedValue(searchTerm, 500);

  const [activePage, setActivePage] = useState<number>(1);
  const [pageAmt, setPageAmt] = useState(0);
  const dataPerPageAmt = 8;

  const [openedAddItem, setOpenedAddItem] = useState(false);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
    setActivePage(1);
  }

  const form = useForm<IAddNewCatalogItemInterfaces>({
    validate: yupResolver(AddNewCatalogItemSchema)
  });

  const {
    getInputProps,
    errors,
    isDirty,
    values,
    setValues,
    reset,
    isValid,
    onSubmit
  } = form;

  useEffect(() => {
    setPageAmt(Math.round(catalogList?.length / dataPerPageAmt + 0.4));
  }, [catalogList]);

  useEffect(() => {
    const tempCatalogList = dummyCatalogList?.filter((d: ICatalogItem) =>
      d?.label?.toLowerCase()?.includes(query?.toLowerCase())
    );

    setCatalogList(tempCatalogList);
  }, [query]);

  console.log(query);
  console.log(catalogList);

  console.log('values',values)

  return (
    <Stack>
      <MyModal
        opened={openedAddItem}
        setOpened={setOpenedAddItem}
        title={"Tambah Barang Baru Pada Katalog"}
        onClose={() => {}}
        minWidth={600}
      >
        <Stack>
          <MyTextInput
            label="Nama Barang"
            size="md"
            placeholder="Masukkan Nama Barang"
            {...getInputProps("itemName")}
            error={errors["itemName" as keyof IAddNewCatalogItemInterfaces]}
            defaultValue={""}
          />
          <MyNumberInput
            label="Stok Barang"
            size="md"
            placeholder="Masukkan Jumlah Stok Barang"
            {...getInputProps("stock")}
            error={errors["stock" as keyof IAddNewCatalogItemInterfaces]}
            defaultValue={""}
            min={0}
          />
          <MyTextInput
            label="Deskripsi"
            size="md"
            placeholder="Masukkan Deskripsi Barang"
            {...getInputProps("description")}
            error={errors["description" as keyof IAddNewCatalogItemInterfaces]}
            defaultValue={""}
          />
          <DocumentInput
            withDelete
            {...getInputProps("image")}
            required
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.mp4]}
            label="Gambar Barang"
            placeholder="Seret dan tempatkan file, atau klik untuk memilih file."
            description="Ekstensi file png, jpeg atau mp4. Ukuran file maksimal 100 MB."
            error={
              errors[`${"image" as keyof IAddNewCatalogItemInterfaces}.name`]
            }
            maxSize={100_000_000}
          />
          <Button className="bg-green hover:bg-green">
            Tambah
          </Button>
        </Stack>
      </MyModal>
      <Group className="mb-4 justify-between">
        <Stack className="gap-0">
          <Group>
            <Text className="text-primary-text font-poppins-semibold text-[32px] text-start">
              Katalog Inventaris
            </Text>

            <div className="w-1 h-1 mt-1 rounded-full bg-secondary-text"></div>

            <Group className="">
              <Text className="text-secondary-text font-semibold">
                Total {dummyCatalogList?.length} Item
              </Text>
            </Group>
          </Group>
          <Text className="text-secondary-text text-start -mt-1">
            Jelajahi daftar barang dan status ketersediaannya
          </Text>
        </Stack>
        <Group>
          <Button
            className="rounded-md bg-gradient-to-r from-green to-light-green"
            onClick={() => {
              setOpenedAddItem(true);
            }}
            leftIcon={
              <IconAddFilled
                color={theme.colors["green"][5]}
                className="-ml-[6px] rounded-sm p-[2px] bg-white"
              />
            }
          >
            Tambah Barang
          </Button>
        </Group>
      </Group>
      <Grid className="" gutter={32}>
        {catalogList
          ?.slice(
            (activePage - 1) * dataPerPageAmt,
            (activePage - 1) * dataPerPageAmt + dataPerPageAmt
          )
          ?.map((item: ICatalogItem, idx: number) => {
            return (
              <Grid.Col key={idx} span={3}>
                <CatalogItem {...item} />
              </Grid.Col>
            );
          })}
      </Grid>
      <Group className="gap-0 self-center">
        <Pagination
          color={"red"}
          onChange={(e) => {
            setActivePage(e);
          }}
          total={pageAmt}
          disabled={pageAmt == 0}
          withEdges
        />
      </Group>
    </Stack>
  );
};
export default Catalog;
