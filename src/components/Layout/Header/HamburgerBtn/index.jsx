import { useContext } from "react";
import { OpenMenuContext } from "../../../../contexts";

export default function HamburgerBtn() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <button className={`w-6 h-6 border-0 p-0 flex justify-center items-center z-[100]`} value="button to open and close menu" onClick={() => onHamburgerMenuClick()}>
      <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
        <div className="hidden">menu</div>
        <div className="burger-lines"></div>
      </div>
    </button>
  );
}

