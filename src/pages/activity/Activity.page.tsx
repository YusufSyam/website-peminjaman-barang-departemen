import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import {
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import ActivityItem, { IActivityItem } from "./ActivityItem.component";
import {
  MyDatePickerInput,
  MySearchInput,
  MyTextInput
} from "../../components/FormInput.component";
import {
  IconAddFilled,
  IconReplyOutline,
  IconShareWindowsOutline,
  SearchFilled
} from "../../assets/icons/Fluent";
import ActivityTableComponent, {
  IFETableHeadingProps,
  IFETableRowColumnProps
} from "./ActivityTable.component";
import { dummyBorrowActivities } from "../../utils/const/dummy";
import {
  formatDateDetection,
  formatDateNormal
} from "../../utils/function/date.function";
import { useDebouncedValue } from "@mantine/hooks";
import { qfFetchAllLentActivity } from "../../utils/query/item-query";
import { useQuery } from "react-query";

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
}

function formatLentActivity(beData: any[] = []) {
  const formatted = beData?.map((d) => {
    const data: IBorrowActivity = {
      activityType: d?.status == "LENT" ? "borrow" : "return",
      borrowDate: new Date(d?.lendStartTime),
      additionalInformation: d?.description,
      supposedReturnDate: new Date(d?.lendEndTime),
      borrower: d?.student.name,
      nim: d?.student.studentId,
      itemImage: d?.item.itemThumbnail,
      itemName: d?.item.name,
      id: "",
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
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
    isRefetching
  } = useQuery(`fetch-all-lent`, qfFetchAllLentActivity, {
    onSuccess(data) {
      console.log(data, "dasdasdasd");
      setBorrowActivities(formatLentActivity(data?.data || []));
    }
  });

  console.log(data, "data");

  const amtDataPerPage = 5;
  const [activePage, setActivePage] = useState<number>(1);
  const theme = useMantineTheme();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query] = useDebouncedValue(searchTerm, 500);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const borrowActivities: Array<IBorrowActivity> = dummyBorrowActivities;
  const [borrowActivities, setBorrowActivities] = useState<
    Array<IBorrowActivity>
  >(formatLentActivity(data?.data || []));

  useEffect(() => {
    const lowerQuery = query?.toLowerCase();

    let tempActivity = dummyBorrowActivities?.filter(
      (d: IBorrowActivity) =>
        d?.itemName?.toLowerCase()?.includes(lowerQuery) ||
        d?.borrower?.toLowerCase()?.includes(lowerQuery)
    );

    if (selectedDate != null) {
      tempActivity = tempActivity?.filter(
        (d: IBorrowActivity) =>
          formatDateDetection(d?.borrowDate) ==
          formatDateDetection(selectedDate)
      );

      console.log(tempActivity, "tempActivity");
    }

    setBorrowActivities(tempActivity);
  }, [query, selectedDate]);

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

  const tableRows = borrowActivities?.map(
    (data, idx) =>
      ({
        id: {
          label: data.id
        },
        index: {
          label: idx + 1
        },
        item: {
          label: data.itemName,
          element: (
            <Stack className="gap-2">
              <Stack className="w-24 h-20 m-auto overflow-hidden rounded-2xl">
                <img src={data.itemImage} className="w-24 h-20 object-cover" />
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
              <Text className="font-poppins text-lg text-primary-text-500">
                {data.borrower}
              </Text>
              <Text className="font-poppins text-lg text-secondary-text-500">
                (H071191044)
              </Text>
            </Stack>
          )
        },
        activity: {
          label: data.activityType,
          element: (
            <div className="w-full">
              <Group
                className={`${
                  data.activityType == "borrow" ? "bg-red" : "bg-green"
                } self-center w-fit mx-auto py-[6px] px-4 rounded-full gap-2`}
              >
                {data.activityType == "borrow" ? (
                  <IconShareWindowsOutline
                    size={22}
                    color={theme.colors["white"][5]}
                  />
                ) : (
                  <IconReplyOutline
                    size={20}
                    color={theme.colors["white"][5]}
                  />
                )}
                <Text className="text-lg text-white">
                  {data.activityType == "borrow" ? "Meminjam" : "Mengembalikan"}
                </Text>
              </Group>
            </div>
          )
        },
        timeDetail: {
          label: data.itemName,
          element: (
            <Stack className="">
              <Group className="gap-2">
                <Text className="font-semibold text-primary-text">
                  Waktu Peminjaman
                </Text>
                <Text className="text-primary-text">
                  {formatDateNormal(data.borrowDate)}
                </Text>
              </Group>
              <Divider />
              <Group className="gap-2">
                <Text className="font-semibold text-primary-text">
                  Waktu Dikembalikan Barang
                </Text>
                <Text className="text-primary-text">
                  {formatDateNormal(data.supposedReturnDate || new Date())},{" "}
                </Text>
              </Group>
              {data.activityType == "return" && (
                <>
                  <Divider />
                  <Stack className="gap-0">
                    {/* <Group className="gap-2">
                      <Text className="font-semibold text-primary-text">
                        Waktu Pengembalian Seharusnya
                      </Text>
                      <Text className="text-primary-text">
                        {formatDateNormal(data.supposedReturnDate)},{" "}
                        {data.supposedReturnTime}:00
                      </Text>
                    </Group> */}
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
              )}
            </Stack>
          )
        },
        additionalInformation: {
          label: data.additionalInformation,
          element: (
            <Stack className="">
              <Text className="text-primary-text text-justify ">
                {/* <span className="font-semibold">Keterangan Tambahan</span>{" "} */}
                {data.additionalInformation}
              </Text>
            </Stack>
          )
        }
      } as IFETableRowColumnProps)
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
    setActivePage(1);
  }

  console.log(selectedDate, "selectedDate");

  return (
    <MainLayout activePage="Aktivitas">
      <Stack className="px-12 mt-6 gap-4">
        <Group className="my-4 justify-between">
          <Text className="font-poppins-semibold text-primary-text text-[30px] ml-1">
            Riwayat Peminjaman
          </Text>
          <Group className="gap-6">
            <MyDatePickerInput
              size="md"
              locale="id"
              defaultValue={selectedDate}
              valueFormat="DD MMM"
              value={selectedDate}
              onChange={setSelectedDate}
              clearable
            />

            <MySearchInput
              onChange={handleSearchChange}
              w={240}
              placeholder="Cari barang / nim . . ."
            />
          </Group>
        </Group>
        <Stack className="gap-0 rounded-t-3xl overflow-hidden">
          <Group className="justify-between backdrop-blur-3xl bg-red  py-4 px-8">
            <Group className="">
              <Text className="font-poppins-semibold text-2xl text-white">
                Daftar Aktivitas
              </Text>
            </Group>
          </Group>
          <ActivityTableComponent
            noDataMsg=""
            isLoading={false}
            dataPerPageAmt={amtDataPerPage}
            onSearch={(value) => {
              // console.log("Searching for: ", value);
            }}
            onPageChange={setActivePage}
            activePage={activePage}
            actions={[]}
            tableTitle="Deteksi Terbaru"
            tableRows={tableRows}
            tableHeadings={tableHeadings}
            withSearch={false}
            actionOrientation="vertical"
            onProgressData={0}
            showTableHeader
          />
        </Stack>
      </Stack>
    </MainLayout>
  );
};
export default Activity;
