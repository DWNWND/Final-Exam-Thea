export default function ErrorFallback({ errorMessage }) {
  return (
    <div>
      <p className="text-danger text-center">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>
      <p className="text-danger text-center">Error: {errorMessage}</p>
    </div>
  );
}
