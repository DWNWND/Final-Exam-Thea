import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import {StringInput} from "../../Inputs";
import { RoundBtn } from "../../Buttons";
import { useEffect } from "react";
import { SmallSpinnerLoader } from "../../Loaders";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { scopedLoader, error, setError, callApi } = useApiCall();
  const { setAccessToken, setUserName } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) });

  const emailField = watch("email");
  const passwordField = watch("password");

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [emailField, passwordField]);

  const onSubmit = async (data) => {
    setError("");
    const { email, password } = data;
    const result = await callApi(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(result.data.accessToken);
    setUserName(result.data.name);
  };

  return (
    <div className="mx-auto w-full flex items-center flex-col max-w-[50rem] m-4 p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" register={register} errorMessage={errors.email && errors.email.message} trigger={trigger} watch={watch} />
        <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" register={register} errorMessage={errors.password && errors.password.message} trigger={trigger} watch={watch} />
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Login" bgColor="primary-green" textColor="white" />
        </div>
      </form>
      {scopedLoader ? <SmallSpinnerLoader /> : <p className="text-danger text-xs text-center mt-3">{error && error}</p>}
      <Link to="/#" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Forgot your password?
      </Link>
      <Link to="/register" className=" w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Register new user
      </Link>
    </div>
  );
}
