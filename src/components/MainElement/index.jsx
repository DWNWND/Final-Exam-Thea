import { OpenMenuContext } from "../../contexts";
import { useContext } from "react";

export default function MainElement({ children, tailw, homePage = false }) {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  return (
    <div className="relative">
      <div
        className={`inset-0 bg-black bg-opacity-10 transition-opacity duration-500 ease-in-out ${isMenuOpen ? "fixed opacity-100 z-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)} // Optional: Close the menu when clicking the backdrop
      ></div>

      <main className={`${!homePage && "pt-24 p-4 pb-12 md:px-8"} transition duration-1000 ease-in-out  min-h-screen bg-desatBlue ${tailw} ${isMenuOpen ? "blur-sm" : "blur-none"}`}>{children}</main>
    </div>
  );
}

//i need pt-24 for profile page
