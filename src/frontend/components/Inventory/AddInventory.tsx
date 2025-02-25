import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { IconCheck } from "@tabler/icons-react";
import { Button, CloseButton, Grid, TextInput, NativeSelect } from "@mantine/core";
import classes from "./inventory.module.css";
import axios from "axios";

interface AddInventoryProps {
  toggleDrawer: (anchor: "right", open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface FormValues {
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

interface FocusedFields {
  brand: boolean;
  color: boolean;
  price: boolean;
  weight: boolean;
}

const AddInventory: React.FC<AddInventoryProps> = ({ toggleDrawer }) => {
  const [formValue, setFormValues] = useState<FormValues>({
    brand: "",
    color: "",
    category: "",
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
  });

  const [focusedFields, setFocusedFields] = useState<FocusedFields>({
    brand: false,
    color: false,
    price: false,
    weight: false,
  });

  const handleFocus = (field: keyof FocusedFields) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (field: keyof FocusedFields) => {
    setFocusedFields({ ...focusedFields, [field]: false });
  };

  const floating = (field: keyof FormValues) => focusedFields[field as keyof FocusedFields] || (formValue[field] && formValue[field].length > 0) || undefined;

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

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/inventory", formValue)
      .then((response) => {
        setFormValues({
          brand: "",
          color: "",
          category: "",
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
        });
        console.log("response:", response);
      })
      .catch((error) => {
        console.error("There was an error adding the inventory item!", error);
      });
    toggleDrawer("right", false);
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
          backgroundColor: "var(--form)",
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
          backgroundColor: "var(--form)",
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
    <div>
      <React.Fragment>
        <Box
          sx={{
            width: 600,
            padding: "20px",
          }}
          role='presentation'>
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", textColor: "var(--text)" }}>
            <CloseButton size='xl' variant='transparent' onClick={toggleDrawer("right", false)} color='var(--text)' style={{ cursor: "pointer", marginRight: "10px" }} />
            <h2 style={{ color: "var(--text)" }}>Add Item</h2>
            <Button autoContrast variant='filled' color='var(--accent)' size='md' radius='md' leftSection={<IconCheck />} style={{ marginLeft: "auto" }} type='submit' onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
          <Divider sx={{ backgroundColor: "var(--borderColor)", width: "100%", marginTop: "10px" }} />
          <div className='form-section'>
            <h3>General Information</h3>
            <Grid gutter='lg'>
              <Grid.Col span={6}>
                <TextInput
                  classNames={{
                    root: classes.root,
                    input: classes.input,
                    label: classes.label,
                  }}
                  label='Brand'
                  size='md'
                  name='brand'
                  type='text'
                  labelProps={{ "data-floating": floating("brand") }}
                  value={formValue.brand}
                  onFocus={() => handleFocus("brand")}
                  onBlur={() => handleBlur("brand")}
                  onChange={handleInputChange}
                />
                <NativeSelect size='md' classNames={{ root: classes.root, input: classes.select }} name='category' data={categories} value={formValue.category} onChange={handleCategoryChange} />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput classNames={{ root: classes.root, input: classes.input, label: classes.label }} label='Color' labelProps={{ "data-floating": floating("color") }} size='md' name='color' value={formValue.color} onFocus={() => handleFocus("color")} onBlur={() => handleBlur("color")} onChange={handleInputChange} />
                <NativeSelect size='md' classNames={{ root: classes.root, input: classes.select }} data={materialOptions[formValue.category]} name='materialType' value={formValue.materialType} onChange={handleInputChange} />
              </Grid.Col>
            </Grid>
          </div>
          <Divider sx={{ backgroundColor: "var(--borderColor)", width: "100%", marginTop: "10px" }} />
          <div className='form-section'>
            <h3>Weight Information</h3>
            <Grid gutter='xs'>
              <Grid.Col span={6}>
                <TextInput
                  classNames={{
                    input: classes.input,
                    root: classes.root,
                    label: classes.label,
                  }}
                  labelProps={{ "data-floating": floating("weight") }}
                  type='number'
                  label='Net Weight'
                  rightSection={WeightSelect}
                  rightSectionWidth={92}
                  size='md'
                  onFocus={() => handleFocus("weight")}
                  onBlur={() => handleBlur("weight")}
                  onChange={handleInputChange}
                  value={formValue.weight}
                  name='weight'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  classNames={{
                    input: classes.input,
                    root: classes.root,
                    label: classes.label,
                  }}
                  labelProps={{ "data-floating": floating("price") }}
                  type='number'
                  label='Price'
                  rightSection={CurrencySelect}
                  rightSectionWidth={92}
                  size='md'
                  onFocus={() => handleFocus("price")}
                  onBlur={() => handleBlur("price")}
                  onChange={handleInputChange}
                  value={formValue.price}
                  name='price'
                />
              </Grid.Col>
            </Grid>
          </div>
        </Box>
      </React.Fragment>
    </div>
  );
};

export default AddInventory;
