import { useState } from "react";
import { characters, DRAGON_PRICE } from "../model/characters";

const useProduct = () => {
    const [product, setProduct] = useState({
        character: characters[0],
        includeDragon: false,
    });

    const extraDragon = product.character.dragonOption && product.includeDragon ? DRAGON_PRICE : 0;
    const productPrice = (product.character.price + extraDragon);

    return {
        product,
        productPrice,
        setProduct
    }
}

export default useProduct;