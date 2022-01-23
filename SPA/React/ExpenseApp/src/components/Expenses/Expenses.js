import ExpenseItem from "./ExpenseItem";
import {useState} from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
  
 const [yearPick, setYearPick] = useState('2020');
 const expenseFilterHandler = (event) =>
 { 
     console.log('Expense filter handler storing the year Pick State');
     setYearPick(yearPick);
 }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={yearPick} onYearPick={expenseFilterHandler} />
        <ExpenseItem
          title={props.item[0].title}
          amount={props.item[0].amount}
          date={props.item[0].date}
        />
        <ExpenseItem
          title={props.item[1].title}
          amount={props.item[1].amount}
          date={props.item[1].date}
        />
        <ExpenseItem
          title={props.item[2].title}
          amount={props.item[2].amount}
          date={props.item[2].date}
        />
        <ExpenseItem
          title={props.item[3].title}
          amount={props.item[3].amount}
          date={props.item[3].date}
        />
      </Card>
    </div>
  );
};

export default Expenses;
