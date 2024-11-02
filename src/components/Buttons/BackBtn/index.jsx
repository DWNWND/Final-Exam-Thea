import { FaArrowCircleLeft } from "react-icons/fa";
import { useBackButton } from "../../../hooks/useBackBtn";
import { useNavigationStore } from "../../../stores/useNavigationStore";

export default function BackBtn({ innerText, tailw }) {
  const handleBack = useBackButton();
  const hasPreviousRoute = useNavigationStore((state) => state.hasPreviousRoute());

  console.log("backto", hasPreviousRoute);

  // // Conditionally render the back button based on hasPreviousRoute
  if (!hasPreviousRoute) {
    return null; // Don't render the button if there's no previous route
  }

  return (
    <button className={`flex items-center gap-2 ${tailw}`} onClick={handleBack}>
      <FaArrowCircleLeft />
      <span>{innerText}</span>
    </button>
  );
}
