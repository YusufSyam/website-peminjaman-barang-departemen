import { Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { TPageName } from "../MainLayout.layout";

export interface IHeaderMenu {
  label: string;
  href: string;
  activePage: TPageName;
}

const HeaderMenu: React.FC<IHeaderMenu> = ({ href, label, activePage }) => {
  return (
    <Link className="cursor-pointer" to={href}>
      <Text
        className={`font-semibold tracking-3 ${
          activePage.toLowerCase() == label.toLowerCase()
            ? `bg-red text-white`
            : `bg-white text-primary-text`
        } rounded-full py-[6px] px-4`}
      >
        {label}
      </Text>
    </Link>
  );
};
export default HeaderMenu;
