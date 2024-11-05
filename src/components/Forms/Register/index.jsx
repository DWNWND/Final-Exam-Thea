import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import StringInput from "../../Inputs/String";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // const login = useAuthStore((state) => state.login);

  const onSubmit = (data) => {
    console.log("username:", data.userName);
    registerNewUser(data.userName, data.email, data.password);

    if (!loading && !error) {
      setIsLoggedIn(true);
      navigate("/" + data.userName);
    }
  };

  //add more levels of userFeedback for the different errorcodes
  console.log("errors", error);

  return (
    <div className="max-w-md mx-auto px-8 pt-16 pb-8 mb-4  h-svh flex items-center flex-col justify-center">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Register new user</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="userName" label="Username" placeholder="Your username" error={errors.userName} register={register} errorMessage={errors.userName && errors.userName.message} />
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" error={errors.email} register={register} errorMessage={errors.email && errors.email.message} />
        <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" error={errors.password} register={register} errorMessage={errors.password && errors.password.message} />
        <StringInput type="password" id="confirmPassword" label="Confirm Password" placeholder="• • • • • • •" error={errors.confirmPassword} register={register} errorMessage={errors.confirmPassword && errors.confirmPassword.message} />
        <div className="flex items-center justify-between">
          <CtaBtn type="submit" innerText="Register" tailw="mt-4 md:mt-0 rounded-full bg-primary-green" mainCta={true} color={"primary-green"} />
        </div>
      </form>
      <Link to="/login" className="w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Already have an account? Login
      </Link>
    </div>
  );
}
