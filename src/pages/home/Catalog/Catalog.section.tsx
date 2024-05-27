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
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IconAddFilled } from "../../../assets/icons/Fluent";
import { MySearchInput } from "../../../components/FormInput.component";
import Loading from "../../../components/Loading.component";
import LoadingModal from "../../../components/LoadingModal.component";
import WarningModal from "../../../components/WarningModal.component";
import { AuthContext } from "../../../context/AuthContext.context";
import { BASE_URL } from "../../../utils/const/api";
import {
  qfAddItem,
  qfDeleteItem,
  qfEditItem,
  qfFetchAllItems,
  qfLentItem
} from "../../../utils/query/item-query";
import AddNewCatalogModal from "./AddNewCatalogModal.component";
import CatalogItem, { ICatalogItem } from "./CatalogItem.component";

export interface ICatalog {}

function formatCatalogItem(beData: any[] = []) {
  const formatted = beData?.map((d) => {
    const imageLinkSplit = d?.thumbnail?.split("media\\");
    const imageLink =
      imageLinkSplit.length > 1
        ? `${BASE_URL}/uploaded-file/${imageLinkSplit[1]}`
        : "";

    const data: ICatalogItem = {
      itemId: d?.itemId,
      label: d?.name,
      stock: d?.totalItem,
      borrowed: d?.totalItem - d?.stock,
      image: imageLink,
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
    refetch,
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
    onSuccess(data) {
      if (data?.status === "success") {
        refetch();
      } else {
        if (data?.error?.code === "E444") {
          setErrorMessage(
            "Mahasiswa belum terdaftar, silahkan daftarkan mahasiswa terlebih dahulu untuk melanjutkan peminjaman"
          );
        } else {
          setErrorMessage(data?.error?.message || "");
        }

        setOpenedErrorAddItem(true)
      }
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

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = authContext;

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
  const dataPerPageAmt = 8;

  const [openedAddItem, setOpenedAddItem] = useState(false);
  const [openedErrorAddItem, setOpenedErrorAddItem] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  }, [query, formattedData]);

  console.log("formatCatalogItemlll", formattedData);
  console.log("formatCatalogItemlll", catalogList);
  return (
    <Stack>
      <AddNewCatalogModal
        opened={openedAddItem}
        setOpened={setOpenedAddItem}
        postAddItemMutation={postAddItemMutation}
      />
      {/* <Group className=" mb-4 self-center"> */}
      <Group className="my-4 justify-between">
        <Text className="font-poppins-semibold text-primary-text text-[28px] lg:text-[30px] ml-1">
          Katalog Inventaris
        </Text>
        <Group className="gap-6">
          <MySearchInput
            onChange={handleSearchChange}
            w={280}
            placeholder="Cari barang . . ."
          />
          {isLoggedIn && (
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
          )}
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
                  <Grid.Col key={idx} sm={6} md={4} lg={3}>
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
      <WarningModal
        opened={openedErrorAddItem}
        setOpened={setOpenedErrorAddItem}
        title={"Terjadi Kesalahan"}
        onClose={() => {}}
        onSubmit={()=>{
          setOpenedErrorAddItem(false)
        }}
        disableNoButton
        yesButtonLabel="Oke"
        children={errorMessage}
      />
    </Stack>
  );
};
export default Catalog;
