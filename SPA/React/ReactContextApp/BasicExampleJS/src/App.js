import React, { useState, createContext } from "react";

import Child1 from "./components/Child1";

// App.js --> Child1 --> Child 2
// Props drilling just to pass task from App to Child 2, I need to keep passing form Child1 
// Solution - 
// https://reactjs.org/docs/context.html#:~:text=Context%20is%20primarily%20used%20when,a%20simpler%20solution%20than%20context.
// Example - 
//  UI - ThemeApp
//  Language Preference -->
// Login - currented authenticated User.
// https://reactjs.org/docs/context.html#when-to-use-context
// Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.


// Provider and Consumer
// Provider - provides the data that sub components ( subcomponents) wants access to.
// Consumer - 'subscribers' to the provider to get access to the data it holds.


export const TaskContext = createContext();


const App = () => {

  const [task, setTask] = useState('');

  const addTask = (event) => {
    setTask('Set button invoked');
  }

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  return (
    <div>
      <TaskContext.Provider value={task} >
      <input type="text" value={task} placeholder='task..' onChange={handleChange}></input>
      <button onClick={addTask}>Add Task</button>
      <Child1 />
      </TaskContext.Provider>
    </div>
  );

};

export default App;
