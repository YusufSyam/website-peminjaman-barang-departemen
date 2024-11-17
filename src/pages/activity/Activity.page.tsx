import { Checkbox, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.layout";

import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery } from "react-query";
import {
  IconReplyOutline,
  IconShareWindowsOutline
} from "../../assets/icons/Fluent";
import noItem from "../../assets/images/no-item.png";
import { MySearchInput } from "../../components/FormInput.component";
import LoadingModal from "../../components/LoadingModal.component";
import WarningModal from "../../components/WarningModal.component";
import { AuthContext } from "../../context/AuthContext.context";
import { BASE_URL } from "../../utils/const/api";
import {
  extractTime,
  formatDateDetection,
  formatDateNormal
} from "../../utils/function/date.function";
import {
  qfFetchAllLentActivity,
  qfReturnItem
} from "../../utils/query/item-query";
import NotFound from "../not-found/NotFound.page";
import ActivityTableComponent, {
  IActivityTableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps
} from "./ActivityTable.component";
import { staffMap } from "../../utils/const/miscConst";

export interface IActivity {}

export interface IBorrowActivity {
  id: string;
  itemName: string;
  itemImage: string;
  borrower: string;
  nim?: string;
  activityType: "borrow" | "return";
  borrowDate: Date;
  supposedReturnDate?: Date;
  actualReturnDate?: Date;
  additionalInformation: string;
  roomName?: string;
  staffName?: string;
}

function formatLentActivity(beData: any[] = []) {
  const formatted = beData?.map((d) => {
    const imageLinkSplit = d?.item.itemThumbnail?.split("media\\");
    const imageLink =
      imageLinkSplit.length > 1
        ? `${BASE_URL}/uploaded-file/${imageLinkSplit[1]}`
        : "";

    const data: IBorrowActivity = {
      activityType: d?.status == "LENT" ? "borrow" : "return",
      borrowDate: new Date(d?.lendStartTime),
      additionalInformation: d?.description,
      staffName: d?.staffName,
      supposedReturnDate: new Date(d?.lendEndTime),
      borrower: d?.student.name,
      nim: d?.student.studentId,
      itemImage: imageLink,
      itemName: d?.item.name,
      id: d?.id,
      roomName: d?.roomName,
      actualReturnDate: new Date()
    };

    return data;
  });

  return formatted;
}

const tableHeadings: IFETableHeadingProps[] = [
  {
    label: "No",
    sortable: true,
    textAlign: "center",
    cellKey: "index"
  },
  {
    label: "Barang",
    sortable: true,
    textAlign: "center",
    cellKey: "item",
    width: "200px"
  },
  {
    label: "Peminjam",
    sortable: true,
    textAlign: "center",
    cellKey: "borrower"
  },
  {
    label: "Aktivitas",
    sortable: true,
    textAlign: "center",
    cellKey: "activity",
    width: "210px"
  },
  {
    label: "Detail Waktu",
    sortable: true,
    textAlign: "center",
    cellKey: "timeDetail"
  },
  {
    label: "Keterangan",
    sortable: true,
    textAlign: "center",
    cellKey: "additionalInformation",
    width: "100px"
  }
  // {
  //   label: "Aksi",
  //   sortable: true,
  //   textAlign: "center",
  //   cellKey: "action"
  // }
];

