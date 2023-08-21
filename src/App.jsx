import { useState } from "react";
import "./App.css";

const characters = [
  { name: "Jon Snow", price: 13.5 },
  { name: "Danerys Targaryen", price: 16.5 },
  { name: "Tyrion Lannister", price: 19 },
];
const DRAGON_PRICE = 44.5;

const App = () => {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const selectedCharacter = characters[selectedCharacterIndex];

  const showDragonOption = selectedCharacterIndex === 1;
  const [includeDragon, setIncludeDragon] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const totalValue =
    (selectedCharacter.price + (showDragonOption && includeDragon ? DRAGON_PRICE : 0)) * quantity;
  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <div>
        <label>Elige un personaje:</label>
        <select onChange={(e) => setSelectedCharacterIndex(Number(e.target.value))}>
          {characters.map((character, index) => {
            return (
              <option
                key={character.name}
                value={index}
              >{`${character.name} (${character.price}€)`}</option>
            );
          })}
        </select>
      </div>

      {showDragonOption && (
        <div>
          <input
            type="checkbox"
            checked={includeDragon}
            onChange={(e) => setIncludeDragon(e.target.checked)}
          />
          <label htmlFor="dragon">Con dragón en el hombro ({DRAGON_PRICE}€ más)</label>
        </div>
      )}

      <div>
        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div>
        Precio total: <span>{totalValue.toFixed(2)}€</span>
      </div>
    </>
  );
};

export default App;
