import { ReactNode, useContext } from "react";
import { OpenMenuContext } from "../../contexts";

interface MainElementProps {
  children: ReactNode;
  tailw?: string;
  noPadding?: boolean;
}

export default function MainElement({ children, tailw = "", noPadding = false }: MainElementProps) {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  return (
    <div className="relative">
      <div className={`inset-0 bg-black bg-opacity-10 transition-opacity duration-500 ease-in-out ${isMenuOpen ? "fixed opacity-100 z-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen && setIsMenuOpen(false)}></div>
      <main className={`${!noPadding && "pt-24 p-4 pb-12 md:px-8"} transition duration-1000 ease-in-out min-h-screen bg-desatBlue ${tailw} ${isMenuOpen ? "blur-sm" : "blur-none"}`}>{children}</main>
    </div>
  );
}
