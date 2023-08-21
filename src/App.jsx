import { useState } from "react";
import "./App.css";

const characters = [
  { name: "Jon Snow", price: 13.5 },
  { name: "Danerys Targaryen", price: 16.5 },
  { name: "Tyrion Lannister", price: 19 },
];

const App = () => {
  const [totalValue, setTotalValue] = useState(13.5);
  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <div>
        <label>Elige un personaje:</label>
        <select onChange={(e) => setTotalValue(Number(e.target.value))}>
          {characters.map((character) => {
            return (
              <option
                key={character.name}
                value={character.price}
              >{`${character.name} (${character.price}€)`}</option>
            );
          })}
        </select>
      </div>

      <div>
        Precio total: <span>{totalValue.toFixed(2)}€</span>
      </div>
    </>
  );
};

export default App;
