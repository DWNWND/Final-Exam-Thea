import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSearchStore } from "../../../stores/useSearchStore.js";

export default function MoreFilters({ setValue, color, mainSearch, getValues }) {
  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const { formData } = useSearchStore();

  function handleClick() {
    setOpenMoreFilters(!openMoreFilters);
  }

  return (
    <>
      <div className={`${openMoreFilters && "underline"} w-full justify-center hover:underline cursor-pointer flex items-center text-${color} gap-2`} onClick={() => handleClick()}>
        <span>More filters</span>
        {openMoreFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openMoreFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`flex flex-col gap-6 ${mainSearch && "md:flex-row md:gap-20 md:justify-evenly"}`}>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Filters</div>
            <div className={`flex flex-col gap-2 ${mainSearch && "lg:flex-row lg:gap-6"}`}>
              <div className={`flex flex-col gap-2  xl:flex-row xl:gap-6`}>
                <Checkbox color={color} checked={formData.freeWifi} innerText="Free wifi" id="freeWifi" onChangeFunk={(e) => setValue("freeWifi", e.target.checked)} />
                <Checkbox color={color} innerText="Free parking" id="freeParking" onChangeFunk={(e) => setValue("freeParking", e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <Checkbox
                  color={color}
                  innerText="Pets allowed"
                  id="petsAllowed"
                  checked={formData.petsAllowed}
                  onChangeFunk={(e) => {
                    e.target.checked ? setValue("petsAllowed", false) : setValue("petsAllowed", true);
                  }}
                />
                <Checkbox color={color} innerText="Breakfast included" id="freeBreakfast" onChangeFunk={(e) => setValue("freeBreakfast", e.target.checked)} />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <Checkbox color={color} innerText="kr 0 - 100" id="priceRange1" onChangeFunc={() => setValue("priceRange1", { start: 0, end: 100 })} />
                <Checkbox color={color} innerText="kr 100 - 150" id="priceRange2" onChangeFunc={() => setValue("priceRange2", { start: 100, end: 150 })} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} innerText="kr 150 - 200" id="priceRange3" onChangeFunc={() => setValue("priceRange3", { start: 150, end: 200 })} />
                <Checkbox color={color} innerText="kr 200 - 250" id="priceRange4" onChangeFunc={() => setValue("priceRange4", { start: 200, end: 250 })} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} innerText="kr 250 - 300" id="priceRange5" onChangeFunc={() => setValue("priceRange5", { start: 250, end: 300 })} />
                <Checkbox color={color} innerText="kr 300 - 350" id="priceRange6" onChangeFunc={() => setValue("priceRange6", { start: 300, end: 350 })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Checkbox({ innerText, id, onChangeFunc, color, checked }) {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" className="h-6 w-6 cursor-pointer" onChange={onChangeFunc} defaultChecked={checked} />
      <label htmlFor={id} className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
        {innerText}
      </label>
    </div>
  );
}
