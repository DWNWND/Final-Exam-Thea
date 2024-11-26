import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FieldValues, UseFormRegister, UseFormTrigger, UseFormWatch } from "react-hook-form";

interface StringInputProps {
  type: string;
  id: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  setErrorMessage?: (message: string) => void;
  errorMessage?: string;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}

export function StringInput({ type, id, label, placeholder, defaultValue = "", setErrorMessage = () => {}, errorMessage, register, trigger }: StringInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isTextarea = id === "description";

  const handleBlur = async () => {
    setErrorMessage(""); // Clear error when typing
    await trigger(id); // Trigger validation on blur
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-primary-green mb-2">
        {label}
      </label>
      {isTextarea ? (
        <textarea id={id} placeholder={placeholder} {...register(id)} defaultValue={defaultValue} onBlur={handleBlur} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorMessage && "border-danger"}`} rows={4} />
      ) : (
        <>
          <input placeholder={placeholder} type={showPassword && type === "password" ? "text" : type} id={id} {...register(id)} defaultValue={defaultValue} onBlur={handleBlur} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorMessage && "border-danger"}`} />
          {type === "password" && (
            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-8 cursor-pointer text-primary-green h-9 w-9 flex items-center justify-center">
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          )}
        </>
      )}
      {errorMessage && <p className="text-danger text-xs mt-2">{errorMessage}</p>}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FieldValues, UseFormRegister, UseFormTrigger, UseFormWatch } from "react-hook-form";

// interface StringInputProps {
//   type: string;
//   id: string;
//   label: string;
//   placeholder: string;
//   defaultValue?: string;
//   setErrorMessage?: (message: string) => void;
//   errorMessage?: string;
//   register: UseFormRegister<FieldValues>;
//   trigger: UseFormTrigger<FieldValues>;
//   watch: UseFormWatch<FieldValues>;
// }

// export function StringInput({ type, id, label, placeholder, defaultValue = "", setErrorMessage = () => {}, errorMessage, register, trigger, watch }: StringInputProps) {
//   const [showPassword, setShowPassword] = useState(false);
//   const isTextarea = id === "description";

//   const currentValue = watch(id);

//   useEffect(() => {
//     setErrorMessage("");
//     if (currentValue) {
//       trigger(id);
//     }
//   }, [currentValue, trigger, id, setErrorMessage]);

//   return (
//     <div className="relative">
//       <label htmlFor={id} className="block text-primary-green mb-2">
//         {label}
//       </label>
//       {isTextarea ? (
//         <textarea id={id} placeholder={placeholder} {...register(id)} defaultValue={defaultValue} className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorMessage && "border-danger"}`} rows={4} />
//       ) : (
//         <>
//           <input placeholder={placeholder} type={showPassword && type === "password" ? "text" : type} id={id} {...register(id)} defaultValue={defaultValue} className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorMessage && "border-danger"}`} />
//           {type === "password" && (
//             <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-8 cursor-pointer text-primary-green h-9 w-9 flex items-center justify-center">
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </div>
//           )}
//         </>
//       )}
//       {errorMessage && <p className="text-danger text-xs mt-2">{errorMessage}</p>}
//     </div>
//   );
// }
