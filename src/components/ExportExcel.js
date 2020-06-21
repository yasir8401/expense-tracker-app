import React, { useContext } from 'react'   
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import { GlobalContext } from "../context/GlobalState";

import '../App.css'

export const ExportExcel = () => {  
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

    return (  
        <div>  
            <table id="emp" class="table" style={{display:"none"}}>  
                <thead>  
                    <tr style={{backgroundColor: "red"}}>
                        <th>Id</th>  
                        <th colSpan="2">Transaction Name</th>  
                        <th colSpan="2">Transaction Amount</th>  
                    </tr>  
                </thead>  
                <tbody> {  
                    transactions.map((p, index) => {  
                        return <tr key={index}>  
                            <td>  
                                {index + 1}  
                            </td>  
                            <td colSpan="2">{p.text}</td>  
                            <td colSpan="2">{p.amount}</td>  
                        </tr>  
                    })  
                }  
                <tr>
                    <td />
                    <td colSpan="2">Total Income: </td>  
                    <td colSpan="2">{income}</td>  
                </tr>
                <tr>
                    <td />
                    <td colSpan="2">Total Expense: </td>  
                    <td colSpan="2">{expense}</td>  
                </tr>
                <tr>
                    <td />
                    <td colSpan="2">Current Balance: </td>  
                    <td colSpan="2"> {income + expense}</td>  
                </tr>
                </tbody>  
                
            </table>  
        <div>  
        <ReactHTMLTableToExcel  
            className="btn btn-export"  
            table="emp"  
            filename="ReportExcel"  
            sheet="Sheet"  
            buttonText="Export Excel" />  
        </div>  
    </div>  
)  
}  

  
export default ExportExcel