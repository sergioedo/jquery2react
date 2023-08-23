import { useState } from "react";
import "./App.css";
import useTaxes from "./hooks/useTaxes";
import { characters, DRAGON_PRICE } from "./model/characters";
import useProduct from "./hooks/useProduct";

const App = () => {
  const {
    product: selectedProduct,
    setProduct: setSelectedProduct,
    productPrice: selectedProductPrice,
  } = useProduct();

  const [quantity, setQuantity] = useState(1);

  const { taxPercentage, country } = useTaxes();

  const { character: selectedCharacter, includeDragon } = selectedProduct;

  const totalValue = selectedProductPrice * quantity;
  const totalValueWithTaxes = totalValue + totalValue * (taxPercentage / 100);

  const handleCharacterSelected = (e) => {
    const selectedCharacter = characters[Number(e.target.value)];
    setSelectedProduct({
      character: selectedCharacter,
      includeDragon: false, //cada vez que cambiamos, reseteamos el complemento del dragon
    });
  };

  const handleIncludeDragonChanged = (e) => {
    setSelectedProduct({
      character: selectedProduct.character,
      includeDragon: e.target.checked,
    });
  };

  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <div>
        <label>Elige un personaje:</label>
        <select onChange={handleCharacterSelected}>
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
          <input type="checkbox" checked={includeDragon} onChange={handleIncludeDragonChanged} />
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
