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

  // passing multiple forward Refs
  // reference - https://thewebdev.info/2021/11/14/how-to-forward-multiple-refs-with-react/#:~:text=To%20forward%20multiple%20refs%20with%20React%2C%20we%20can%20pass,the%20refs%20in%20an%20object.&text=We%20have%20the%20Child%20component,ref1%2C%20ref2%20%7D%20%3D%20ref.

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const completeRef = useRef({inputRef, buttonRef});

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.style.color = "red";
    buttonRef.current.style.color = "blue";
  }, []);


  return (
    <div>
      <ChildInput ref={completeRef} />
    </div>
  );

};

export default App;
