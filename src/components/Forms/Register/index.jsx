import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useApiCall } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import {StringInput} from "../../Inputs";
import { RoundBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";
import { useTravelSearchStore, useNavigationStore } from "../../../stores";

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
  const { scopedLoader, error, setError, callApi } = useApiCall();
  const navigate = useNavigate();
  const { selectedVenue } = useTravelSearchStore();
  const getLastPreviousRoute = useNavigationStore((state) => state.getLastPreviousRoute);
  const lastPreviousRoute = getLastPreviousRoute();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(registerSchema) });

  const userNameField = watch("userName");
  const emailField = watch("email");
  const passwordField = watch("password");
  const confirmPasswordField = watch("confirmPassword");

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [userNameField, emailField, passwordField, confirmPasswordField]);

  const onSubmit = async (data) => {
    setError("");
    const { userName: name, email, password } = data;

    const result = await callApi(`/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setAccessToken(result.data.accessToken);
    setUserName(result.data.name);

    if (selectedVenue && lastPreviousRoute === `/venue/${selectedVenue.id}`) {
      navigate("/booking/details");
    } else {
      navigate("/user/" + data.userName);
    }
  };

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
        </div>
      </form>
      {scopedLoader ? <SmallSpinnerLoader /> : <p className="text-danger text-xs text-center mt-3">{error && error}</p>}
      <Link to="/login" className="w-full block underline mt-4 text-primary-green hover:text-primary-blue">
        Already have an account?
      </Link>
    </div>
  );
}
