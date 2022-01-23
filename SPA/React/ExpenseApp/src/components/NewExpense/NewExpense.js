import ExpenseForm from './ExpenseForm.js';
import './NewExpense.css';

const NewExpense = (props) => {

const SaveExpenseDataHandler = (enteredExpenseData) => {
   const newExpenseData = {
     ...enteredExpenseData,
     id: Math.random().toString()
   };
   console.log(newExpenseData);
   props.onAddExpense(newExpenseData);
}

  return (
  <div className="new-expense">
    <ExpenseForm onSaveExpenseData={SaveExpenseDataHandler}/>
  </div>);
}


export default NewExpense;