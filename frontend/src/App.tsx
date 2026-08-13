import { useEffect, useState } from "react";



/* where I define my components*/ 

function App() {
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    fetch("http://localhost:3000/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
  <>
    <div
      className={clicked ? "box box-on" : "box box-off"}
      onClick={() => setClicked(!clicked)}
    />

    <h1>{message}</h1>
  </>
);
  
}

export default App;
