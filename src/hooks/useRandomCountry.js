import { useState, useEffect } from "react";

const getRandomCountry = async () => {
    const response = await fetch("https://random-data-api.com/api/v2/addresses");
    const country = await response.json();
    return { name: country.country, code: country.country_code };
};
const DEFAULT_COUNTRY = {
    name: "Spain",
    code: "ES",
};

const useRandomCountry = (defaultCountry = DEFAULT_COUNTRY) => {
    const [country, setCountry] = useState(defaultCountry);

    useEffect(() => {
        const setInitialCountry = async () => {
            const country = await getRandomCountry();
            setCountry(country);
        };
        setInitialCountry();
    }, []);

    return { country };
};

export default useRandomCountry;