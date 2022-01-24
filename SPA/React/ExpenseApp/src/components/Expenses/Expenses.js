import {useState} from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpenseChart";

const Expenses = (props) => {
  
 const [yearPick, setYearPick] = useState('2020');
 const expenseFilterHandler = (seletedYear) =>
 { 
     console.log('Expense filter handler storing the year Pick State');
     setYearPick(seletedYear);
 }
 
  const yearFilter = props.item.filter( (expense) => {
     return expense.date.getFullYear().toString() === yearPick; 
   });

  return (
    <li>
      <Card className="expenses">
        <ExpensesFilter selected={yearPick} onYearPick={expenseFilterHandler} />
        <ExpenseChart expenses={yearFilter} />
        <ExpensesList selectedYear={yearFilter} />
      </Card>
    </li>
  );
};

export default Expenses;
