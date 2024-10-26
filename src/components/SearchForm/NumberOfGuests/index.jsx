
export default function NumberOfGuests() {
  return (
    <div>
      <label htmlFor="guests">Number of Guests:</label>
      <input type="number" id="guests" name="guests" min="1" max="10" />
      <div>
        <button
          onClick={() => {
            dispatch({ type: "decrement" }), decrease(product);
          }}>
          &#45;
        </button>
        <span>{state.count}</span>
        <button
          onClick={() => {
            dispatch({ type: "increment" }), increase(product);
          }}>
          &#43;
        </button>
      </div>
    </div>
  );
}
