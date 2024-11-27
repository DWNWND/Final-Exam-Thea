import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";
import { IoIosClose } from "react-icons/io";

interface DeletionModalProps {
  toggle: () => void;
  id: string;
  userName: string;
}

export function DeletionModal({ toggle, id, userName }: DeletionModalProps): JSX.Element {
  const { callApi, scopedLoader } = useApiCall();

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
      console.error("Error:", err);
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
          <SquareBtn clickFunc={toggle} type="button" width="full" innerText="No" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
          <SquareBtn clickFunc={handleDelete} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white bg-opacity-50" bgColor="white" textColor="danger" borderColor="danger" />
        </div>
        {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorDeletionMessage ? "text-danger" : "text-primary-green"} text-xs text-center mt-3`}>{errorDeletionMessage || userFeedbackDeletionMessage}</p>}
      </div>
      <div className="absolute h-full w-full bg-black bg-opacity-75 z-[0]" onClick={toggle}></div>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useApiCall } from "../../../hooks";
// import { SquareBtn } from "../../Buttons";
// import { SmallSpinnerLoader } from "../../Loaders";
// import { IoIosClose } from "react-icons/io";

// export function DeletionModal({ toggle }) {
//   const { callApi, scopedLoader } = useApiCall();

//   const [errorDeletionMessage, setErrorDeletionMessage] = useState("");
//   const [userFeedbackDeletionMessage, setUserFeedbackDeletionMessage] = useState("");

//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     setErrorDeletionMessage("");
//     setUserFeedbackDeletionMessage("");

//     try {
//       await callApi(`/holidaze/venues/${id}`, {
//         method: "DELETE",
//       });

//       let countdown = 3;
//       setUserFeedbackDeletionMessage(`Listing deleted successfully. Redirecting in ${countdown} seconds...`);

//       const countdownInterval = setInterval(() => {
//         countdown -= 1;
//         if (countdown > 0) {
//           setUserFeedbackDeletionMessage(`Listing deleted successfully. Redirecting in ${countdown} seconds...`);
//         } else {
//           clearInterval(countdownInterval);
//           toggle();
//           navigate(`/user/${userName}`);
//         }
//       }, 1000);
//     } catch (err) {
//       console.log("error:", err);
//       setErrorDeletionMessage("Failed to delete listing.");
//     }
//   };
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-[100]">
//       <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 z-[100]">
//         <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggle}>
//           <IoIosClose />
//         </button>
//         <h2 className="text-xl font-bold mb-4 text-primary-green">Are you sure you want to delete this listing?</h2>
//         <p className="text-sm mb-6 text-primary-green">This action cannot be undone.</p>
//         <div className="flex justify-end gap-4">
//           <SquareBtn clickFunc={() => toggle()} type="button" width="full" innerText="No" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
//           <SquareBtn clickFunc={() => handleDelete()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white bg-opacity-50" bgColor="white" textColor="danger" borderColor="danger" />
//         </div>
//         {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorDeletionMessage ? "text-danger" : "text-primary-green"} text-xs text-center mt-3`}>{errorDeletionMessage ? errorDeletionMessage : userFeedbackDeletionMessage}</p>}
//       </div>
//       <div className="absolute h-full w-full bg-black bg-opacity-75 z-[0]" onClick={() => toggle()}></div>
//     </div>
//   );
// }
