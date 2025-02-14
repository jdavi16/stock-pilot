import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { IconX, IconCheck } from "@tabler/icons-react";
import { CustomTextField } from "../CustomComponents/CustomComponents";
import { CustomButton } from "../CustomComponents/CustomComponents";

export default function AddInventory({ toggleDrawer }) {
  /*const currency = [
    { value: "eur", label: "🇪🇺 EUR" },
    { value: "usd", label: "🇺🇸 USD" },
    { value: "cad", label: "🇨🇦 CAD" },
    { value: "gbp", label: "🇬🇧 GBP" },
    { value: "aud", label: "🇦🇺 AUD" },
  ];*/

  const categories = [
    { value: "Filament", label: "Filament" },
    { value: "Resin", label: "Resin" },
    { value: "Powder", label: "Powder" },
    { value: "Wire", label: "Wire" },
  ];

  const materialOptions = {
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

  const [selectedCategory, setSelectedCategory] = useState("Filament");
  const [materialType, setMaterialType] = useState(materialOptions["Filament"]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setMaterialType(materialOptions[category]);
  };

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
            <IconX onClick={toggleDrawer("right", false)} color='var(--text)' style={{ cursor: "pointer", marginRight: "10px" }} />
            <h2 style={{ color: "var(--text)" }}>Add Item</h2>
            <CustomButton variant='contained' startIcon={<IconCheck />} sx={{ marginLeft: "auto" }}>
              Confirm
            </CustomButton>
          </Box>
          <Divider sx={{ backgroundColor: "var(--borderColor)", width: "100%", marginTop: "10px" }} />
          <div className='form-section'>
            <h3>General Information</h3>
            <div className='drawer-row'>
              <label className='drawer-field'>
                <CustomTextField size='small' fullWidth id='outlined-basic' label='Item Name' />
              </label>
              <label className='drawer-field'>
                <CustomTextField size='small' fullWidth id='outlined-basic' label='Brand' />
              </label>
            </div>
            <div className='drawer-row'>
              <label className='drawer-field'>
                <select type='text' className='drawer-input' name='category' value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className='drawer-field'>
                <select type='text' className='drawer-input' name='materialtype'>
                  {materialType.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <Divider sx={{ backgroundColor: "var(--borderColor)", width: "100%", marginTop: "10px" }} />
          <div className='form-section'>
            <h3>Weight Information</h3>
            <div className='drawer-row'>
              <label className='drawer-field'>
                <CustomTextField size='small' fullWidth id='outlined-basic' label='Weight' />
              </label>
              <label className='drawer-field'>
                <CustomTextField size='small' fullWidth id='outlined-basic' label='Price' />
              </label>
            </div>
          </div>
        </Box>
      </React.Fragment>
    </div>
  );
}
