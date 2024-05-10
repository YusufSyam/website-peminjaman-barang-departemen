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
import {
  MySearchInput,
  MyTextInput
} from "../../../components/FormInput.component";

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
      {/* <Group className=" mb-4 self-center"> */}
      <Group className="my-4 justify-between">
        <Text className="font-poppins-semibold text-primary-text text-[30px] ml-1">
          Katalog Inventaris
        </Text>
        <Group className="gap-6">
          <MySearchInput
            onChange={handleSearchChange}
            w={280}
            placeholder="Cari barang . . ."
          />
          <Button
            className="bg-green hover:bg-light-green duration-100 rounded-full"
            onClick={() => {
              setOpenedAddItem(true);
            }}
            size="md"
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
      <Group className="gap-0 self-center mt-4">
        <Pagination
          color={"dark-red"}
          onChange={(e) => {
            setActivePage(e);
          }}
          total={pageAmt}
          disabled={pageAmt == 0}
          withEdges
          styles={{
            control: {
              color: theme.colors["primary-text"][5],
              borderRadius: "999px",
              padding: "16px",
              border: "2px solid #d4d3e7",
              fontFamily: "poppins",
              // backgroundColor: theme.colors['white'][5],
              ":active": {
                color: theme.colors["white"][5] + " !important"
              },
              ":hover": {
                backgroundColor: theme.colors["light-red"][5] + " !important",
                border: "2px solid #FFFFFF",
                color: theme.colors["white"][5]
              }
            }
          }}
        />
      </Group>
    </Stack>
  );
};
export default Catalog;
