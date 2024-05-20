import React from "react";
import MainLayout from "../../layouts/MainLayout.layout";
import { Button, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconCloseOutline } from "../../assets/icons/Fluent";
import { useNavigate } from "react-router-dom";
import { MAINROUTES } from "../../utils/const/routes";

export interface INotFound {}
export interface INotFoundComponent {}

export const NotFoundComponent: React.FC<INotFoundComponent> = ({}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <>
      <IconCloseOutline
        color={theme.colors["white"][5]}
        size={120}
        className="p-6 bg-red rounded-full"
      />
      <Stack className="gap-0">
        <Text className="text-primary-text-500 text-3xl font-poppins-semibold">
          Halaman tidak ditemukan
        </Text>
        <Text className="text-secondary-text-500">
          Terjadi kesalahan pada penulisan url atau anda mengakses halaman yang
          ter-autorisasi (memerlukan log-in)
        </Text>
      </Stack>
      <Button
        size="md"
        className="rounded-full bg-red hover:bg-light-red duration-200 w-fit"
        onClick={() => {
          navigate(MAINROUTES.home);
        }}
      >
        Kembali ke Beranda
      </Button>
    </>
  );
};

const NotFound: React.FC<INotFound> = ({}) => {
  return (
    <MainLayout activePage="">
      <Stack className="px-12 mt-20 gap-4 items-center">
        <NotFoundComponent />
      </Stack>
    </MainLayout>
  );
};
export default NotFound;
