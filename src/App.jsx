import "./App.css";

const App = () => {
  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <div>
        <label>Elige un personaje:</label>
        <select id="character">
          <option value="13.5">Jon Snow (13.5€)</option>
          <option value="16.5">Danerys Targaryen (16.5€)</option>
          <option value="19">Tyrion Lannister (19€)</option>
        </select>
      </div>

      <div id="result">
        Precio total: <span id="total">13.50€</span>
      </div>
    </>
  );
};

export default App;
