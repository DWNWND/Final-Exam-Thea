import { useContext } from "react";
import { OpenMenuContext } from "../../../../contexts/";

export default function HamburgerBtn(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  const onHamburgerMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <button type="button" className="w-6 h-6 border-0 p-0 flex justify-center items-center z-[100]" aria-label="Toggle menu" onClick={onHamburgerMenuClick}>
      <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
        <span className="sr-only">Menu</span>
        <div className="burger-lines"></div>
      </div>
    </button>
  );
}
