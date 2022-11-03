import React, { useState } from "react";

import { HiOutlineLocationMarker, HiOutlineCog } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { useSession } from "../../hooks/useSession";

import { UserMenuBody } from "./UserMenuBody/UserMenuBody";
import { UserMenuButton } from "./UserMenuButton";
import { UserMenuIcon } from "./UserMenuIcon";

export const UserMenu = () => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { signOut, data } = useSession();

  return (
    <>
      <UserMenuIcon
        opened={opened}
        onClick={() => {
          setOpened(!opened);
          setClicked(true);
        }}
      />
      <UserMenuBody opened={opened} clicked={clicked}>
        <UserMenuButton Icon={RiUserLine} top>
          {data?.name === "" ? data.email.split("@")[0] : data?.name}
        </UserMenuButton>
        <UserMenuButton Icon={HiOutlineLocationMarker}>
          My places
        </UserMenuButton>
        <UserMenuButton Icon={HiOutlineCog}>Settings</UserMenuButton>
        <UserMenuButton onClick={signOut} Icon={VscSignOut} bottom>
          Sign Out
        </UserMenuButton>
      </UserMenuBody>
    </>
  );
};
