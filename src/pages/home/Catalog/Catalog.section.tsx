import {
  Button,
  Grid,
  Group,
  Pagination,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { IconAddFilled, SearchFilled } from "../../../assets/icons/Fluent";
import { dummyCatalogList } from "../../../utils/const/dummy";
import AddNewCatalogModal from "./AddNewCatalogModal.component";
import CatalogItem, { ICatalogItem } from "./CatalogItem.component";
import { MyTextInput } from "../../../components/FormInput.component";

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

  useEffect(() => {
    setPageAmt(Math.round(catalogList?.length / dataPerPageAmt + 0.4));
  }, [catalogList]);

  useEffect(() => {
    const tempCatalogList = dummyCatalogList?.filter((d: ICatalogItem) =>
      d?.label?.toLowerCase()?.includes(query?.toLowerCase())
    );

    setCatalogList(tempCatalogList);
  }, [query]);

  return (
    <Stack>
      <AddNewCatalogModal opened={openedAddItem} setOpened={setOpenedAddItem} />
      <Group className=" justify-between">
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
            className="bg-green hover:bg-light-green duration-100 rounded-full"
            onClick={() => {
              setOpenedAddItem(true);
            }}
            leftIcon={
              <IconAddFilled
                color={theme.colors["white"][5]}
                className="-ml-[2px]"
              />
            }
          >
            Tambah Barang
          </Button>
        </Group>
      </Group>

      <Group className="self-center mb-4">
        <MyTextInput
          icon={<SearchFilled color="#dfdfdf" />}
          onChange={handleSearchChange}
          placeholder="Cari barang . . ."
          size="md"
          className="w-96"
        />
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
