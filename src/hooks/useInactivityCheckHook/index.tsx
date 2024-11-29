import { useEffect, useRef } from "react";
import { useTravelSearchStore, useAuthStore } from "../../stores";

const INACTIVITY_LIMIT = 10 * 60 * 1000;

export function useInactivityCheckHook(): void {
  const { logOut } = useAuthStore();
  const { clearTravelSearchStore } = useTravelSearchStore();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = (): void => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      logOut();
      clearTravelSearchStore();
      console.log("Store cleared due to inactivity");
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    resetTimer();

    const events: string[] = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return;
}
