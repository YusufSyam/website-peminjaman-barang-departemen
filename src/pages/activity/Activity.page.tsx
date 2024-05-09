import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import {
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import ActivityItem from "./ActivityItem.component";
import {
  MyDatePickerInput,
  MySearchInput,
  MyTextInput
} from "../../components/FormInput.component";
import { IconAddFilled, SearchFilled } from "../../assets/icons/Fluent";
import ActivityTableComponent, {
  IFETableHeadingProps,
  IFETableRowColumnProps
} from "./ActivityTable.component";
import { dummyBorrowActivities } from "../../utils/const/dummy";
import { formatDateNormal } from "../../utils/function/date.function";

export interface IActivity {}

export interface IBorrowActivity {
  id: number;
  itemName: string;
  itemImage: string;
  borrower: string;
  activityType: "borrow" | "return";
  borrowDate: Date;
  borrowTime: number;
  supposedReturnDate: Date;
  supposedReturnTime: number;
  actualReturnDate: Date;
  actualReturnTime: number;
  additionalInformation: string;
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
    cellKey: "item"
  },
  {
    label: "Peminjam",
    sortable: true,
    textAlign: "left",
    cellKey: "borrower"
  },
  {
    label: "Aktivitas",
    sortable: true,
    textAlign: "left",
    cellKey: "activity"
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
    textAlign: "left",
    cellKey: "additionalInformation"
  }
  // {
  //   label: "Aksi",
  //   sortable: true,
  //   textAlign: "center",
  //   cellKey: "action"
  // }
];

const Activity: React.FC<IActivity> = ({}) => {
  const amtDataPerPage = 5;
  const [activePage, setActivePage] = useState<number>(1);
  const theme = useMantineTheme();

  const borrowActivities: Array<IBorrowActivity> = dummyBorrowActivities;

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
            <Stack className="w-20 h-20 m-auto overflow-hidden rounded-full">
              <img src={data.itemImage} className="w-20 h-20 object-cover" />
            </Stack>
          )
        },
        borrower: {
          label: data.borrower,
          element: (
            <Text className="font-poppins text-lg text-primary-text-500">
              {data.borrower}
            </Text>
          )
        },
        activity: {
          label: data.activityType,
          element: (
            <Text className="font-poppins text-lg text-primary-text-500">
              {data.activityType}
            </Text>
          )
        },
        timeDetail: {
          label: data.borrowTime,
          element: (
            <Group className="">
              <Stack className="gap-2">
                {formatDateNormal(data.borrowDate)}
              </Stack>
            </Group>
          )
        },
        additionalInformation: {
          label: data.additionalInformation,
          element: <Text>{data.additionalInformation}</Text>
        }
      } as IFETableRowColumnProps)
  );

  return (
    <MainLayout activePage="Aktivitas">
      <Stack className="px-12 mt-6 gap-10">
        <Group className="justify-between">
          <Stack className="gap-0">
            <Text className="text-primary-text font-poppins-semibold text-[32px] text-start">
              Riwayat Peminjaman
            </Text>
            <Text className="text-secondary-text text-start -mt-1">
              Telusuri riwayat aktivitas peminjaman barang
            </Text>
          </Stack>
        </Group>
        <Stack className="gap-0 rounded-t-3xl overflow-hidden">
          <Group className="justify-between backdrop-blur-3xl bg-red  py-4 px-8 rounded-3-xl">
            <Group className="">
              <Text className="font-poppins-semibold text-2xl text-white">
                Daftar Detektor
              </Text>
            </Group>
            <Group className="gap-6">
              <MyDatePickerInput
                size="md"
                locale="id"
                defaultValue={new Date()}
                valueFormat="DD MMM"
                className="bg-secondary-500 rounded-full z-[1000]"
                
              />

              <MySearchInput
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  console.log(event.target.value)
                }
                w={240}
                placeholder="Cari barang / nim . . ."
              />
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
          />
        </Stack>
      </Stack>
    </MainLayout>
  );
};
export default Activity;
