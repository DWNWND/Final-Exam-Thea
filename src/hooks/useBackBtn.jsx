import { useNavigationStore } from "../stores";
import { useNavigate } from "react-router-dom";

export const useBackButton = () => {
  const navigate = useNavigate();
  const goBack = useNavigationStore((state) => state.goBack);

  const handleBack = () => {
    const previousRoute = useNavigationStore.getState().history.slice(-2, -1)[0];
    if (previousRoute) {
      goBack(); // Update history only if there's a previous route
      navigate(previousRoute); // Navigate to the previous route
    } else {
      console.log("No previous route available");
    }
  };

  return handleBack;
};
