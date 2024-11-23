import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]); // Runs effect when the pathname changes

  return null; // This component doesn't render anything
}
