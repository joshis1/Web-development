import "./App.css";
import UserInput from "./Components/UserInput/UserInput";
import Validation from "./Components/Validation/Validation";
import { useState } from "react";
import Output from "./Components/Output/Output";


const App = (props) =>
{

  const errorMessage = [
    "",
    "Please enter a valid name and age (non-empty values).",
    "Please enter a valid age (>0)."
  ];

  let usrList = [
    // {
    //   id: "e1",
    //   user: "Shreyas",
    //   age: 39
    // },
  ];

  const [errNumber, setErrNumber] = useState(0);

  const [userList, setUsrList] = useState(usrList);

  const validationOkHandler = () => {
       //setting error back to 0.
       setErrNumber(0);
  }

  const resetForm = () => {
      
  };


  const userInputHandler = (userData) => {
    //console.log(userData);
    if (userData.user.trim() === "" || userData.age === 0) {
      console.log(
        "Invalid Input - Please enter a valid name and age (non-empty values)."
      );
      setErrNumber(1);
      
    }

    else if (userData.age < 0) {
      console.log("Invalid input  Please enter a valid age (>0).");
      setErrNumber(2);
    } 
    else {
      setErrNumber(0);
      userData.id = Math.random();
      setUsrList( (previousUSer) => {
        return [userData, ...previousUSer];
      }); 
    }
  };

  return (
    <div>
      <UserInput
        onUserInput={userInputHandler}
        valdiationOk={validationOkHandler}

      />
      {errNumber > 0 && (
        <Validation valdiationOk={validationOkHandler}>
          {errorMessage[errNumber]}
        </Validation>
      )}

      {errNumber === 0 && <Output userList={userList} />}
    </div>
  );
}

export default App;
