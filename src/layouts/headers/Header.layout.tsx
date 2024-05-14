import { Grid, Group, Stack, Text } from "@mantine/core";
import unhasLogo from "../../assets/images/logo-unhas.png";
import React, { useContext, useEffect, useState } from "react";
import HeaderMenu from "./HeaderMenu.component";
import { MAINROUTES } from "../../utils/const/routes";
import { TPageName } from "../MainLayout.layout";
import { IconLoginOutline, IconLogoutOutline } from "../../assets/icons/Fluent";
import { qfLogin } from "../../utils/query/user-query";
import { useMutation } from "react-query";
import LoginModal from "./LoginModal.component";
import AlertModal from "../../components/AlertModal.component";
import WarningModal from "../../components/WarningModal.component";
import LoadingModal from "../../components/LoadingModal.component";
import ConfirmationModal from "../../components/ConfirmationModal.component";
import { AuthContext } from "../../context/AuthContext.context";

export interface IHeader {
  activePage: TPageName;
}

const Header: React.FC<IHeader> = ({ activePage }) => {
  const [loginModalOpened, setloginModalOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
      throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login : loginFunc, logout : logoutFunc, isLoggedIn } = authContext;
  
  const loginMutation = useMutation("post-login", loginFunc, {
    onSuccess() {
      setloginModalOpened(false);
    }
  });
  console.log(localStorage, "localStorage isLogin");

  console.log(isLoggedIn, 'isLoggedIn')

  function handleLogOut() {
    logoutFunc()
    setLogoutModalOpened(false)
  }
  return (
    <>
      <LoginModal
        opened={loginModalOpened}
        setOpened={setloginModalOpened}
        loginMutation={loginMutation}
      />
      <WarningModal
        opened={logoutModalOpened}
        setOpened={setLogoutModalOpened}
        title={"Log Out"}
        children={
          "Log Out dari admin. Sebagai user biasa anda tidak akan bisa melakukan peminjaman dan pengembalian"
        }
        onClose={() => {}}
        onSubmit={handleLogOut}
      />
      <LoadingModal opened={loginMutation?.isLoading} />
      {/* <ConfirmationModal opened={true} /> */}
      <Grid className="pb-2 pt-4 px-12 z-10 border-b border-secondary shadow-md">
        <Grid.Col span={4} className="">
          <Group className="gap-3">
            <div className="w-10">
              <img src={unhasLogo} alt="Logo Unhas" />
            </div>
            <Stack className="gap-0">
              <Text className="font-poppins-semibold text-lg text-start text-primary-text">
                Peminjaman Inventaris Departemen
              </Text>
              <Text className="text-start text-sm text-secondary-text -mt-1">
                Dep. Matematika, Fak. MIPA | Universitas Hasanuddin
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={4} className="self-center">
          <Group className="justify-center align-middle gap-4 -mb-2">
            <HeaderMenu
              href={MAINROUTES.home}
              label="Beranda"
              activePage={activePage}
            />
            <HeaderMenu
              href={MAINROUTES.activity}
              label="Aktivitas"
              activePage={activePage}
            />
            {/* <HeaderMenu href={MAINROUTES.activity} label="Aktivitas2" activePage={activePage} /> */}
          </Group>
        </Grid.Col>

        <Grid.Col span={4} className="self-center">
          {isLoggedIn ? (
            <Group
              className="justify-end gap-2 cursor-pointer"
              onClick={() => {
                setLogoutModalOpened(true);
              }}
            >
              <Text className="text-primary-text font-semibold">Log Out</Text>
              <IconLogoutOutline
                className="rounded-full p-[5px] bg-red"
                color="#FFFFFF"
                size={28}
              />
            </Group>
          ) : (
            <Group
              className="justify-end gap-2 cursor-pointer"
              onClick={() => {
                setloginModalOpened(true);
              }}
            >
              <Text className="text-primary-text font-semibold">Log In</Text>
              <IconLoginOutline
                className="rounded-full p-[5px] pr-2 bg-green"
                color="#FFFFFF"
                size={28}
              />
            </Group>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};
export default Header;
