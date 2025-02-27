import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { InventoryTable } from "./InventoryTable";
import InventoryDrawer from "./InventoryDrawer";

interface InventoryItem {
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

const Inventory: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

  const handleAddClick = () => {
    setDrawerMode("add");
    setCurrentItem(null);
    open();
  };

  const handleEditClick = (item: InventoryItem) => {
    setDrawerMode("edit");
    setCurrentItem(item);
    open();
  };

  return (
    <div className='inventory-container'>
      <InventoryDrawer opened={opened} onClose={close} mode={drawerMode} item={currentItem} />
      <div className='inventory-header-container'>
        <div className='inventory-header-left'>
          <h1>Inventory</h1>
          <Button variant='filled' leftSection={<IconPlus />} color='var(--accent)' onClick={handleAddClick}>
            Add Item
          </Button>
        </div>
      </div>
      <div className='inventory-table'>
        <div className='inventory-item'>
          <InventoryTable onEditClick={handleEditClick} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
