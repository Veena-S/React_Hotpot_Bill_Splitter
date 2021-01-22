import React, { useState } from 'react';
import axios from 'axios';

export default function CreateBillForm() {
  const [billName, setBillName] = useState('');

  function handleBillNameChange(event) {
    setBillName(event.target.value);
  }

  function handleSubmitBillName() {
    axios.post('/createBill', { name: billName })
      .then((responseData) => {
        console.log(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setBillName('');
  }

  return (
    <div className="container">
      <input type="text" placeholder="Bill Name" value={billName} onChange={handleBillNameChange} />
      <button type="button" onClick={handleSubmitBillName}>Submit</button>
    </div>
  );
}
