import React, { useRef, useEffect } from "react";
import ChildInput from "./components/ChildInput";

// Pass a ref from a parent component to the child component.
// Basically we are passing a ref from the parent component to the child component.
// In the parent component, we can change the properties of the child component DOM element using the 
// ref we passed, basically, we forwarded the ref from parent to the child.
// now child uses that ref to point to its DOM elements.
// Since parent has a ref, the parent will use that ref to mainpulate the elements.


// In this example, I have a childInput class that has a DOM element input.
// I want to change the input properties of the child component from the parent.
// We do this by creating a ref in the parent component.
// Next, we pass the ref from the parent component to the child component.
// Child component we wrap it using ForwardRef and then use the ref passed to associate its DOM element.
// Next Parent component can change the child component DOM element using the ref it has passed.


const App = () => {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.style.color = "red";
  }, []);

  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );

};

export default App;
