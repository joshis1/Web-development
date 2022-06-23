import React, { useRef, useEffect } from "react";
import song from './media/Abhi Mujh Mein Kahin.mp3';


//Declarative vs. Imperative

// Imperative - we give step by step, document get element by Id.
// Add Event Listener, change Event Listener in the List.
// Create a DOM element and assign.
// step by step instruction in order to mainpulate the DOM.

// Declarative - We use React State update and we use Virtual DOM.
// Don't use Ref because it is against declarative. However, in certain conditions we need to use
// ref.

// When to use Ref.
// https://reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs
// Managing focus, text selection, or media playback.
// Triggering imperative animations.
// Integrating with third-party DOM libraries.


const App = () => {

  const inputRef = useRef(null);
  // const audioRef  = useRef(null);

  useEffect(() => {
    //audioRef.current.muted='true';
    //audioRef.current.play();
    // focus the input element
    inputRef.current.focus();

  }, []);

  return (
    <div>
      <audio src={song} controls />
      <input ref={inputRef} type="text" />
    </div>
  );

};

export default App;
