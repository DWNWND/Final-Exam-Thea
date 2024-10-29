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
      <div className={`${openMoreFilters && "underline"} w-full justify-center hover:underline cursor-pointer flex items-center text-primary-green gap-2`} onClick={() => handleClick()}>
        <span>More filters</span>
        {openMoreFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openMoreFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-6 md:flex-row md:gap-20 md:justify-evenly">
          <div className="flex flex-col gap-2 md:pb-10">
            <div className="text-primary-green uppercase font-semibold text-lg">Filters</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <Checkbox innerText="Free wifi" id="freeWifi" onChangeFunk={(e) => setValue("freeWifi", e.target.checked)} />
                <Checkbox innerText="Free parking" id="freeParking" onChangeFunk={(e) => setValue("freeParking", e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <Checkbox innerText="Pets allowed" id="petsAllowed" onChangeFunk={(e) => setValue("petsAllowed", e.target.checked)} />
                <Checkbox innerText="Breakfast included" id="freeBreakfast" onChangeFunk={(e) => setValue("freeBreakfast", e.target.checked)} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:pb-10">
            <div className="text-primary-green uppercase font-semibold text-lg">Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <Checkbox innerText="kr 0 - 100" id="priceRange1" onChangeFunk={() => setValue("priceRange1", { start: 0, end: 100 })} />
                <Checkbox innerText="kr 100 - 150" id="priceRange2" onChangeFunk={() => setValue("priceRange2", { start: 100, end: 150 })} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox innerText="kr 150 - 200" id="priceRange3" onChangeFunk={() => setValue("priceRange3", { start: 150, end: 200 })} />
                <Checkbox innerText="kr 200 - 250" id="priceRange4" onChangeFunk={() => setValue("priceRange4", { start: 200, end: 250 })} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox innerText="kr 250 - 300" id="priceRange5" onChangeFunk={() => setValue("priceRange5", { start: 250, end: 300 })} />
                <Checkbox innerText="kr 300 - 350" id="priceRange6" onChangeFunk={() => setValue("priceRange6", { start: 300, end: 350 })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Checkbox({ innerText, id, onChangeFunk }) {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" className="h-6 w-6 cursor-pointer" onChange={onChangeFunk} />
      <label htmlFor={id} className="ml-2 text-nowrap text-black cursor-pointer">
        {innerText}
      </label>
    </div>
  );
}
