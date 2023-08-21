import { useState } from "react";
import "./App.css";

const App = () => {
  const [totalValue, setTotalValue] = useState(13.5);
  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <div>
        <label>Elige un personaje:</label>
        <select onChange={(e) => setTotalValue(Number(e.target.value))}>
          <option value="13.5">Jon Snow (13.5€)</option>
          <option value="16.5">Danerys Targaryen (16.5€)</option>
          <option value="19">Tyrion Lannister (19€)</option>
        </select>
      </div>

      <div>
        Precio total: <span>{totalValue.toFixed(2)}€</span>
      </div>
    </>
  );
};

export default App;
