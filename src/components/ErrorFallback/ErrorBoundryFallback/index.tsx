import { FallbackProps } from "react-error-boundary";

export default function ErrorBoundryFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div className="bg-white max-w-[50rem] flex flex-col align-center justify-center mx-auto mt-10 gap-4 rounded-lg p-4 min-m-2 h-full">
      <p className="text-center text-lg">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>
      <p className="text-danger italic w-full bg-desatBlue p-4 text-center rounded-lg">{error.message}</p>
    </div>
  );
}

// export default function ErrorFallback({ errorMessage }) {
//   return (
//     <div className="bg-white max-w-[50rem] flex flex-col align-center justify-center mx-auto  mt-10 gap-4 rounded-lg p-4 min-m-2 h-full">
//       <p className="text-center text-lg">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>
//       {errorMessage && <p className=" text-danger italic w-full bg-desatBlue p-4 text-center rounded-lg">{errorMessage}</p>}
//     </div>
//   );
// }
