const { countries } = require("countries-list");

export default function CountriesList() {
  return Object.values(countries).map((item, index) => (
    <option>{item.name}</option>
  ));
}
