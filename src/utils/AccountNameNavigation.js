export default function AccountNameNavigation(status) {
  switch (status) {
    case "leader":
      return [
        { name: "My Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#" },
        { name: "Dashboard", href: "#" },
      ];
    case "teacher":
      return [
        { name: "My Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#" },
        { name: "Dashboard", href: "#" },
      ];
    case "manager":
      return [
        { name: "My Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#" },
        { name: "Dashboard", href: "#" },
      ];

    default:
      return [
        { name: "Settings", href: "#" },
        { name: "login", href: "#" },
        { name: "Sign up", href: "#" },
      ];
    // code block to be executed when none of the cases match the expression
  }
}

// const AccountNameNavigation = [
//   { name: "My Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   { name: "Sign out", href: "#" },
//   { name: "login", href: "#" },
//   { name: "Sign up", href: "#" },
// ];
