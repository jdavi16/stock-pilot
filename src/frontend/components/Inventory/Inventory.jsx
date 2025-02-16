import React, { useState } from "react";
import AddInventory from "./AddInventory";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import { CustomTextField } from "../CustomComponents/CustomComponents";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { InventoryTable } from "./InventoryTable";

const Inventory = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className='inventory-container'>
      <Drawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer("right", false)}
        ModalProps={{
          BackdropProps: {
            onClick: (event) => event.stopPropagation(),
          },
        }}
        sx={{ [`& .MuiDrawer-paper`]: { width: 600, backgroundColor: "var(--form)", borderLeft: "1px solid", borderColor: "var(--borderColor)" } }}>
        <AddInventory toggleDrawer={toggleDrawer} />
      </Drawer>
      <div className='inventory-header-container'>
        <div className='inventory-header-left'>
          <h1>Inventory</h1>
          <Button variant='filled' leftSection={<IconPlus />} color='var(--accent)' onClick={toggleDrawer("right", true)}>
            Add Item
          </Button>
        </div>
        <div className='inventory-search-container'>
          <CustomTextField
            type='text'
            placeholder='Search Inventory'
            sx={{ width: "300px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end' sx={{ color: "var(--text)" }}>
                    <IconSearch />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </div>
      <div className='inventory-filters'>
        <Button variant='filled' color='var(--accent)'>
          Filter 1
        </Button>
        <Button variant='filled' color='var(--accent)'>
          Filter 2
        </Button>
      </div>
      <div className='inventory-table'>
        <div className='inventory-item'>
          <InventoryTable />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
