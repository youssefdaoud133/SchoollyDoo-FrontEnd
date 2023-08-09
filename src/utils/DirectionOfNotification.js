export default function DirectionOfNotification(status) {
  switch (status) {
    case "Add School":
      return "Add School";
    case "Schools To Active":
      return "Schools To Active";
    case "My school":
      return "My school";

    default:
      return "Add Scsssssshool";
    // code block to be executed when none of the cases match the expression
  }
}