const Activity: React.FC<IActivity> = ({}) => {
  const { data, refetch } = useQuery(`fetch-all-lent`, qfFetchAllLentActivity, {
    onSuccess(data) {
      console.log(data, "dasdasdasd");
      setFormattedData(formatLentActivity(data?.data || []));
    }
  });

  const putReturnItemMutation = useMutation("put-return-item", qfReturnItem, {
    onSuccess() {
      refetch();
    }
  });

  console.log(data, "data");

  const amtDataPerPage = 5;
  const [activePage, setActivePage] = useState<number>(1);
  const theme = useMantineTheme();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query] = useDebouncedValue(searchTerm, 500);

  const [selectedDate] = useState<Date | null>(null);
  const [selectedRow, setSelectedRow] = useState(0);
  const [isReturnItemModalOpened, setIsReturnItemModalOpened] = useState(false);
  const [isJustLentChecked, setIsJustLentChecked] = useState(false);

  // const borrowActivities: Array<IBorrowActivity> = dummyBorrowActivities;
  const [formattedData, setFormattedData] = useState(
    formatLentActivity(data?.data || [])
  );
  const [borrowActivities, setBorrowActivities] =
    useState<Array<IBorrowActivity>>(formattedData);

  useEffect(() => {
    setBorrowActivities(formattedData);
  }, [formattedData]);

  console.log("borrowActivities", borrowActivities);

  useEffect(() => {
    const lowerQuery = query?.toLowerCase();

    let tempActivity = formattedData?.filter(
      (d: IBorrowActivity) =>
        d?.itemName?.toLowerCase()?.includes(lowerQuery) ||
        d?.borrower?.toLowerCase()?.includes(lowerQuery) ||
        d?.nim?.toLowerCase()?.includes(lowerQuery) 
    );

    if (selectedDate != null) {
      tempActivity = tempActivity?.filter(
        (d: IBorrowActivity) =>
          formatDateDetection(d?.borrowDate) ==
          formatDateDetection(selectedDate)
      );

      console.log(tempActivity, "tempActivity");
    }

    if (isJustLentChecked) {
      tempActivity = tempActivity?.filter(
        (d: IBorrowActivity) => d.activityType === "borrow"
      );
    }

    tempActivity.sort(
      (a, b) => b.borrowDate.getTime() - a.borrowDate.getTime()
    );
    setBorrowActivities(tempActivity);
  }, [query, selectedDate, isJustLentChecked, formattedData]);

  console.log(selectedDate, "selectedDate");
  console.log(
    borrowActivities?.[0]?.borrowDate,
    formatDateDetection(borrowActivities?.[0]?.borrowDate),
    "borrowActivities"
  );
  console.log(
    selectedDate,
    formatDateDetection(selectedDate || new Date()),
    "borrowActivities"
  );
  console.log(
    borrowActivities?.[0]?.borrowDate?.getTime() === selectedDate?.getTime(),
    "borrowActivities"
  );

  const actions: IActivityTableAction[] = [
    {
      label: "Pengembalian",
      eachButtonRounded: true,
      backgroundColor: "green",
      isDisabled: (row: any) => {
        return row.activity.label == "return";
      },
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.id.label);
        setIsReturnItemModalOpened(true);
      }
    }
  ];

  const tableRows = borrowActivities?.map(
    (data, idx) =>
      ({
        id: {
          label: idx
        },
        index: {
          label: idx + 1
        },
        item: {
          label: data.itemName,
          element: (
            <Stack className="gap-2">
              <Stack className="w-24 h-20 m-auto overflow-hidden rounded-2xl">
                <img
                  src={data.itemImage == "" ? noItem : data.itemImage}
                  className="w-24 h-20 object-cover"
                />
              </Stack>
              <Text className="text-primary-text-500 font-poppins">
                {data.itemName}
              </Text>
            </Stack>
          )
        },
        borrower: {
          label: data.borrower,
          element: (
            <Stack className="gap-0">
              <Text className="font-poppins text-md text-primary-text-500">
                {data.borrower}
              </Text>
              <Text className="font-poppins text-md text-secondary-text-500">
                ({data?.nim})
              </Text>
            </Stack>
          )
        },
        activity: {
          label: data.activityType,
          element: (
            <Stack className="w-full gap-2">
              <Group
                className={`${
                  data.activityType == "borrow" ? "bg-red" : "bg-green"
                } self-center w-fit mx-auto py-[6px] px-4 rounded-full gap-2 flex-nowrap`}
              >
                {data.activityType == "borrow" ? (
                  <IconShareWindowsOutline
                    size={18}
                    color={theme.colors["white"][5]}
                  />
                ) : (
                  <IconReplyOutline
                    size={18}
                    color={theme.colors["white"][5]}
                  />
                )}
                <Text className="text-md text-white font-semibold">
                  {data.activityType == "borrow" ? "Meminjam" : "Mengembalikan"}
                </Text>
              </Group>
              {/* <Stack className="gap-0">
                <Text className="text-red font-bold text-sm">
                  Dikembalikan Sebelum:
                </Text>
                <Text>{formatDateNormal(data.supposedReturnDate || new Date())}</Text>
              </Stack> */}
            </Stack>
          )
        },
        timeDetail: {
          label: data.itemName,
          element: (
            <Stack className="w-fit mx-auto gap-4">
              <Stack className="self-start text-start gap-0">
                <Text className="font-semibold text-primary-text">
                  Waktu Peminjaman
                </Text>
                <Text className="text-primary-text">
                  {formatDateNormal(data.borrowDate)}
                </Text>
                <Text className="text-secondary-text -mt-1 text-sm font-semibold">
                  Pukul {extractTime(data.borrowDate)}
                </Text>
              </Stack>
              <Stack className="self-start text-start gap-0">
                <Text className="font-semibold text-primary-text">
                  Wajib Dikembalikan Sebelum
                </Text>
                <Text className="text-primary-text">
                  {formatDateNormal(data.supposedReturnDate || new Date())}
                </Text>
                <Text className="text-secondary-text -mt-1 text-sm font-semibold">
                  Pukul {extractTime(data.supposedReturnDate || new Date())}
                </Text>
              </Stack>
              {/* <Divider /> */}
              {/* {data.activityType == "return" && (
                <>
                  <Divider />
                  <Stack className="gap-0">
                    <Group className="gap-2">
                      <Text className="font-semibold text-primary-text">
                        Waktu Pengembalian Seharusnya
                      </Text>
                      <Text className="text-primary-text">
                        {formatDateNormal(data.supposedReturnDate)},{" "}
                        {data.supposedReturnTime}:00
                      </Text>
                    </Group>
                    <Group className="gap-2">
                      <Text className="font-semibold text-primary-text">
                        Waktu Dikembalikan Barang
                      </Text>
                      <Text className="text-primary-text">
                        {formatDateNormal(
                          data.supposedReturnDate || new Date()
                        )}
                        ,{" "}
                      </Text>
                    </Group>
                  </Stack>
                </>
              )} */}
            </Stack>
          )
        },
        additionalInformation: {
          label: data.additionalInformation,
          element: (
            <Stack className="w-fit mx-auto gap-1">
              
              <Stack className="self-start text-start gap-0">
                <Text className="font-semibold text-primary-text">Tempat</Text>
                <Text className="text-primary-text">{data.roomName}</Text>
              </Stack>
              <Stack className="self-start text-start gap-0">
                <Text className="font-semibold text-primary-text">Staff</Text>
                <Text className="text-primary-text">{staffMap?.[data?.staffName || "4"] || "-"}</Text>
              </Stack>
              <Stack className="self-start text-start gap-0">
                <Text className="font-semibold text-primary-text">Catatan</Text>
                <Text className="text-primary-text w-40 max-w-40 break-words whitespace-normal">{data.additionalInformation}</Text>
              </Stack>
            </Stack>
            // <div className="w-[200px] bg-green">
            //   <p className="h-[100px] w-[200px] text-primary-text text-justify bg-red break-all">
            //    a Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //     Quae, voluptatibus!
            //   </p>
            // </div>
          )
        }
      } as IFETableRowColumnProps)
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
    setActivePage(1);
  }

  console.log(selectedDate, "selectedDate");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = authContext;

  if (!isLoggedIn) {
    return <NotFound />;
  }

  return (
    <MainLayout activePage="Aktivitas">
      <Stack className="px-12 mt-6 gap-4">
        <WarningModal
          opened={isReturnItemModalOpened}
          setOpened={setIsReturnItemModalOpened}
          title={"Pengembalian Barang"}
          onClose={() => {}}
          minWidth={700}
          yesButtonLabel="Kembalikan"
          onSubmit={() => {
            putReturnItemMutation.mutate(borrowActivities?.[selectedRow]?.id);
            setIsReturnItemModalOpened(false);
          }}
        >
          <Stack className="text-primary-text">
            <Text>
              Lakukan aksi ini jika mahasiswa yang bersangkutan:
              <span className="font-poppins">
                {" "}
                <span>{borrowActivities?.[selectedRow]?.borrower}</span>{" "}
                <span className="text-secondary-text-500">
                  ({borrowActivities?.[selectedRow]?.nim})
                </span>
              </span>
            </Text>{" "}
            <Text>
              Telah mengembalikan{" "}
              <span className="text-red font-semibold">
                {borrowActivities?.[selectedRow]?.itemName}
              </span>{" "}
              yang dipinjam sebelumnya pada{" "}
              {formatDateNormal(borrowActivities?.[selectedRow]?.borrowDate)}{" "}
              dalam keadaan baik. Klik "Kembalikan" untuk melakukan pengembalian
            </Text>
          </Stack>
        </WarningModal>
        <LoadingModal opened={putReturnItemMutation.isLoading} />
        <Group className="my-4 justify-between">
          <Text className="font-poppins-semibold text-primary-text text-[28px] lg:text-[30px] ml-1">
            Riwayat Peminjaman
          </Text>
          <Group className="gap-6">
            {/* <MyDatePickerInput
              size="md"
              locale="id"
              defaultValue={selectedDate}
              valueFormat="DD MMM"
              value={selectedDate}
              onChange={setSelectedDate}
              clearable
            /> */}
          </Group>
        </Group>
        <Stack className="gap-0 rounded-t-3xl overflow-hidden">
          <Group className="justify-between backdrop-blur-3xl bg-red  py-4 px-8">
            <Group className="">
              <Text className="font-poppins-semibold text-2xl text-white">
                Daftar Aktivitas
              </Text>
              <Text className="text-white">
                ({borrowActivities.length} Item)
              </Text>
            </Group>
            <Group>
              <Group
                className="bg-white px-4 py-[6px] rounded-full border-2 border-red cursor-pointer"
                onClick={() => {
                  setIsJustLentChecked(!isJustLentChecked);
                }}
              >
                <Checkbox checked={isJustLentChecked} color="red" />
                <Text className="text-primary-text-500/80 font-semibold pb-1">
                  Hanya Meminjam
                </Text>
              </Group>
              <MySearchInput
                onChange={handleSearchChange}
                w={240}
                placeholder="Cari barang / nim . . ."
              />
            </Group>
          </Group>
          <ActivityTableComponent
            noDataMsg=""
            isLoading={false}
            dataPerPageAmt={amtDataPerPage}
            onSearch={() => {
              // console.log("Searching for: ", value);
            }}
            onPageChange={setActivePage}
            activePage={activePage}
            actions={actions}
            tableTitle="Deteksi Terbaru"
            tableRows={tableRows}
            tableHeadings={tableHeadings}
            withSearch={false}
            actionOrientation="vertical"
            onProgressData={0}
            showTableHeader
            actionColumnWidth="200px"
          />
        </Stack>
      </Stack>
    </MainLayout>
  );
};
export default Activity;
