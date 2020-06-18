import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmit = (e, transactionType) => {
    e.preventDefault();
    if (text === "" || amount === 0 || amount === "") {
      return alert("Please input both Transaction Name & Transaction Amount");
    }

    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: transactionType === "Income" ? +amount : 0 - +amount,
    };

    addTransaction(newTransaction);

    setText("");
    setAmount(0);

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
            min="0"
            onKeyDown={(e) =>
              (e.key === "-" || e.key === "+") && e.preventDefault()
            }
            placeholder="Enter amount..."
          />
        </div>
        <div>
          <input
            type="button"
            className="btn"
            style={{ textAlign: "center" }}
            onClick={(e, transactionType) => onSubmit(e, "Income")}
            value="Add Income"
          ></input>
          <input
            type="button"
            style={{ textAlign: "center" }}
            className="btn"
            onClick={(e, transactionType) => onSubmit(e, "Expense")}
            value="Add Expense"
          ></input>
        </div>
      </form>
    </React.Fragment>
  );
};
