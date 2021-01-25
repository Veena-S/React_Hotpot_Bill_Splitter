import React, { useState } from 'react';

export default function ItemToPersonForm({
  itemsList, peopleList, mapPersonToItem,
}) {
  const [selectedItem, setSelectedItem] = useState({ name: '', price: 0 });
  const [selectedPeopleNames, setSelectedPeopleNames] = useState([]);

  function handleSelectItem(event) {
    console.log(event.target.value);
    console.log(JSON.parse(event.target.value));
    setSelectedItem(JSON.parse(event.target.value));
    // setSelectedItem({ name: event.target.value, price: 0 });
  }

  function handleSelectPeopleNames(event) {
    console.log(event.target.selectedOptions);
    // Convert the list of selected names into an array and set the state
    const selectedPeople = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedPeopleNames([...selectedPeople]);
  }

  function handleMapPeopleToItem() {
    selectedPeopleNames.forEach((person, index) => {
      mapPersonToItem(person, selectedItem.name, selectedItem.price);
    });
  }

  return (
    <div className="container mt-4">
      {(itemsList.length > 1) && (
        <div>
          <label htmlFor="items-select">Items: </label>
          <select
            id="items-select"
            className="custom-select items-select-list"
            value={JSON.stringify(selectedItem)}
            onChange={handleSelectItem}
          >
            {itemsList.map((item, index) => (
              // <option value='{"mbid":123,"artist":"Judas Priest"}'>Apple</option>
              <option key={`option-${Number(index).toString()}`} value={JSON.stringify(item)}>{item.name}</option>
            )) }
          </select>
        </div>
      )}

      {(selectedItem.name !== '') && `Select consumers for item: ${selectedItem.name}. Price: ${selectedItem.price}`}

      {/* // This is for dynamically adding persons to an item */}
      {(selectedItem.name !== '') && (
        <div>
          <label htmlFor="add-people">Items: </label>
          <select id="add-people" className="custom-select items-select-list" size="3" multiple value={selectedPeopleNames} onChange={handleSelectPeopleNames}>
            {peopleList.map((person, index) => (
              <option key={`person-${Number(index).toString()}`} value={person}>{person}</option>
            ))}
          </select>
          <button type="button" onClick={handleMapPeopleToItem}>Add People</button>
        </div>
      ) }

    </div>
  );
}
