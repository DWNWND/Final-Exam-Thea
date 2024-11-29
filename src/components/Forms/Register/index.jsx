import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import StringInput from "../../Inputs/String";
import RoundBtn from "../../Buttons/RoundBtn";
import { useState } from "react";
import SmallLoader from "../../SmallLoader";

// Validation schema for registration
// remeber to implement validation on email etc.
const registerSchema = yup.object().shape({
  userName: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const { registerNewUser, loading, error } = useAuth();
  const { setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(registerSchema) });
  // const login = useAuthStore((state) => state.login);

  const onSubmit = async (data) => {
    console.log("username:", data.userName);
    const result = await registerNewUser(data.userName, data.email, data.password);

    // Check if there was an error
    if (!loading && !error && result.success) {
      // Assume login returns an object with a success property
      navigate("/user/" + data.userName);
    } else if (!result.success) {
      setErrorMessage(result.error.errors[0].message);

      // Handle error feedback if necessary (optional)
      console.log("Register failed:", result.error || error); // Log error for debugging
      console.log("error message", result.error.errors[0].message);
    }
  };

  //add more levels of userFeedback for the different errorcodes
  console.log("errors", error);

  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Register new user</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="userName" label="Username" placeholder="Your username" register={register} errorMessage={errors.userName && errors.userName.message} trigger={trigger} watch={watch} />
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" register={register} errorMessage={errors.email && errors.email.message} trigger={trigger} watch={watch} />
        <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} errorMessage={errors.password && errors.password.message} trigger={trigger} watch={watch} />
        <StringInput type="password" id="confirmPassword" label="Confirm Password" placeholder="• • • • • • •" register={register} errorMessage={errors.confirmPassword && errors.confirmPassword.message} trigger={trigger} watch={watch} />
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Register" bgColor="primary-green" textColor="white" />

          {/* <CtaBtn type="submit" innerText="Register" tailw="mt-4 md:mt-0 rounded-full bg-primary-green" mainCta={true} color={"primary-green"} /> */}
        </div>
      </form>
      {loading ? <SmallLoader /> : <p className="text-danger text-xs mt-3">{errorMessage && errorMessage} </p>}
      <Link to="/login" className="w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Already have an account?
      </Link>
    </div>
  );
}

{
  /* <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} setErrorCode={setErrorCode} errorMessage={errors.password && errors.password.message} trigger={trigger} watch={watch} /> */
}
