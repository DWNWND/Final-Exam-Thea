import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { StringInput } from "../../Inputs";
import { RoundBtn } from "../../Buttons";
import { useEffect } from "react";
import { SmallSpinnerLoader } from "../../Loaders";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import { useBookingDataStore, useNavigationStore } from "../../../stores";

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { scopedLoader, error, setError, callApi } = useApiCall();
  const { setAccessToken, setUserName } = useAuthStore();
  const { getLastPreviousRoute } = useNavigationStore();
  const { selectedListing } = useBookingDataStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<LoginFormInputs>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  // const emailField = watch("email");
  // const passwordField = watch("password");

  // useEffect(() => {
  //   if (error && (emailField || passwordField)) {
  //     setError("");
  //   }
  // }, [emailField, passwordField, error, setError]);

  const onSubmit = async (data: LoginFormInputs) => {
    setError("");
    const { email, password } = data;

    try {
      const result = await callApi(`/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAccessToken(result.data.accessToken);
      setUserName(result.data.name);

      const lastPreviousRoute = getLastPreviousRoute();

      if (selectedListing && lastPreviousRoute && lastPreviousRoute.includes(`/listing/${selectedListing.id}`)) {
        navigate("/booking/details");
      } else {
        navigate("/user/" + result.data.name);
      }
    } catch (apiError: any) {
      // console.log("errorrooror", apiError);
      // setError(apiError.message || "Login failed");
      // console.log("errorroorojfjfjfr", error);
    }
  };

  return (
    <div className="mx-auto w-full flex items-center flex-col max-w-[50rem] m-4 p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label htmlFor="email" className="block text-primary-green mb-2">
            Email address
          </label>
          <input disabled={scopedLoader} placeholder="example@example.com" type="text" id="email" {...register("email")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.email?.message && "border-danger"}`} />
          {errors.email?.message && <p className="text-danger text-xs mt-2">{errors.email?.message}</p>}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-primary-green mb-2">
            Password
          </label>
          <input disabled={scopedLoader} placeholder="• • • • • • •" type="password" id="password" {...register("password")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.password?.message && "border-danger"}`} />
          {errors.password?.message && <p className="text-danger text-xs mt-2">{errors.password?.message}</p>}
        </div>

        {/* <StringInput disabled={scopedLoader} type="email" id="email" label="Email address" placeholder="example@example.com" register={register} errorMessage={errors.email?.message} trigger={trigger} watch={watch} />
        <StringInput disabled={scopedLoader} type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} errorMessage={errors.password?.message} trigger={trigger} watch={watch} /> */}
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Login" bgColor="primary-green" textColor="white" disabled={scopedLoader} />
        </div>
      </form>
      {scopedLoader ? <SmallSpinnerLoader /> : <p className="text-danger text-xs text-center mt-3">{error}</p>}
      <Link to="/#" className="w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Forgot your password?
      </Link>
      <Link to="/register" className="w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Register new user
      </Link>
    </div>
  );
}

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Link } from "react-router-dom";
// import { StringInput } from "../../Inputs";
// import { RoundBtn } from "../../Buttons";
// import { useEffect } from "react";
// import { SmallSpinnerLoader } from "../../Loaders";
// import { useAuthStore } from "../../../stores";
// import { useApiCall } from "../../../hooks";
// import { useNavigate } from "react-router-dom";
// import { useBookingDataStore, useNavigationStore } from "../../../stores";

// const loginSchema = yup.object().shape({
//   email: yup.string().required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

// export default function LoginForm() {
//   const { scopedLoader, error, setError, callApi } = useApiCall();
//   const { setAccessToken, setUserName } = useAuthStore();
//   const { getLastPreviousRoute } = useNavigationStore();
//   const { selectedListing } = useBookingDataStore();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     watch,
//   } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) });

//   const emailField = watch("email");
//   const passwordField = watch("password");

//   useEffect(() => {
//     if (error && (emailField || passwordField)) {
//       setError("");
//     }
//   }, [emailField, passwordField, error, setError]);

//   const onSubmit = async (data) => {
//     setError("");
//     const { email, password } = data;
//     try {
//       const result = await callApi(`/auth/login`, {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       });
//       setAccessToken(result.data.accessToken);
//       setUserName(result.data.name);

//       const lastPreviousRoute = getLastPreviousRoute();

//       if (selectedListing && lastPreviousRoute && lastPreviousRoute.includes(`/listing/${selectedListing.id}`)) {
//         navigate("/booking/details");
//       } else {
//         navigate("/user/" + result.data.name);
//       }
//     } catch (apiError) {
//       setError(apiError.message || "Login failed");
//     }
//   };

//   return (
//     <div className="mx-auto w-full flex items-center flex-col max-w-[50rem] m-4 p-8 bg-white rounded-lg shadow-sm">
//       <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
//       <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
//         <StringInput disabled={scopedLoader} type="email" id="email" label="Email address" placeholder="example@example.com" register={register} errorMessage={errors.email && errors.email.message} trigger={trigger} watch={watch} />
//         <StringInput disabled={scopedLoader} type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} errorMessage={errors.password && errors.password.message} trigger={trigger} watch={watch} />
//         <div className="flex items-center justify-between">
//           <RoundBtn type="submit" innerText="Login" bgColor="primary-green" textColor="white" disabled={scopedLoader} />
//         </div>
//       </form>
//       {scopedLoader ? <SmallSpinnerLoader /> : <p className="text-danger text-xs text-center mt-3">{error && error}</p>}
//       <Link to="/#" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
//         Forgot your password?
//       </Link>
//       <Link to="/register" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
//         Register new user
//       </Link>
//     </div>
//   );
// }
