export default function ErrorFallback({ error }) {
  return (
    <div role="alert" className="error">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>"{error.message}"</pre>
      <p>Please update your page or try again later.</p>
    </div>
  );
}
