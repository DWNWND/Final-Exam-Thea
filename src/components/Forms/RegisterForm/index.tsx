import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useApiCall } from "../../../hooks";
import { RoundBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";
import { useBookingDataStore, useNavigationStore, useAuthStore } from "../../../stores";
import { useEffect } from "react";

const registerSchema = yup.object({
  userName: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface RegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm(): JSX.Element {
  const { scopedLoader, error, setError, callApi } = useApiCall();
  const navigate = useNavigate();
  const { selectedListing } = useBookingDataStore();
  const { getLastPreviousRoute } = useNavigationStore();
  const { setAccessToken, setUserName } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const userNameField = watch("userName");
  const emailField = watch("email");
  const passwordField = watch("password");
  const confirmPasswordField = watch("confirmPassword");

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [userNameField, emailField, passwordField, confirmPasswordField]);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setError("");
      const { userName, email, password } = data;

      await callApi(`/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name: userName, email, password }),
      });

      const resultLogin = await callApi(`/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAccessToken(resultLogin.data.accessToken);
      setUserName(resultLogin.data.name);

      const lastPreviousRoute = getLastPreviousRoute();

      if (selectedListing.id && lastPreviousRoute && lastPreviousRoute.includes(`/listing/${selectedListing.id}`)) {
        navigate("/booking/details");
      } else {
        navigate(`/user/${resultLogin.data.name}`);
      }
    } catch (err) {
      console.log("error regestering in", err);
    }
  };

  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Register new user</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label htmlFor="userName" className="block text-primary-green mb-2">
            Username
          </label>
          <input disabled={scopedLoader} placeholder="Your username" type="text" id="userName" {...register("userName")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.userName?.message && "border-danger"}`} />
          {errors.userName?.message && <p className="text-danger text-xs mt-2">{errors.userName?.message}</p>}
        </div>
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
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-primary-green mb-2">
            Confirm Password
          </label>
          <input disabled={scopedLoader} placeholder="• • • • • • •" type="password" id="confirmPassword" {...register("confirmPassword")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.confirmPassword?.message && "border-danger"}`} />
          {errors.confirmPassword?.message && <p className="text-danger text-xs mt-2">{errors.confirmPassword?.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Register" bgColor="primary-green" textColor="white" disabled={scopedLoader} />
        </div>
      </form>
      {scopedLoader ? <SmallSpinnerLoader /> : <p className="text-danger text-xs text-center mt-3">{error && error}</p>}
      <Link to="/login" className="w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Already have an account?
      </Link>
    </div>
  );
}
