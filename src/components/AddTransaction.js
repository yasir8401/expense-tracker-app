import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(false);

  const onSubmit = (e, transactionType) => {
    console.log(amount === 0);
    if (text === "" || amount === 0 || amount === "") {
      return alert("Please input both Transaction Name & Transaction Amount");
    }

    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount:
        transactionType === "Income" ? parseInt(amount) : 0 - parseInt(amount),
    };

    addTransaction(newTransaction);

    setText("");
    setAmount(0);
    setShow(true);

    alert("Your transaction has been added successfully!!!");
  };

  return (
    <React.Fragment>
      <h3>Add new transaction</h3>
      <form>
        <div className="form-control">
          <label htmlFor="text">Transaction Name</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Transaction Name..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Transaction Amount <br />
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <div>
          <button
            className="btn"
            onClick={(e, transactionType) => onSubmit(e, "Income")}
          >
            Add Income
          </button>
          <button
            className="btn"
            onClick={(e, transactionType) => onSubmit(e, "Expense")}
          >
            Add Expense
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
