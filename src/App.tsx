import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!pRef.current) return;
    pRef.current.style.width = "100px";
  }, []);

  return (
    <>
      <div>
        <p ref={pRef}>Week Paragraph</p>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
