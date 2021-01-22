import React, { useState } from 'react';

export default function BillDetailForm() {
  const [itemName, setItemName] = useState('');
  const [priceValue, setPriceValue] = useState(0.0);

  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }

  function handlePriceValueChange(event) {
    setPriceValue(event.target.value);
  }

  return (
    <div>
      <input type="text" placeholder="Item Name" value={itemName} onChange={handleItemNameChange} />
      <input type="text" placeholder="Price" value={priceValue} onChange={handlePriceValueChange} />

    </div>
  );
}
