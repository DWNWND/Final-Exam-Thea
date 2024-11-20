import { useEffect, useRef } from "react";
import { useSearchStore, useAuthStore } from "../stores";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

export default function useInactivityTimer() {
  const logOut = useAuthStore((state) => state.logOut);
  const clearTravelSearchStore = useSearchStore((state) => state.clearTravelSearchStore);
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      logOut(); // Clear store after inactivity limit
      clearTravelSearchStore();
      console.log("Store cleared due to inactivity");
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    resetTimer(); // Start timer on mount

    // Event listeners to reset timer on user activity
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      // Cleanup on unmount
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
}
