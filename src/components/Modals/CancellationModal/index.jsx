import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";

export function CancellationModal({ booking, toggle }) {
  const { callApi, scopedLoader } = useApiCall();

  const [userFeedbackCancellationMessage, setUserFeedbackCancellationMessage] = useState("");
  const [errorCancellationMessage, setErrorCancellationMessage] = useState("");

  const handleCancellation = async () => {
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
      console.log("error:", err);
      setErrorCancellationMessage("Cancellation failed: " + error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 relative">
        <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={() => handleExitCancellation()}>
          <IoIosClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-blue">Are you sure you want to cancel your booking at {booking.name}?</h2>
        <p className="text-sm mb-6 text-primary-blue">This action cannot be undone.</p>
        <div className="flex justify-end gap-4 mb-5">
          <SquareBtn clickFunc={() => toggle()} type="button" width="full" innerText="No" tailw="hover:bg-primary-blue hover:text-white" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
          <SquareBtn clickFunc={() => handleCancellation()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white" bgColor="white" textColor="danger" borderColor="danger" />
        </div>
        {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorCancellationMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorCancellationMessage ? errorCancellationMessage : userFeedbackCancellationMessage}</p>}
      </div>
    </div>
  );
}
