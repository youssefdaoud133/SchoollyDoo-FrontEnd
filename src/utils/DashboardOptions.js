export default function AccountNameNavigation(status) {
  switch (status) {
    case "leader":
      return [{ label: "Add School" }, { label: "My school" }];
    case "manager":
      return [{ label: "Schools To Active" }];
    case "teacher":
      return [{ label: "apply to school" }];
    case "SchoolSettings":
      return [
        { label: "Teachers applying for the job" },
        { label: "Students applying for the school" },
        // { label: "Schools To Active" },
        // { label: "Schools To Active" },
      ];

    default:
      return [{ label: "Add Scsssssshool" }];
    // code block to be executed when none of the cases match the expression
  }
}
