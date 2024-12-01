import { useNavigateBackHook } from "../../../hooks";
import { useNavigationStore } from "../../../stores";
import { FaArrowLeft } from "react-icons/fa6";

export function ArrowLeftBtn() {
  const handleBack = useNavigateBackHook();
  const { hasPreviousRoute } = useNavigationStore();

  const previousRoute = hasPreviousRoute();

  if (!previousRoute) {
    return null;
  }

  return (
    <button className="flex items-center justify-center gap-2 h-9 w-9 font-bold text-xl text-primary-green border border-primary-green rounded-full hover:shadow-md" onClick={handleBack}>
      <FaArrowLeft />
      <p className="sr-only">back button</p>
    </button>
  );
}
