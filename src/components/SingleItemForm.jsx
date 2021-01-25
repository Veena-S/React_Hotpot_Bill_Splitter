import React, { useState } from 'react';

export default function SingleItemForm({
  billData, setNewItem, addPerson,
}) {
  const [personName, setPersonName] = useState('');
  const [personNameList, setPersonNameList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [priceValue, setPriceValue] = useState(0.0);

  function handlePersonNameChange(event) {
    setPersonName(event.target.value);
  }

  function handleSubmitPersonName() {
    setPersonNameList([...personNameList, personName]);
    addPerson(personName);
  }

  function handleItemNameChange(event) {
    setItemName(event.target.value);
  }

  function handleSubmitItem(event) {
    setNewItem({ name: itemName, price: priceValue });
  }

  function handlePriceValueChange(event) {
    setPriceValue(event.target.value);
  }

  return (
    <div className="container">

      <div className="row">
        <fieldset className="border mt-4">
          <legend>Items included in the bill:</legend>
          <label htmlFor="item-name">Name: </label>
          <input type="text" id="item-name" placeholder="Item Name" value={itemName} onChange={handleItemNameChange} />
          <label htmlFor="item-price">Price: </label>
          <input type="number" id="item-price" step="0.01" min="0" placeholder="Price" value={priceValue} onChange={handlePriceValueChange} />
          <button type="button" onClick={handleSubmitItem}>Submit Item</button>
        </fieldset>
      </div>

      <div className="row">
        <fieldset className="border mt-4">
          <legend>Persons sharing the bill:</legend>
          <label htmlFor="persons-name">Name: </label>
          <input type="text" placeholder="Person's Name" id="persons-name" value={personName} onChange={handlePersonNameChange} />
          <button type="button" onClick={handleSubmitPersonName}>Add Name</button>
        </fieldset>
      </div>

    </div>
  );
}
