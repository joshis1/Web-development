import React from 'react'

const ChildInput = (props, ref) => {

  // de-structuring the ref.
  const {inputRef, buttonRef} = ref.current;

  const clickElement = (ref) => {
   console.log('called click Element');
  }

  return (
    <>
    <input ref={inputRef} type="text" />
     <button ref={buttonRef} onClick={() => clickElement(buttonRef)}>Hello </button>
    </>
  )
}

export default React.forwardRef(ChildInput);