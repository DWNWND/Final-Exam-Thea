export default function SelectBtns({ filters, setFilters }) {
  return (
    <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start">
      <button onClick={() => setFilters("unique")} className={`${filters == "unique" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        <h2>Unique bookings</h2>
      </button>
      <button onClick={() => setFilters("luxury")} className={`${filters == "luxury" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        <h2>Luxury stays</h2>
      </button>
      <button onClick={() => setFilters("rating")} className={`${filters == "rating" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        <h2>Top rated properties</h2>
      </button>
    </div>
  );
}
