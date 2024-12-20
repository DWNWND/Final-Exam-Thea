import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";
import { IoIosClose } from "react-icons/io";
import { useAuthStore } from "../../../stores";

interface DeletionModalProps {
  toggle: () => void;
}

export function DeletionModal({ toggle }: DeletionModalProps): JSX.Element {
  const { callApi, scopedLoader } = useApiCall();
  const { userName } = useAuthStore();
  const { id } = useParams();

  const [errorDeletionMessage, setErrorDeletionMessage] = useState<string>("");
  const [userFeedbackDeletionMessage, setUserFeedbackDeletionMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleDelete = async (): Promise<void> => {
    setErrorDeletionMessage("");
    setUserFeedbackDeletionMessage("");

    try {
      await callApi(`/holidaze/venues/${id}`, {
        method: "DELETE",
      });

      let countdown = 3;
      setUserFeedbackDeletionMessage(`Listing deleted successfully. Redirecting in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackDeletionMessage(`Listing deleted successfully. Redirecting in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          toggle();
          navigate(`/user/${userName}`);
        }
      }, 1000);
    } catch (err) {
      setErrorDeletionMessage("Failed to delete listing.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 z-[100]">
        <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggle}>
          <IoIosClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-green">Are you sure you want to delete this listing?</h2>
        <p className="text-sm mb-6 text-primary-green">This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <SquareBtn disabled={scopedLoader} clickFunc={toggle} type="button" width="full" innerText="No" tail="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
          <SquareBtn disabled={scopedLoader} clickFunc={handleDelete} type="button" width="full" innerText="Yes" tail="hover:bg-danger hover:text-white bg-opacity-50" bgColor="white" textColor="danger" borderColor="danger" />
        </div>
        {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorDeletionMessage ? "text-danger" : "text-primary-green"} text-xs text-center mt-3`}>{errorDeletionMessage || userFeedbackDeletionMessage}</p>}
      </div>
      <div className="absolute h-full w-full bg-black bg-opacity-75 z-[0]" onClick={toggle}></div>
    </div>
  );
}
