import {
  Button,
  Group,
  MediaQuery,
  Pagination,
  Stack,
  Table,
  Text,
  useMantineTheme
} from "@mantine/core";
import React from "react";
import {
  IconAddFilled,
  IconCalendarEmptyOutline
} from "../../assets/icons/Fluent";
import Loading from "../../components/Loading.component";

export interface ILFPHeaderButton {
  label: string;
  // type?: "modal" | "href";
  // onClick?: () => void;
  // href?: string;
  type: "modal" | "href";
  onProgressData?: number;
  onClick?: () => void;
  href?: string;
  icon?: JSX.Element;
  disabled: boolean;
}

export type IFETableRowColumnProps = {
  [x in TableRowCellKey]:
    | {
        label: string | number;
        element?: JSX.Element;
      }
    | number
    | string;
};

export interface IFETableHeadingProps {
  label: string;
  sortable: boolean;
  cellKey: TableRowCellKey;
  width?: string;
  textAlign: "left" | "right" | "center";
  key?: string;
}

type TableRowCellKey = string;
interface IActivityTableComponentProps {
  tableTitle: string;
  tableHeadings: IActivityTableHeadingProps[];
  tableRows: IActivityTableRowColumnProps[];
  noDataMsg: string;
  dataPerPageAmt: number;
  isLoading: boolean;
  actions?: IActivityTableAction[];
  onSearch?: (value: string) => void;
  activePage: number;
  onPageChange?: (page: number) => void;
  actionOrientation?: "vertical" | "horizontal";
  actionColumnWidth?: string;
  actionColumnRounded?: boolean;
  onProgressData?: number;
  tableHeaderAction?: Array<ILFPHeaderButton>;
  withSearch?: boolean;
  onEachRowHovered?: (idx: number) => void;
  showTableHeader?: boolean;
}

export interface IActivityTableHeadingProps {
  label: string;
  sortable: boolean;
  cellKey: TableRowCellKey;
  width?: string;
  textAlign: "left" | "right" | "center";
  key?: string;
}

export type IActivityTableRowColumnProps = {
  [x in TableRowCellKey]:
    | {
        label: string | number;
        element?: JSX.Element;
        additionalClass?: string;
      }
    | number
    | string;
};

export interface IActiveSort {
  column: string;
  order: "ASC" | "DESC";
}

export type IActionButtonBgColor =
  | "red"
  | "green"
  | "white";

export interface IActivityTableAction {
  label: string;
  icon?: JSX.Element;
  type?: "button" | "element";
  backgroundColor: IActionButtonBgColor;
  onClick: (row: any) => void;
  padding?: string | number;
  width?: string | number;
  eachButtonRounded?: boolean;
  eachButtonFullRounded?: boolean;
  display?: (row: any) => boolean;
  element?: (row: any) => JSX.Element;
  isDisabled?: (row: any) => boolean;
}

// Add action color here
const aciontBtnClsNames: { [x in IActionButtonBgColor]: string } = {
  red: "!bg-red !bg-opacity-20 !text-red",
  green: "!bg-green !bg-opacity-20 text-green !disabled:bg-secondary !disabled:text-secondary-text",
  white: "!bg-white"
};

