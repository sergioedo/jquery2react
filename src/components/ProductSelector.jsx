import { characters, DRAGON_PRICE } from "../model/characters";
import PropTypes from "prop-types";

const ProductSelector = ({ selectedProduct, onProductSelected }) => {
  const handleCharacterSelected = (e) => {
    const selectedCharacter = characters[Number(e.target.value)];
    onProductSelected({
      character: selectedCharacter,
      includeDragon: false, //cada vez que cambiamos, reseteamos el complemento del dragon
    });
  };

  const handleIncludeDragonChanged = (e) => {
    onProductSelected({
      character: selectedProduct.character,
      includeDragon: e.target.checked,
    });
  };

  return (
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
      {selectedProduct.character.dragonOption && (
        <div>
          <input
            type="checkbox"
            checked={selectedProduct.includeDragon}
            onChange={handleIncludeDragonChanged}
          />
          <label htmlFor="dragon">Con dragón en el hombro ({DRAGON_PRICE}€ más)</label>
        </div>
      )}
    </div>
  );
};

ProductSelector.propTypes = {
  selectedProduct: PropTypes.shape({
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      dragonOption: PropTypes.bool,
    }),
    includeDragon: PropTypes.bool.isRequired,
  }),
  onProductSelected: PropTypes.func,
};

export default ProductSelector;
