import React from "react";
import AddUser from "./Components/Users/AddUser";
import UsersList from "./Components/Users/UsersList";
import { useState } from "react";

function App() {
  const [userslist, setUsersList] = useState([]);

  const addUserHandler = (usrName, uAge) => {
    setUsersList((prevList) => {
      return [
        ...prevList,
        { name: usrName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={userslist} />
    </div>
  );
}

export default App;
