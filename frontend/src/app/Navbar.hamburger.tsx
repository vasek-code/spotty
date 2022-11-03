import React, { useState } from "react";

import { GrMap } from "react-icons/gr";
import { BiHome } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiUserStarLine } from "react-icons/ri";

import { HamburgerMenuBody } from "../components/HamburgerMenu/HamburgerMenuBody/HamburgerMenuBody";
import { HamburgerMenuButton } from "../components/HamburgerMenu/HamburgerMenuButton/HamburgerMenuButton";
import { HamburgerMenuIcon } from "../components/HamburgerMenu/HamburgerMenuIcon/HamburgerMenuIcon";

export const HamburgerMenu = () => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <HamburgerMenuIcon
        onClick={() => {
          setOpened(!opened);
          setClicked(true);
        }}
        clicked={clicked}
        opened={opened}
      />
      <HamburgerMenuBody
        opened={opened}
        clicked={clicked}
        setOpened={setOpened}
      >
        <HamburgerMenuButton Icon={BiHome} link="/">
          Home
        </HamburgerMenuButton>
        <HamburgerMenuButton Icon={GrMap} link="/map">
          Map
        </HamburgerMenuButton>
        <HamburgerMenuButton Icon={HiOutlineLocationMarker} link="/map">
          Places
        </HamburgerMenuButton>
        <HamburgerMenuButton Icon={RiUserStarLine} link="/map/best-finders">
          Best finders
        </HamburgerMenuButton>
      </HamburgerMenuBody>
    </>
  );
};