const ActivityTableComponent: React.FC<IActivityTableComponentProps> = ({
  tableTitle,
  tableHeadings,
  tableRows,
  actions,
  noDataMsg,
  isLoading,
  onSearch,
  dataPerPageAmt,
  activePage,
  onPageChange,
  actionOrientation = "horizontal",
  actionColumnWidth = "fit-content",
  actionColumnRounded = true,
  onProgressData = 0,
  tableHeaderAction,
  withSearch = true,
  onEachRowHovered,
  showTableHeader = false
}) => {
  const headKeys = tableHeadings.map((th) => ({
    key: th.cellKey,
    textAlign: th.textAlign
  }));

  const pageAmt = Math.round(tableRows?.length / dataPerPageAmt + 0.4);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch && onSearch(e.target.value);
  }

  function handlePageChange(e: number) {
    onPageChange && onPageChange(e);
  }

  const theme = useMantineTheme();

  const addIcon = <IconAddFilled className={`mr-1 mb-[1px]`} size={14} />;

  const paginationComp = (
    <>
      <Text className="font-poppins-semibold text-sm text-white" size={16}>
        Halaman {activePage >= pageAmt ? pageAmt : activePage} dari {pageAmt}
      </Text>
        <Pagination
          color={"dark-red"}
          onChange={handlePageChange}
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
    </>
  );

  const isEmpty = !tableRows?.length;

  return (
    <div className={`h-fit`}>
      {" "}
      <div className="grow basis-0 block overflow-x-auto whitespace-nowrap rounded-b-3xl border-2 border-secondary">
        <Table className={`w-full rounded-3xl`} verticalSpacing={"md"}>
          {showTableHeader && (
            <thead className="relative border-b-2 border-secondary">
              <tr className="">
                {tableHeadings.map((head, index) => {
                  return (
                    <th
                      style={{
                        textAlign: head.textAlign,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        background: "rgba(255,255,255,0.8)",
                        width: head.width,
                        cursor: head.sortable ? "pointer" : "default"
                      }}
                      key={index}
                    >
                      <Group
                        spacing={"sm"}
                        align={"center"}
                        noWrap
                        position={head.textAlign}
                        className=""
                      >
                        <Text className="text-primary-text-500 !font-poppins-light text-[14px]">
                          {head.label}
                        </Text>
                      </Group>
                    </th>
                  );
                })}
                {!!actions?.length && (
                  <th
                    style={{
                      textAlign: "center",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "rgba(255,255,255,0.8)",
                      cursor: "default",
                      whiteSpace: "normal",
                      width: actionColumnWidth || "fit-content"
                    }}
                  >
                    <Group
                      spacing={"sm"}
                      align={"center"}
                      noWrap
                      position={"center"}
                    >
                      <Text className="text-primary-text-500 font-semibold text-[14px]">
                        Aksi
                      </Text>
                    </Group>
                  </th>
                )}
              </tr>
            </thead>
          )}
          <tbody>
            {isEmpty || isLoading ? (
              <tr className="h-full self-center w-full bg-white/80">
                {isEmpty ? (
                  <td colSpan={8}>
                    <IconCalendarEmptyOutline
                      className="w-full"
                      color={theme.colors["primary-text"][5]}
                      size={235}
                    />
                    <Text
                      align="center"
                      className="text-2xl text-primary-text-500 font-poppins"
                    >
                      Data tidak ditemukan
                    </Text>
                    <Text
                      align="center"
                      className="text-secondary-text-500 text-[14px] font-poppins"
                    >
                      {noDataMsg || "Masukkan Kata Kunci yang Lain"}
                    </Text>
                  </td>
                ) : (
                  <td colSpan={8}>
                    <Stack className="pt-16 pb-10">
                      <div className={`mb-2`}>
                        <Loading />
                      </div>
                      <Text className="text-center text-secondary-text-500 font-semibold">
                        Mengambil Data...
                      </Text>
                    </Stack>
                  </td>
                )}
              </tr>
            ) : (
              tableRows
                .slice(
                  (activePage - 1) * dataPerPageAmt,
                  (activePage - 1) * dataPerPageAmt + dataPerPageAmt
                )
                .map((row: IActivityTableRowColumnProps, idx: number) => {
                  return (
                    <tr
                      key={idx + "row-"}
                      onMouseEnter={() => {
                        if (onEachRowHovered) {
                          onEachRowHovered(idx);
                        }
                      }}
                      className={`bg-white/80`}
                    >
                      {headKeys.map((th, e) => {
                        const col = row[th.key];

                        if (
                          typeof col === "string" ||
                          typeof col === "number"
                        ) {
                          return (
                            <td
                              key={th.key + e + col}
                              className="border-b-2 border-secondary"
                            >
                              <Text className="text-[14px] font-poppins">
                                {col}
                              </Text>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={col.label + "td-key" + e}
                            className={`text-primary-text-500  text-${
                              th.textAlign
                            } fe-table-td ${col?.additionalClass || ""}`}
                          >
                            {col.element != null ? (
                              <Text className="text-[14px]">{col.element}</Text>
                            ) : (
                              <Text className="text-[14px] font-poppins">
                                {col.label}
                              </Text>
                            )}
                          </td>
                        );
                      })}
                      {!!actions?.length && (
                        <td className="text-center">
                          <div
                            className={`flex justify-center items-center gap-1 ${
                              actionOrientation === "vertical"
                                ? "flex-col gap-2"
                                : "flex-row"
                            } overflow-hidden ${
                              actionColumnRounded == true ? "rounded-full" : ""
                            } `}
                          >
                            {/* <Stack align={"center"} spacing={5}> */}
                            {actions.map((action, e) => {
                              return (
                                <React.Fragment
                                  key={action.label + "action" + e}
                                >
                                  {action.type == "element" ? (
                                    <>{action.element!(row)}</>
                                  ) : (
                                    <Button
                                      hidden={
                                        action.display == null
                                          ? false
                                          : action.display(row)
                                      }
                                      disabled={
                                        action.isDisabled &&
                                        action.isDisabled(row)
                                      }
                                      key={action.label + "row-action" + e}
                                      onClick={() => action.onClick(row)}
                                      size="sm"
                                      className={`
                                          ${
                                            aciontBtnClsNames[
                                              action.backgroundColor
                                            ]
                                          } py-1 
                                          
                                          rounded-full

                                          ${
                                            action.isDisabled &&
                                            action.isDisabled(row) &&
                                            "!bg-secondary-text !cursor-not-allowed !bg-opacity-100 !text-secondary-text-500"
                                          }
                                          `}
                                      styles={{
                                        root: {
                                          padding: action.padding || 10,
                                          width: action.width || "70%"
                                        }
                                      }}
                                    >
                                      <Group align={"center"} spacing={8}>
                                        <Text className="font-poppins-medium">
                                          {action.label}
                                        </Text>
                                        {action.icon}
                                      </Group>
                                    </Button>
                                  )}
                                </React.Fragment>
                              );
                            })}
                            {/* </Stack> */}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
            )}
          </tbody>
        </Table>
      </div>
      <footer className="mt-5">
        <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
          <Group position="apart">{paginationComp}</Group>
        </MediaQuery>
        <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
          <Stack align={"center"}>{paginationComp}</Stack>
        </MediaQuery>
      </footer>
    </div>
  );
};
export default ActivityTableComponent;
