import React from "react";
import AddInventory from "./AddInventory";

const Inventory = () => {
  return (
    <div className='inventory-container'>
      <div className='inventory-header'>
        <h1>Inventory</h1>
        <AddInventory />
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
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
