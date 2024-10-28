import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function MoreFilters({ register, setValue }) {
  const [openMoreFilters, setOpenMoreFilters] = useState(false);

  function handleClick() {
    setOpenMoreFilters(!openMoreFilters);
  }

  return (
    <>
      <div className="w-full justify-center underline cursor-pointer flex items-center text-primary-green gap-2" onClick={() => handleClick()}>
        <span>More filters</span>
        {openMoreFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      <div className="flex flex-col gap-2">
        {openMoreFilters && (
          <>
            <div className="text-primary-green uppercase font-semibold text-lg">Filters</div>
            <div className="flex items-center">
              <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" onChange={() => setValue("wifi", true)} />
              <label>Free wifi</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" onChange={() => setValue("parking", true)} />
              <label>Free parking</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" onChange={() => setValue("pets", true)} />
              <label>Pets allowed</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" onChange={() => setValue("breakfast", true)} />
              <label>Breakfast included</label>
            </div>
          </>
        )}
      </div>
    </>
  );
}

{
  /* <div className="flex justify-between items-center">
        <h2 className="text-primary-blue">Luxury stays</h2>
        <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" name="luxury" ref={register} onChange={() => setValue("luxury", !getValue("luxury"))} />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-primary-blue">Rating</h2>
        <input type="checkbox" className="form-checkbox h-6 w-6 text-primary-blue" name="rating" ref={register} onChange={() => setValue("rating", !getValue("rating"))} />
      </div> */
}
