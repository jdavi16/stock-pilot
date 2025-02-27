import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, CloseButton, Divider, Drawer, Grid, TextInput, NativeSelect, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import classes from "./Drawer.module.css";

interface FormValues {
  id?: string;
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
  item: FormValues | null;
}

const InventoryDrawer: React.FC<InventoryDrawerProps> = ({ opened, onClose, mode, item }) => {
  const initialFormValues: FormValues = {
    brand: "",
    color: "",
    category: "Filament", // Default category
    materialType: "",
    weight: "",
    price: "",
    weightUnit: "",
    currencyUnit: "",
    onHand: "",
    costPer: "",
    maxTemp: "",
    minTemp: "",
    maxBedTemp: "",
    minBedTemp: "",
  };

  const [formValue, setFormValues] = useState<FormValues>(initialFormValues);

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormValues(item);
    } else if (mode === "add") {
      setFormValues(initialFormValues);
    }
  }, [mode, item]);

  useEffect(() => {
    if (formValue.category === "") {
      setFormValues((prevValues) => ({
        ...prevValues,
        materialType: materialOptions.Filament[0].value,
      }));
    }
  }, [formValue.category]);

  const categories = [
    { value: "Filament", label: "Filament" },
    { value: "Resin", label: "Resin" },
    { value: "Powder", label: "Powder" },
    { value: "Wire", label: "Wire" },
  ];

  const materialOptions: { [key: string]: { value: string; label: string }[] } = {
    Filament: [
      { value: "ABS", label: "ABS" },
      { value: "CPE", label: "CPE" },
      { value: "HIPS", label: "HIPS" },
      { value: "Nylon", label: "Nylon" },
      { value: "PC", label: "PC" },
      { value: "PCTG", label: "PCTG" },
      { value: "PETG", label: "PETG" },
      { value: "PLA", label: "PLA" },
      { value: "PVA", label: "PVA" },
      { value: "TPU", label: "TPU" },
    ],
    Resin: [
      { value: "Standard", label: "Standard" },
      { value: "Tough", label: "Tough" },
      { value: "Flexible", label: "Flexible" },
    ],
    Powder: [
      { value: "Nylon", label: "Nylon" },
      { value: "Aluminum", label: "Aluminum" },
      { value: "Steel", label: "Steel" },
    ],
    Wire: [
      { value: "Copper", label: "Copper" },
      { value: "Aluminum", label: "Aluminum" },
      { value: "Steel", label: "Steel" },
    ],
  };

  const CurrencyData = [
    { value: "usd", label: "🇺🇸 USD" },
    { value: "cad", label: "🇨🇦 CAD" },
    { value: "eur", label: "🇪🇺 EUR" },
    { value: "gbp", label: "🇬🇧 GBP" },
    { value: "aud", label: "🇦🇺 AUD" },
  ];

  const WeightData = [
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValue, [name]: value });
    console.log("Form Values:", { ...formValue, [name]: value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setFormValues({ ...formValue, category: category, materialType: "" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (mode === "add") {
        await axios.post("http://localhost:5000/api/inventory", formValue);
      } else {
        await axios.put(`http://localhost:5000/api/inventory/${item?.id}`, formValue);
      }
      onClose();
    } catch (error) {
      console.error("There was an error adding the item:", error);
    }
  };

  const CurrencySelect = (
    <NativeSelect
      data={CurrencyData}
      rightSectionWidth={28}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: 92,
          border: "none",
          marginRight: "1px",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          borderLeft: "1px solid var(--borderColor)",
        },
      }}
      value={formValue.currencyUnit}
      onChange={handleInputChange}
      name='currencyUnit'
      defaultValue='usd'
    />
  );
  const WeightSelect = (
    <NativeSelect
      data={WeightData}
      rightSectionWidth={28}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: 92,
          border: "none",
          marginRight: "1px",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          borderLeft: "1px solid var(--borderColor)",
        },
      }}
      value={formValue.weightUnit}
      onChange={handleInputChange}
      name='weightUnit'
      defaultValue='g'
    />
  );

  return (
    <Drawer classNames={{ content: classes.drawer }} padding={10} withCloseButton={false} offset={8} radius='md' size='lg' opened={opened} onClose={onClose} position='right'>
      <Drawer.Header className={classes.drawerHeader}>
        <div className={classes.drawerHeaderContent}>
          <CloseButton className={classes.closeButton} onClick={onClose} />
          <Drawer.Title className={classes.drawerTitle} ml={10}>
            {mode === "add" ? "Add Inventory" : "Edit Inventory"}
          </Drawer.Title>
        </div>
        <Button rightSection={<IconCheck />} className={classes.confirmButton} color='var(--accent)' onClick={handleSubmit}>
          Confirm
        </Button>
      </Drawer.Header>
      <Divider color='var(--borderColor)' mt={20} />
      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <h3>General Information</h3>
          <Grid gutter='sm' className={classes.grid}>
            <Grid.Col className={classes.gridColumn} span={6}>
              <TextInput required classNames={{ input: classes.input }} size='md' label='Brand' name='brand' type='text' value={formValue.brand} onChange={handleInputChange} />
              <NativeSelect required size='md' label='Category' classNames={{ input: classes.input }} name='category' data={categories} value={formValue.category} onChange={handleCategoryChange} />
            </Grid.Col>
            <Grid.Col className={classes.gridColumn} span={6}>
              <TextInput required classNames={{ input: classes.input }} size='md' label='Color' name='color' value={formValue.color} onChange={handleInputChange} />
              <NativeSelect required size='md' label='Material Type' classNames={{ input: classes.input }} data={materialOptions[formValue.category]} name='materialType' value={formValue.materialType} onChange={handleInputChange} />
            </Grid.Col>
          </Grid>
        </div>
        <Divider color='var(--borderColor)' mt={20} />
        <h3>Weight Information</h3>
        <Grid gutter='xs'>
          <Grid.Col className={classes.gridColumn} span={6}>
            <TextInput classNames={{ input: classes.input }} type='number' label='Net Weight' rightSection={WeightSelect} rightSectionWidth={92} size='md' onChange={handleInputChange} value={formValue.weight} name='weight' />
          </Grid.Col>
          <Grid.Col className={classes.gridColumn} span={6}>
            <TextInput classNames={{ input: classes.input }} type='number' label='Price' rightSection={CurrencySelect} rightSectionWidth={92} size='md' onChange={handleInputChange} value={formValue.price} name='price' />
          </Grid.Col>
        </Grid>
      </form>
    </Drawer>
  );
};

export default InventoryDrawer;
