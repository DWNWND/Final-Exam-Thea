import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";

interface SelectedBooking {
  name: string;
  id: string;
}

interface CancellationModalProps {
  booking: SelectedBooking | null;
  toggle: () => void;
}

export function CancellationModal({ booking, toggle }: CancellationModalProps): JSX.Element {
  const { callApi, scopedLoader } = useApiCall();

  const [userFeedbackCancellationMessage, setUserFeedbackCancellationMessage] = useState<string>("");
  const [errorCancellationMessage, setErrorCancellationMessage] = useState<string>("");

  const handleCancellation = async (): Promise<void> => {
    if (!booking) return;

    setErrorCancellationMessage("");
    setUserFeedbackCancellationMessage("");
    try {
      await callApi(`/holidaze/bookings/${booking.id}`, {
        method: "DELETE",
      });

      let countdown = 3;
      setUserFeedbackCancellationMessage(`Booking successfully cancelled. Redirecting in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackCancellationMessage(`Booking successfully cancelled. Redirecting in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          toggle();
        }
      }, 1000);
    } catch (error) {
      setErrorCancellationMessage(`Cancellation failed: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {booking && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 relative">
          <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggle}>
            <IoIosClose />
          </button>
          <h2 className="text-xl font-bold mb-4 text-primary-blue">Are you sure you want to cancel your booking at {booking.name}?</h2>
          <p className="text-sm mb-6 text-primary-blue">This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <SquareBtn disabled={scopedLoader} clickFunc={toggle} type="button" width="full" innerText="No" tail="hover:bg-primary-blue hover:text-white" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
            <SquareBtn disabled={scopedLoader} clickFunc={handleCancellation} type="button" width="full" innerText="Yes" tail="hover:bg-danger hover:text-white" bgColor="white" textColor="danger" borderColor="danger" />
          </div>
          {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorCancellationMessage ? "text-danger" : "text-primary-green"} text-xs text-center mt-3`}>{errorCancellationMessage || userFeedbackCancellationMessage}</p>}
        </div>
      )}
    </div>
  );
}
