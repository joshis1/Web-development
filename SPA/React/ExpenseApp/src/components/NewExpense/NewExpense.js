import { useState } from "react";
import ExpenseForm from "./ExpenseForm.js";
import "./NewExpense.css";
import "./ExpenseForm.css";

const NewExpense = (props) => {
  const SaveExpenseDataHandler = (enteredExpenseData) => {
    const newExpenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(newExpenseData);
    props.onAddExpense(newExpenseData);
    expenseMessage = (
      <div className="new-expense">
        <button type="submit" onClick={AddExpenseHandler}>
          Add Expense
        </button>
      </div>
    );
    setExpenseDialog(expenseMessage);
  };

  const CancelExpenseHandler = (event) => {
    console.log("Cancel Expense Handler invoked");
    expenseMessage = (
      <div className="new-expense">
        <button type="submit" onClick={AddExpenseHandler}>
          Add Expense
        </button>
      </div>
    );
    setExpenseDialog(expenseMessage);
  };

  const AddExpenseHandler = (event) => {
    expenseMessage = (
      <div className="new-expense">
        <ExpenseForm
          onCancelExpenseData={CancelExpenseHandler}
          onSaveExpenseData={SaveExpenseDataHandler}
        />
      </div>
    );
    setExpenseDialog(expenseMessage);
  };

  let expenseMessage = (
    <div className="new-expense">
      <button type="submit" onClick={AddExpenseHandler}>
        Add Expense
      </button>
    </div>
  );

  const [expenseDialog, setExpenseDialog] = useState(expenseMessage);

  return expenseDialog;
};

export default NewExpense;
