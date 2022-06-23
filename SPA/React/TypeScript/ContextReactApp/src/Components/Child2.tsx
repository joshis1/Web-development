import React, {useContext} from 'react';
import { TaskContext } from '../App';

const Child2 = () => {

 const val = useContext<string>(TaskContext);

  return (
    <div>{val}</div>
  )
}

export default Child2;