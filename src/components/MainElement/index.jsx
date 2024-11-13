import { OpenMenuContext } from "../../contexts";
import { useContext } from "react";

export default function MainElement({ children, tailw, homePage = false }) {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  return (
    <div className={`relative`}>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
        onClick={() => setIsMenuOpen(false)} // Optional: Close the menu when clicking the backdrop
      ></div>

      <main className={`${!homePage && "pt-24 p-4 pb-12 md:px-8"} min-h-screen bg-desatBlue ${tailw}`}>{children}</main>
    </div>
  );
}

// import { OpenMenuContext } from "../../contexts";
// import { useContext } from "react";

// export default function MainElement({ children, tailw, homePage = false }) {
//   const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

//   return <main className={`${isMenuOpen && "opacity-30 blur-sm"} ${!homePage && "pt-24 p-4 pb-12 md:px-8"} min-h-svh bg-desatBlue ${tailw}`}>{children}</main>;
// }

//i need pt-24 for profile page
