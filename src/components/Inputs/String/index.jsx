import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function StringInput({ type, id, label, placeholder, errors, register, defaultValue }) {
  const [showPassword, setShowPassword] = useState(false);
  const isTextarea = id === "description";

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Handle input change event to clear the error if the value is valid
  const handleChange = () => {
    // clearErrors(id);
  };

  console.log("error stringinput", errors);

  // const validError = Object.keys(error).length > 0;
  // console.log("valid error", validError);

  // // Recursively fetch nested error messages
  // const getNestedErrorMessage = (errorObj) => {
  //   console.log("error obj", errorObj);
  //   if (!errorObj) return "";

  //   // Check if there is a message at this level
  //   if (errorObj.message) return errorObj.message;

  //   // If the error is nested, search deeper
  //   for (const key in errorObj) {
  //     if (errorObj[key]) {
  //       console.log("error obj key", errorObj[key]);
  //       return getNestedErrorMessage(errorObj[key]);
  //     }
  //   }

  //   return "";
  // };

  // useEffect(() => {
  //   console.log("error message", error.message);

  //   if (validError && !error.message) {
  //     console.log("error test", error);
  //     if (error.location) {
  //       console.log("errror key", Object.keys(error.location));
  //       console.log("error location", error.location);
  //     }
  //   }
  //   // If there is an error, set the error message
  //   if (validError && error.message) {
  //     setErrorMessage(error.message);
  //   } else if (!validError) {
  //     setErrorMessage("");
  //   }

  //   // Extract the error message (supports nested errors)
  //   const nestedErrorMessage = getNestedErrorMessage(error);
  //   console.log("nested error message", nestedErrorMessage);
  //   setNestedErrorMessage(nestedErrorMessage);
  // }, [error]);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-primary-green mb-2">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id)} // Registers the field with react-hook-form
          onChange={handleChange} // Trigger validation on change
          className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors && "border-danger"}`}
          rows={4}
        />
      ) : (
        <>
          <input
            placeholder={placeholder}
            type={showPassword && type === "password" ? "text" : type}
            id={id}
            defaultValue={defaultValue}
            {...register(id)} // Registers the field with react-hook-form
            onChange={handleChange} // Trigger validation on change
            className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors && "border-danger"}`}
          />
          {type === "password" && (
            <div onClick={togglePasswordVisibility} className="absolute right-0 top-8 cursor-pointer text-primary-green h-9 w-9 flex items-center justify-center">
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          )}
        </>
      )}
      {errors && <p className="text-danger text-xs mt-2">{errors.message}</p>}
    </div>
  );
}

// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// export default function StringInput({ type, id, label, placeholder, error, register, defaultValue, errorMessage = "", trigger }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const isTextarea = id === "description";

//   console.log("error stringinput", error);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   // On input change, trigger validation for the specific field
//   const handleChange = async (e) => {
//     // Trigger validation for this field (id)
//     await trigger(id);
//   };

//   return (
//     <div className="relative">
//       <label htmlFor={id} className="block text-primary-green mb-2">
//         {label}
//       </label>
//       {isTextarea ? (
//         <textarea
//           id={id}
//           placeholder={placeholder}
//           defaultValue={defaultValue}
//           {...register(id)}
//           className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`} // Add resize-none to prevent resizing
//           rows={4}
//           onChange={handleChange} // Specify the number of rows for the textarea
//         />
//       ) : (
//         <>
//           <input placeholder={placeholder} type={showPassword && type === "password" ? "text" : type} id={id} defaultValue={defaultValue} {...register(id)} onChange={handleChange} className={`${defaultValue && "focus:border-primary-green active:border-primary-green"} focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && "border-danger"}`} />
//           {type === "password" && (
//             <div onClick={togglePasswordVisibility} className="absolute right-0 top-8 cursor-pointer text-primary-green h-9 w-9 flex items-center justify-center">
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </div>
//           )}
//         </>
//       )}
//       {error && <p className="text-danger text-xs mt-2">{errorMessage || error.message}</p>}
//     </div>
//   );
// }
