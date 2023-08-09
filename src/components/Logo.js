import "../App.css";
import Logo from "../pictures/LogoF2.png";
export default function logo() {
  return (
    <img
      id="Logo-in-login"
      className="mx-auto h-10 w-auto"
      src={Logo}
      alt="Your Company"
    />
  );
}
