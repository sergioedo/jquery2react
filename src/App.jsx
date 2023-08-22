import { useState, useEffect } from "react";
import "./App.css";

const getRandomCountry = async () => {
  const response = await fetch("https://random-data-api.com/api/v2/addresses");
  const country = await response.json();
  return { name: country.country, code: country.country_code };
};
const DEFAULT_COUNTRY = {
  name: "Spain",
  code: "ES",
};

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

  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    const setInitialCountry = async () => {
      const country = await getRandomCountry();
      setCountry(country);
    };
    setInitialCountry();
  }, []);

  const extraDragon = showDragonOption && includeDragon ? DRAGON_PRICE : 0;
  const totalValue = (selectedCharacter.price + extraDragon) * quantity;

  const countryLetter = country.name.charAt(0).toLowerCase();
  const taxPercentage = ["a", "e", "i", "o", "u"].includes(countryLetter) ? 10 : 20;
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
