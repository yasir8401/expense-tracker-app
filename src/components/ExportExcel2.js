import React, { useContext } from "react";
import ReactExport from "react-data-export";
import { GlobalContext } from "../context/GlobalState";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportExcel2 = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const currentBal = (income - expense).toFixed(2);

  const multiDataSet = [
    {
      columns: [
        {
          title: "ID",
          width: { wpx: 80 },
          style: {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "FFFF0000" },
            },
            font: { sz: "12", bold: true },
          },
        }, //pixels width
        {
          title: "TRANSACTION DESCRIPTION",
          width: { wpx: 200 },
          style: {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "FFFF0000" },
            },
            font: { sz: "12", bold: true },
          },
        }, //char width
        {
          title: "TRANSACTION AMOUNT",
          width: { wpx: 200 },
          style: {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "FFFF0000" },
            },
            font: { sz: "12", bold: true },
          },
        },
        {
          title: "TRANSACTION TYPE",
          width: { wpx: 200 },
          style: {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "FFFF0000" },
            },
            font: { sz: "12", bold: true },
          },
        },
      ],
      data: transactions.map((transaction, index) => {
        return [
          {
            value: (index + 1).toString(),
            style: { font: { sz: "12", bold: false } },
          },
          {
            value: transaction.text,
            style: {
              font: { sz: "12", bold: false },
              alignment: { horizontal: "left" },
            },
          },
          {
            value:
              (transaction.amount > 0 ? "$" : "-$") +
              Math.abs(transaction.amount.toFixed(2)),
            style: {
              font: { sz: "12", bold: false },
              alignment: { horizontal: "right" },
            },
          },
          {
            value: transaction.amount > 0 ? "INCOME" : "EXPENSE",
            style: { font: { sz: "12", bold: false } },
          },
        ];
      }),
    },
  ];

  const totalIncome = [
    { value: "", style: { font: { sz: "12", bold: false } } },
    {
      value: "TOTAL INCOME",
      style: { font: { sz: "12", bold: true } },
    },
    {
      value: "$" + income,
      style: {
        font: { sz: "12", bold: true },
        alignment: { horizontal: "right" },
      },
    },
    {
      value: "",
      style: { font: { sz: "12", bold: false } },
    },
  ];

  const totalExpense = [
    { value: "", style: { font: { sz: "12", bold: false } } },
    {
      value: "TOTAL EXPENSE",
      style: { font: { sz: "12", bold: true } },
    },
    {
      value: "$" + expense,
      style: {
        font: { sz: "12", bold: true },
        alignment: { horizontal: "right" },
      },
    },
    {
      value: "",
      style: { font: { sz: "12", bold: false } },
    },
  ];

  const currentBalance = [
    { value: "", style: { font: { sz: "12", bold: false } } },
    {
      value: "CURRENT BALANCE",
      style: {
        font: { sz: "12", bold: true },
        fill: {
          patternType: "solid",
          fgColor: { rgb: "00FF00" },
        },
      },
    },
    {
      value: (currentBal > 0 ? "$" : "-$") + Math.abs(currentBal),
      style: {
        font: { sz: "12", bold: true },
        fill: {
          patternType: "solid",
          fgColor: { rgb: "00FF00" },
        },
        alignment: { horizontal: "right" },
      },
    },
    {
      value: "",
      style: { font: { sz: "12", bold: false } },
    },
  ];

  multiDataSet[0].data.push(totalIncome);
  multiDataSet[0].data.push(totalExpense);
  multiDataSet[0].data.push(currentBalance);

  return (
    <ExcelFile
      element={<button className="btn btn-export">Export to Excel</button>}
    >
      <ExcelSheet dataSet={multiDataSet} name="IncomeExpense Sheet" />
    </ExcelFile>
  );
};

export default ExportExcel2;
