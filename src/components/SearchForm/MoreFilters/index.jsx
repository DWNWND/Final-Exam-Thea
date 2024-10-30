import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSearchStore } from "../../../stores/useSearchStore.js";

export default function MoreFilters({ register, setValue, color, mainSearch }) {
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
                <Checkbox color={color} checked={formData.freeWifi} innerText="Free wifi" id="freeWifi" onChangeFunc={(e) => setValue("freeWifi", e.target.checked)} />
                <Checkbox color={color} checked={formData.freeParking} innerText="Free parking" id="freeParking" onChangeFunc={(e) => setValue("freeParking", e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <Checkbox color={color} checked={formData.petsAllowed} innerText="Pets allowed" id="petsAllowed" onChangeFunc={(e) => setValue("petsAllowed", e.target.checked)} />
                <Checkbox color={color} checked={formData.freeBreakfast} innerText="Breakfast included" id="freeBreakfast" onChangeFunc={(e) => setValue("freeBreakfast", e.target.checked)} />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={formData.price100} innerText="kr 0 - 100" id="priceRange1" onChangeFunc={(e) => setValue("price100", e.target.checked)} />
                <Checkbox color={color} checked={formData.price100to200} innerText="kr 100 - 200" id="priceRange2" onChangeFunc={(e) => setValue("price100to200", e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={formData.price200to300} innerText="kr 200 - 300" id="priceRange3" onChangeFunc={(e) => setValue("price200to300", e.target.checked)} />
                <Checkbox color={color} checked={formData.price300to400} innerText="kr 300 - 400" id="priceRange4" onChangeFunc={(e) => setValue("price300to400", e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={formData.price400to500} innerText="kr 400 - 500" id="priceRange5" onChangeFunc={(e) => setValue("price400to500", e.target.checked)} />
                <Checkbox color={color} checked={formData.price500} innerText="kr 500 - up" id="priceRange6" onChangeFunc={(e) => setValue("price500", e.target.checked)} />
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
