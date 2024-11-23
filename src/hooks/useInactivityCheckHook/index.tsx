import { useEffect, useRef } from "react";
import { useTravelSearchStore, useAuthStore } from "../../stores";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

export function useInactivityCheckHook(): void {
  const { logOut } = useAuthStore();
  const { clearTravelSearchStore } = useTravelSearchStore();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = (): void => {
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
    const events: string[] = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      // Cleanup on unmount
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return;
}
