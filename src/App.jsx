import React, { useState } from 'react';
import axios from 'axios';
import CreateBillForm from './components/CreateBillForm.jsx';
import SingleItemForm from './components/SingleItemForm.jsx';
import ItemToPersonForm from './components/ItemToPersonForm.jsx';
import AmountPerPerson from './components/AmountPerPersonList.jsx';

export default function App() {
  const [newBillData, setNewBillData] = useState(null);
  const [itemsInBill, setItemsList] = useState(['']);
  const [peopleList, setPeopleList] = useState(['']);
  const [personItemMap, setPersonItemMap] = useState(null);
  const [itemPeopleMap, setItemPeopleMap] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  function sendNewBillData(billData) {
    setNewBillData(billData);
  }

  function setNewItem(newItem) {
    setItemsList([...itemsInBill, newItem]);
  }

  function addPerson(personName) {
    setPeopleList([...peopleList, personName]);
    if (!personItemMap) {
      const tempMap = {};
      tempMap[personName] = [];
      setPersonItemMap(tempMap);
    }
    else {
      console.log(personItemMap);
      if (!personItemMap.hasOwnProperty(personName))
      {
        const tempMap = { personName: [], ...personItemMap };
        setPersonItemMap(tempMap);
      }
    }
  }

  function mapItemToPerson(personName, itemName, priceValue) {
    setTotalValue(totalValue + priceValue);
    if (!itemPeopleMap)
    {
      const tempMap = {};
      tempMap[itemName] = [personName];
      setItemPeopleMap(tempMap);
    }
    else {
      const tempMap = itemPeopleMap;
      if (!tempMap.has(itemName)) {
        tempMap[itemName] = [personName];
      }
      else {
        tempMap[itemName].push(personName);
      }
      setItemPeopleMap(tempMap);
    }
  }

  function mapPersonToItem(personName, itemName, priceValue) {
    mapItemToPerson(personName, itemName, priceValue);
    if (!personItemMap)
    {
      const tempMap = {};
      tempMap[personName] = [{ name: itemName, price: priceValue }];
      setPersonItemMap(tempMap);
    }
    else {
      const tempMap = personItemMap;
      console.log(tempMap);
      console.log(personItemMap);
      if (!tempMap.has(personName)) {
        tempMap[personName] = [{ name: itemName, price: priceValue }];
      }
      else {
        tempMap[personName].push({ name: itemName, price: priceValue });
      }
      setPersonItemMap(tempMap);
    }
  }

  function saveTotalValue() {
    axios.post('/setTotal', { id: newBillData.id, total: totalValue })
      .then((respData) => { console.log(respData.data); })
      .catch((err) => console.log(err));
  }

  function handleSaveBill() {
    saveTotalValue();

    axios.post('/addPerson', {
      billId: newBillData.id, peopleList, personItemMap,
    })
      .then((responseData) => {
        console.log(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {!newBillData
      && <CreateBillForm sendNewBillData={sendNewBillData} />}
      { newBillData && (
      <SingleItemForm
        billData={newBillData}
        setNewItem={setNewItem}
        addPerson={addPerson}
      />
      )}
      {itemsInBill.length !== 0 && peopleList.length !== 0
      && (
      <ItemToPersonForm
        itemsList={itemsInBill}
        peopleList={peopleList}
        mapPersonToItem={mapPersonToItem}
      />
      )}
      {totalValue !== 0 && (
        <h4>
          Total:
          {totalValue}
        </h4>
      )}
      {itemsInBill.length !== 0 && peopleList.length !== 0 && itemPeopleMap && personItemMap && (
      <AmountPerPerson
        itemsList={itemsInBill}
        peopleList={peopleList}
        itemPeopleMap={itemPeopleMap}
        personItemMap={personItemMap}
      />
      )}
      {itemsInBill.length !== 0 && peopleList.length !== 0
      && (<button type="button" onClick={handleSaveBill}>Save Bill</button>)}
    </div>
  );
}
