import React from "react";
import AddInventory from "./AddInventory";
import Drawer from "@mui/material/Drawer";
import { CustomButton } from "../CustomComponents/CustomComponents";
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react";

const Inventory = () => {
  const [state, setState] = React.useState({
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
      <div className='inventory-header'>
        <h1>Inventory</h1>
        <CustomButton variant='contained' startIcon={<IconPlus />} onClick={toggleDrawer("right", true)}>
          Add Item
        </CustomButton>
      </div>
      <div className='inventory-search'>
        <input type='text' placeholder='Search inventory' />
        <div className='inventory-filters'>
          <button>Filter 1</button>
          <button>Filter 2</button>
        </div>
      </div>
      <div className='inventory-table'>
        <div className='inventory-item'>
          <h3>Item 1</h3>
          <p>Item description</p>
          <div className='button-group'>
            <CustomButton variant='contained' onClick={toggleDrawer("right", true)}>
              {<IconPencil />}
            </CustomButton>
            <CustomButton variant='contained' sx={{ marginLeft: "5px" }}>
              {<IconTrash />}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
