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

      <div className="flex flex-col gap-6 md:flex-row md:gap-20 md:justify-evenly">
        {openMoreFilters && (
          <>
            <div className="flex flex-col gap-2 md:pb-10">
              <div className="text-primary-green uppercase font-semibold text-lg">Filters</div>
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
                <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                  <div className="flex items-center">
                    <input type="checkbox" id="freeWifi" className="h-6 w-6" onChange={(e) => setValue("freeWifi", e.target.checked)} />
                    <label htmlFor="freeWifi" className="ml-2 text-nowrap text-black">
                      Free wifi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="freeParking" type="checkbox" className="h-6 w-6" onChange={(e) => setValue("freeParking", e.target.checked)} />
                    <label htmlFor="freeParking" className="ml-2 text-nowrap text-black">
                      Free parking
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                  <div className="flex items-center">
                    <input id="petsAllowed" type="checkbox" className="h-6 w-6 " onChange={(e) => setValue("petsAllowed", e.target.checked)} />
                    <label htmlFor="petsAllowed" className="ml-2 text-nowrap text-black">
                      Pets allowed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="freeBreakfast" type="checkbox" className="h-6 w-6" onChange={(e) => setValue("freeBreakfast", e.target.checked)} />
                    <label htmlFor="freeBreakfast" className="ml-2 text-nowrap text-black">
                      Breakfast included
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:pb-10">
              <div className="text-primary-green uppercase font-semibold text-lg">Price range /night</div>
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input id="priceRange1" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange1", { start: 0, end: 100 })} />
                    <label htmlFor="priceRange1" className="ml-2 text-nowrap text-black">
                      kr 0 - 100
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="priceRange2" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange2", { start: 100, end: 150 })} />
                    <label htmlFor="priceRange2" className="ml-2 text-nowrap text-black">
                      kr 100 - 150
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input id="priceRange3" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange3", { start: 150, end: 200 })} />
                    <label htmlFor="priceRange3" className="ml-2 text-nowrap text-black">
                      kr 150 - 200
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input id="priceRange4" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange4", { start: 200, end: 250 })} />
                    <label htmlFor="priceRange4" className="ml-2 text-nowrap text-black">
                      kr 200 - 250
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input id="priceRange5" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange5", { start: 250, end: 300 })} />
                    <label htmlFor="priceRange5" className="ml-2 text-nowrap text-black">
                      kr 250 - 300
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="priceRange6" type="checkbox" className="h-6 w-6" onChange={() => setValue("priceRange6", { start: 350, end: 400 })} />
                    <label htmlFor="priceRange6" className="ml-2 text-nowrap text-black">
                      kr 350 - 400
                    </label>
                  </div>
                </div>
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
