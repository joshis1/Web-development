import { useState } from "react";

import styles from "./UserInput.module.css";
import App from "../../App";


const UserInput = (props) => {
  const [usrName, setUsrName] = useState("");
  const [age, setAge] = useState("");

  const userNameHandler = (event) => {
    console.log(event.target.value);
    setUsrName(event.target.value);
  };

  const ageHandler = (event) => {
    console.log(event.target.value);
    setAge(event.target.value);
  };


  const addUserHandler = (event) => {
    const userInfo = {
      user: usrName,
      age: +age,
    };
  
    console.log("SJ--invoked", userInfo);
    props.onUserInput(userInfo);
    setUsrName("");
    setAge("");
    event.stopPropagation();
  };

  const ModalHandler = () => {
    console.log("Modal handler clicked");
    props.valdiationOk();
  };

  return (
    <div className={`${styles["container"]}`} onClick={ModalHandler}>
      <div className={`${styles["inputWrapper"]}`}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={usrName}
          onChange={userNameHandler}
        ></input>
      </div>

      <div className={`${styles["inputWrapper"]}`}>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          id="age"
          value={age}
          onChange={ageHandler}
        ></input>
      </div>

      <div>
        <button type="submit" onClick={addUserHandler}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserInput;
