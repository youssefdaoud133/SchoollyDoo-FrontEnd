const supjects = [
  "Arabic",
  "English",
  "Math",
  "Science",
  "Drasat",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function CountriesList() {
  return supjects.map((item, index) => <option>{item}</option>);
}
