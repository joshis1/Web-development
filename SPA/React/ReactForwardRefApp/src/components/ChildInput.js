import React from 'react'

const ChildInput = (props, ref) => {
  return (
    <input ref={ref} type="text" />
  )
}

export default React.forwardRef(ChildInput);