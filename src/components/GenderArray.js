let array = ["male", "female", "engineer", "engineer in cairo university"];

export default function Gender() {
  return array.map((item, index) => <option>{item}</option>);
}
