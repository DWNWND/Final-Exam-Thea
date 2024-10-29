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

      <div className="flex flex-col gap-6">
        {openMoreFilters && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-primary-green uppercase font-semibold text-lg">Filters</div>
              <div className="flex items-center">
                <input id="freeWifi" type="checkbox" className="h-6 w-6" onChange={() => setValue("freeWifi", true)} />
                <label for="freeWifi" className="ml-2">
                  Free wifi
                </label>
              </div>
              <div className="flex items-center">
                <input id="freeParking" type="checkbox" className="h-6 w-6" onChange={() => setValue("freeParking", true)} />
                <label for="freeParking" className="ml-2">
                  Free parking
                </label>
              </div>
              <div className="flex items-center">
                <input id="petsAllowed" type="checkbox" className="h-6 w-6 " onChange={() => setValue("petsAllowed", true)} />
                <label for="petsAllowed" className="ml-2">
                  Pets allowed
                </label>
              </div>
              <div className="flex items-center">
                <input id="freeBreakfast" type="checkbox" className="h-6 w-6" onChange={() => setValue("freeBreakfast", true)} />
                <label for="freeBreakfast" className="ml-2">
                  Breakfast included
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary-green uppercase font-semibold text-lg">Price range /night</div>
              <div className="flex items-center">
                <input id="priceRange1" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange", (0, 50))} />
                <label for="priceRange1" className="ml-2">
                  kr 0 - 50
                </label>
              </div>
              <div className="flex items-center">
                <input id="priceRange2" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange2", (50, 100))} />
                <label for="priceRange2" className="ml-2">
                  kr 50 - 100
                </label>
              </div>
              <div className="flex items-center">
                <input id="priceRange3" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange3", (100, 150))} />
                <label for="priceRange3" className="ml-2">
                  kr 100 - 150
                </label>
              </div>
              <div className="flex items-center">
                <input id="priceRange4" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange4", (150, 200))} />
                <label for="priceRange4" className="ml-2">
                  kr 150 - 200
                </label>
              </div>
              <div className="flex items-center">
                <input id="priceRange5" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange5", (200, 250))} />
                <label for="priceRange5" className="ml-2">
                  kr 200 - 250
                </label>
              </div>
              <div className="flex items-center">
                <input id="priceRange6" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange6", (250, 300))} />
                <label for="priceRange6" className="ml-2">
                  kr 250 - 300
                </label>
              </div>
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
