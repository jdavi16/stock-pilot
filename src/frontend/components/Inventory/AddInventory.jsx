import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconX } from "@tabler/icons-react";
import { TextField } from "@mui/material";

export default function AddInventory() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const addForm = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 600,
        padding: "20px",
      }}
      role='presentation'>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textColor: "var(--text)" }}>
        <IconX onClick={toggleDrawer(anchor, false)} color='var(--text)' style={{ cursor: "pointer" }} />
        <Typography variant='h6' color='var(--text)'>
          Add Item
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "var(--button)", width: "100%", marginTop: "10px" }} />
      <div style={{ display: "flex", flexDirection: "column", mt: "10px", padding: "20px", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignContent: "center", width: "100%" }}>
          <label className='add-form-top'>
            <input type='text' className='input-field' name='itemName' placeholder='Item Name' />
          </label>
          <label className='add-form-top'>
            <input type='text' className='input-field' name='quantity' placeholder='Quantity on Hand' />
          </label>
        </div>
        <div className='drawer-btns'>
          <button type='submit'>Add</button>
          <button type='button' onClick={toggleDrawer(anchor, false)}>
            Cancel
          </button>
        </div>
      </div>
    </Box>
  );
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button onClick={toggleDrawer(anchor, true)}>Add Item</button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            ModalProps={{
              BackdropProps: {
                onClick: (event) => event.stopPropagation(),
              },
            }}
            sx={{ [`& .MuiDrawer-paper`]: { width: 600, backgroundColor: "var(--form)" } }}>
            {addForm(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
