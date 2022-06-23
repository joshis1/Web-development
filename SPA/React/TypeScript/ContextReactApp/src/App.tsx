import React, { FC, useState, ChangeEvent, MouseEvent, createContext } from 'react';
import './App.css';
import Child1 from './Components/Child1';

// Ref using pure JS - https://www.youtube.com/watch?v=Hu5lB21Wf5k&t=384s

export const TaskContext = createContext<string>('');

const App: FC = () => {

  const [task, setTask] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setTask(event.target.value);
  }

  const addTask = (event: MouseEvent<HTMLButtonElement>) => {
     setTask('');
  }
  

  return (
    <div className="App">
      <TaskContext.Provider value={task} >
          <input type="text" value={task} placeholder='task..' name="task" onChange={handleChange} />
          <button onClick={addTask}> Add Task</button>
          <Child1 />
      </TaskContext.Provider>
      </div>
  );
}

export default App;
