import { useState } from "react";
import "./App.css";
import useTaxes from "./hooks/useTaxes";

const characters = [
  { name: "Jon Snow", price: 13.5 },
  { name: "Danerys Targaryen", price: 16.5, dragonOption: true },
  { name: "Tyrion Lannister", price: 19 },
];
const DRAGON_PRICE = 44.5;

const App = () => {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const selectedCharacter = characters[selectedCharacterIndex];

  const [includeDragon, setIncludeDragon] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const { taxPercentage, country } = useTaxes();

  const extraDragon = selectedCharacter.dragonOption && includeDragon ? DRAGON_PRICE : 0;
  const totalValue = (selectedCharacter.price + extraDragon) * quantity;

  const totalValueWithTaxes = totalValue + totalValue * (taxPercentage / 100);
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

      {selectedCharacter.dragonOption && (
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
        Impuesto: <span>{taxPercentage}%</span>
        <span>
          {country?.code && (
            <img width="16px" src={`https://flagsapi.com/${country.code}/flat/64.png`} />
          )}
        </span>
      </div>

      <div>
        Precio total: <span>{totalValueWithTaxes.toFixed(2)}€</span>
      </div>
    </>
  );
};

export default App;
