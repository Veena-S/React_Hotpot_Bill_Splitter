import React, { useState } from 'react';

export default function AmountPerPerson({
  itemsList, peopleList, itemPeopleMap, personItemMap,
}) {
  function totalAmountPerPerson(personName) {
    let totalAmount = 0;
    personItemMap[personName].forEach((item) => {
      totalAmount += item.price;
    });
    return totalAmount;
  }

  return (
    <div className="container">
      <h4>Amount per Person</h4>
      <div>
        {peopleList.map((person, index) => (
          <div className="row">
            <div className="col">{person}</div>
            <div className="col">{totalAmountPerPerson(person)}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
