import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function StringInput({ type, id, label, placeholder, error, register, defaultValue, errorMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-primary-green mb-2">
        {label}
      </label>
      <input placeholder={placeholder} type={showPassword && type === "password" ? type : "text"} id={id} defaultValue={defaultValue} {...register(id)} className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && "border-danger"}`} />
      {type === "password" && (
        <div onClick={togglePasswordVisibility} className="absolute right-0 top-8 cursor-pointer text-primary-green h-9 w-9 flex items-center justify-center">
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </div>
      )}
      {error && <p className="text-danger text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}
