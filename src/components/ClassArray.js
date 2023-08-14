const ClassStages = [
  "First Year of Primary School",
  "Second Year of Primary School",
  "Third Year of Primary School",
  "Fourth Year of Primary School",
  "Fifth Year of Primary School",
  "Sixth Year of Primary School",
  "First Year of Preparatory School",
  "Second Year of Preparatory School",
  "Third Year of Preparatory School",
  "First Year of Secondary School",
  "Second Year of Secondary School",
  "Third Year of Secondary School",
];

export default function ClassArray() {
  return ClassStages.map((item, index) => <option>{item}</option>);
}
