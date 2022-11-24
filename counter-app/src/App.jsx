import Navbar from "./components/navbar";
import Counters from "./components/counters";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

import "./App.css";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 0 },
    { id: 3, value: 2 },
    { id: 4, value: 80 },
  ]);

  const handleDelete = (counterId) => {
    setCounters(counters.filter((c) => c.id !== counterId));
  };

  const handleIncrement = (counter) => {
    counters.filter((c) => c.id === counter.id)[0].value++;
    setCounters(
      counters.map((c) => {
        return c;
      })
    );
  };

  const handleDecrement = (counter) => {
    counters.filter((c) => c.id === counter.id)[0].value--;
    setCounters(
      counters.map((c) => {
        return c;
      })
    );
  };

  const handleReset = () => {
    setCounters(
      counters.map((c) => {
        c.value = 0;
        return c;
      })
    );
  };

  return (
    <div className="App">
      <Navbar totalCounters={counters.filter((c) => c.value > 0).length} />
      <main className="container">
        <Counters
          counters={counters}
          onReset={handleReset}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
