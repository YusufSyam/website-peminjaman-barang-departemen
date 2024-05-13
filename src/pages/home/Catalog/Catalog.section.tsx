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
import { useMutation, useQuery } from "react-query";
import { IconAddFilled } from "../../../assets/icons/Fluent";
import { MySearchInput } from "../../../components/FormInput.component";
import Loading from "../../../components/Loading.component";
import {
  qfAddItem,
  qfDeleteItem,
  qfEditItem,
  qfFetchAllItems,
  qfLentItem
} from "../../../utils/query/item-query";
import AddNewCatalogModal from "./AddNewCatalogModal.component";
import CatalogItem, { ICatalogItem } from "./CatalogItem.component";
import LoadingModal from "../../../components/LoadingModal.component";

export interface ICatalog {}

function formatCatalogItem(beData: any[] = []) {
  const formatted = beData?.map((d) => {
    const data: ICatalogItem = {
      itemId: d?.itemId,
      label: d?.name,
      stock: d?.stock,
      borrowed: d?.totalItem - d?.stock,
      image: d?.thumbnail,
      description: d?.description
    };

    return data;
  });

  return formatted;
}

const Catalog: React.FC<ICatalog> = ({}) => {
  const theme = useMantineTheme();

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
    isRefetching
  } = useQuery(`fetch-all-items`, qfFetchAllItems, {
    onSuccess(data) {
      setFormattedData(formatCatalogItem(data?.data || []));
    }
  });

  const postAddItemMutation = useMutation("post-add-item", qfAddItem, {
    onSuccess() {
      refetch();
    }
  });

  const postLentItemMutation = useMutation("post-lent-item", qfLentItem, {
    onSuccess() {
      refetch();
    }
  });

  const putEditItemMutation = useMutation("put-edit-item", qfEditItem, {
    onSuccess() {
      refetch();
    }
  });

  const deleteItemMutation = useMutation("delete-Items", qfDeleteItem, {
    onSuccess() {
      refetch();
    }
  });

  console.log(data, "data");

  const [formattedData, setFormattedData] = useState(
    formatCatalogItem(data?.data || [])
  );
  const [catalogList, setCatalogList] =
    useState<Array<ICatalogItem>>(formattedData);
  console.log("RRRRRRRRRRRRRRRRRRRRRRR data", data);
  console.log("RRRRRRRRRRRRRRRRRRRRRRR formattedData", formattedData);
  console.log("RRRRRRRRRRRRRRRRRRRRRRR catalogList", catalogList);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query] = useDebouncedValue(searchTerm, 500);

  const [activePage, setActivePage] = useState<number>(1);
  const [pageAmt, setPageAmt] = useState(0);
  const dataPerPageAmt = 20;

  const [openedAddItem, setOpenedAddItem] = useState(false);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
    setActivePage(1);
  }

  useEffect(() => {
    setPageAmt(Math.round(catalogList?.length / dataPerPageAmt + 0.4));
  }, [catalogList]);

  useEffect(() => {
    setCatalogList(formattedData);
  }, [formattedData]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //       // Fetch data from the API using Axios and the fieldId from the URL
    //       const response = await instance.get(`/api/items`);
    //       const data = response.data;

    //       // Set the fetched data in the state
    //       // setCatalogList(data.data);
    //       console.log(data.data);
    //       setCatalogList(data.data.map((i: any) => ({
    //         label: i.name,
    //         stock: i.totalItem,
    //         description: i.description,
    //         borrowed: i.totalItem - i.stock
    //       })));
    //   } catch (error) {
    //       console.error('Error fetching data:', error);
    //   }

    // }
    // fetchData()
    const tempCatalogList = formattedData?.filter((d: ICatalogItem) =>
      d?.label?.toLowerCase()?.includes(query?.toLowerCase())
    );

    setCatalogList(tempCatalogList);
  }, [query]);
  return (
    <Stack>
      <AddNewCatalogModal
        opened={openedAddItem}
        setOpened={setOpenedAddItem}
        postAddItemMutation={postAddItemMutation}
      />
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
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Grid className="" gutter={32}>
            {catalogList
              ?.slice(
                (activePage - 1) * dataPerPageAmt,
                (activePage - 1) * dataPerPageAmt + dataPerPageAmt
              )
              ?.map((item: ICatalogItem, idx: number) => {
                return (
                  <Grid.Col key={idx} span={3}>
                    <CatalogItem
                      {...item}
                      deleteItemMutation={deleteItemMutation}
                      putEditItemMutation={putEditItemMutation}
                      postLentItemMutation={postLentItemMutation}
                    />
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
                    backgroundColor:
                      theme.colors["light-red"][5] + " !important",
                    border: "2px solid #FFFFFF",
                    color: theme.colors["white"][5]
                  }
                }
              }}
            />
          </Group>
        </>
      )}
      <LoadingModal
        opened={
          postAddItemMutation.isLoading ||
          putEditItemMutation.isLoading ||
          deleteItemMutation.isLoading ||
          postLentItemMutation.isLoading
        }
      />
    </Stack>
  );
};
export default Catalog;
