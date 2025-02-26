import React, { useState } from "react";
import { Box, Divider, Group, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { UserButton } from "../UserButton/UserButton";

import { IconDeviceIpadHorizontal, IconDashboard, IconBuildingWarehouse, IconSettings, IconLogout } from "@tabler/icons-react";
import classes from "./Navbar.module.css";

const data = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  { label: "Inventory", icon: IconBuildingWarehouse, link: "/inventory" },
  { label: "Equipment", icon: IconDeviceIpadHorizontal, link: "/equipment" },
];

export default function Navbar() {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify='space-between'>
          <Title>Stock Pilot</Title>
        </Group>

        {links}
      </div>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
