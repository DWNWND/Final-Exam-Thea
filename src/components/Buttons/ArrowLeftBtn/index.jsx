import { FaArrowCircleLeft } from "react-icons/fa";
import { useBackButton } from "../../../hooks/useBackBtn";
import { useNavigationStore } from "../../../stores/useNavigationStore";
import { FaArrowLeft } from "react-icons/fa6";

export default function ArrowLeftBtn() {
  const handleBack = useBackButton();
  const hasPreviousRoute = useNavigationStore((state) => state.hasPreviousRoute());

  if (!hasPreviousRoute) {
    return null; // Don't render the button if there's no previous route
  }

  return (
    <button className={`flex items-center justify-center gap-2 h-9 w-9 font-bold text-xl text-primary-green border border-primary-green rounded-full hover:shadow-md `} onClick={handleBack}>
      <FaArrowLeft />
    </button>
  );
}