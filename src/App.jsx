import { useState } from "react";
import "./App.css";
import useTaxes from "./hooks/useTaxes";
import useProduct from "./hooks/useProduct";
import ProductSelector from "./components/ProductSelector";

const App = () => {
  const {
    product: selectedProduct,
    setProduct: setSelectedProduct,
    productPrice: selectedProductPrice,
  } = useProduct();
  const [quantity, setQuantity] = useState(1);
  const { taxPercentage, country } = useTaxes();

  const totalPrice = selectedProductPrice * quantity;
  const totalPriceValueWithTaxes = totalPrice + totalPrice * (taxPercentage / 100);

  return (
    <>
      <h1>Calculadora de precios de muñecos cabezones</h1>

      <ProductSelector selectedProduct={selectedProduct} onProductSelected={setSelectedProduct} />

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
        Precio total: <span>{totalPriceValueWithTaxes.toFixed(2)}€</span>
      </div>
    </>
  );
};

export default App;
