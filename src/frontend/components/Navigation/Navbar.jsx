import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
//import OptionsMenu from "./OptionsMenu";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function Navbar() {
  const email = localStorage.getItem("email");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const capitalizeName = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Drawer variant='permanent' sx={{ borderRight: "1px solid", borderColor: "var(--button)", display: { xs: "none", md: "block" }, [`& .${drawerClasses.paper}`]: { backgroundColor: "var(--form)" } }}>
      <Box sx={{ display: "flex", mt: "40px", p: 1.5 }}></Box>
      <Divider sx={{ backgroundColor: "var(--button)", width: "100%" }} />
      <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <MenuContent />
      </Box>
      <Stack direction='row' sx={{ p: 2, gap: 1, alignItems: "center", borderTop: "1px solid", borderColor: "var(--button)" }}>
        <Avatar sizes='small' alt='Username' sx={{ width: 36, height: 36 }} />
        <Box sx={{ mr: "0" }}>
          <Typography variant='body2' sx={{ fontWeight: 500, lineHeight: "16px", color: "var(--text)" }}>
            {capitalizeName(firstName)} {capitalizeName(lastName)}
          </Typography>
          <Typography variant='caption' sx={{ color: "var(--text)" }}>
            {email}
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}
