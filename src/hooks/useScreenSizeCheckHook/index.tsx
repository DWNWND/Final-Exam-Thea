import { useState, useEffect } from "react";

export function useScreenSizeCheckHook(): boolean {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const mobileScreen = width <= 768;

  return mobileScreen;
}
