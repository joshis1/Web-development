import React,  {useContext}  from 'react';
import { TaskContext } from '../App';

const Child2 = () => {

    const val  = useContext(TaskContext);
    return (
        <h1>
            {val}
        </h1>
    )
}

export default Child2