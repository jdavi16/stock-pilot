import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { IconDeviceIpadHorizontal, IconDashboard, IconBuildingWarehouse, IconSettings, IconLogout } from "@tabler/icons-react";

const mainListItems = [
  { text: "Dashboard", icon: <IconDashboard />, link: "/dashboard" },
  { text: "Inventory", icon: <IconBuildingWarehouse />, link: "/inventory" },
  { text: "Equipment", icon: <IconDeviceIpadHorizontal />, link: "/equipment" },
];

const secondaryListItems = [
  { text: "Settings", icon: <IconSettings />, link: "/" },
  { text: "Logout", icon: <IconLogout />, link: "/" },
];

export default function MenuContent() {
  const [active, setActive] = useState("Dashboard");

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block", color: "var(--icon-fill)" }}>
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.link}
              selected={item.text === active || ""}
              onClick={() => {
                setActive(item.text);
              }}
              sx={{
                mt: "10px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "var(--button)",
                },
                "&.Mui-selected": {
                  backgroundColor: "var(--button)",
                  "&:hover": {
                    backgroundColor: "var(--button)",
                  },
                },
              }}>
              <ListItemIcon sx={{ color: "var(--icon-fill)" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block", color: "var(--icon-fill)" }}>
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.link}
              selected={item.text === active || undefined}
              onClick={() => {
                setActive(item.text);
              }}
              sx={{
                mt: "10px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "var(--bg)",
                },
                "&.Mui-selected": {
                  backgroundColor: "var(--button)",
                  "&:hover": {
                    backgroundColor: "var(--button)",
                  },
                },
              }}>
              <ListItemIcon sx={{ color: "var(--icon-fill)" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
