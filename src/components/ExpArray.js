let exp = [];

for (let i = 1; i <= 20; i++) {
  exp.push(i);
}

export default function CountriesList() {
  return exp.map((item, index) => <option>{item}</option>);
}
