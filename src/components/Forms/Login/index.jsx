import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import StringInput from "../../Inputs/String";
import RoundBtn from "../../Buttons/RoundBtn";
import { useState } from "react";
import SmallLoader from "../../SmallLoader";
import { useSearchStore, useNavigationStore, useAuthStore } from "../../../stores";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const { userName } = useAuthStore();
  const navigate = useNavigate();
  const { selectedVenue } = useSearchStore();
  const getLastPreviousRoute = useNavigationStore((state) => state.getLastPreviousRoute);
  const lastPreviousRoute = getLastPreviousRoute();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setErrorMessage("");
    const result = await login(data.email, data.password);

    if (!loading && !error && result.success) {
      if (selectedVenue && lastPreviousRoute === `/venue/${selectedVenue.id}`) {
        navigate("/booking/details");
      } else {
        navigate("/user/" + userName);
      }
    } else if (!result.success) {
      if (result.error.statusCode === 401 || result.error.statusCode === 400) {
        setErrorMessage("Wrong email or password");
      }
      if (result.error.statusCode === 404) {
        setErrorMessage("User not found");
      }
      if (result.error.statusCode === 500) {
        setErrorMessage("Server error, please try again later");
      }
      if (result.error.statusCode !== 400 && result.error.statusCode !== 401 && result.error.statusCode !== 404 && result.error.statusCode !== 500) {
        setErrorMessage("Unknown error, please try again later");
      }

      console.log("Login failed:", result.error || error);
      console.log("error code", result.error.statusCode);
    }
  };

  return (
    <div className="mx-auto w-full flex items-center flex-col max-w-[50rem] m-4 p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" register={register} setErrorMessage={setErrorMessage} errorMessage={errors.email && errors.email.message} trigger={trigger} watch={watch} />
        <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} setErrorMessage={setErrorMessage} errorMessage={errors.password && errors.password.message} trigger={trigger} watch={watch} />
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Login" bgColor="primary-green" textColor="white" />
        </div>
      </form>
      {loading ? <SmallLoader /> : <p className="text-danger text-xs mt-3">{errorMessage && errorMessage}</p>}
      <Link to="/#" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Forgot your password?
      </Link>
      <Link to="/register" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Register new user
      </Link>
    </div>
  );
}
