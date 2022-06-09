import React, { FC, useState, ChangeEvent } from 'react';
import './App.css';
import { ITask } from './interfaces';
import TodoTask from './Components/TodoTask';
//import { isAsteriskToken } from 'typescript';

/** FC type in normal nodejs  typescript - functional type
 * check bindings.
 */


const App: FC = () => {

  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  // array of ITask.
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const module = {
    x: 42,
    getX: function () {
      return this.x;
    }
  }

  const unmodulex = module.getX;

  console.log(unmodulex.bind(module)());

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {

    if (event.target.name === 'task') {
      setTask(event.target.value);
    }
    if (event.target.name === 'deadline') {
      setDeadline(Number(event.target.value));
    }

  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTask('');
    setDeadline(0);

  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task: ITask) => {
      return (task.taskName !== taskNameToDelete);
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input type="text" value={task} placeholder='task..' name="task" onChange={handleChange} />
          <input type="number" value={deadline} placeholder='deadline in days' name="deadline" onChange={handleChange} />
        </div>
        <button onClick={addTask}> Add Task</button>

      </div>

      <div className='todoList'>

        {todoList.map((task: ITask, index: number) => {
          return <TodoTask key={index} task={task} completeTask={completeTask} />;
        })}

      </div>

    </div>
  );
}

export default App;
