import useRandomCountry from "./useRandomCountry";

const useTaxes = () => {
    const { country } = useRandomCountry();
    const countryLetter = country.name.charAt(0).toLowerCase();
    const taxPercentage = ["a", "e", "i", "o", "u"].includes(countryLetter) ? 10 : 20;

    return { taxPercentage, country };
}
export default useTaxes;