import React from "react";
import { Button, CloseButton, Divider, Drawer } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./Drawer.module.css";
import AddInventory from "./AddInventory";

interface InventoryData {
  brand: string;
  color: string;
  category: string;
  materialType: string;
  weight: string;
  price: string;
  weightUnit: string;
  currencyUnit: string;
  onHand: string;
  costPer: string;
  maxTemp: string;
  minTemp: string;
  maxBedTemp: string;
  minBedTemp: string;
}

interface InventoryDrawerProps {
  opened: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  item: InventoryData | null;
}

const InventoryDrawer: React.FC<InventoryDrawerProps> = ({ opened, onClose, mode, item }) => {
  return (
    <Drawer classNames={{ content: classes.drawer }} padding={10} withCloseButton={false} offset={8} radius='md' size='lg' opened={opened} onClose={onClose} position='right'>
      <Drawer.Header className={classes.drawerHeader}>
        <div className={classes.drawerHeaderContent}>
          <CloseButton className={classes.closeButton} onClick={onClose} />
          <Drawer.Title className={classes.drawerTitle} ml={10}>
            {mode === "add" ? "Add Inventory" : "Edit Inventory"}
          </Drawer.Title>
        </div>
        <Button rightSection={<IconCheck />} className={classes.confirmButton} color='var(--accent)'>
          Confirm
        </Button>
      </Drawer.Header>
      <Divider color='var(--borderColor)' mt={20} />
      <AddInventory mode={mode} onClose={onClose} item={item} />
    </Drawer>
  );
};

export default InventoryDrawer;
