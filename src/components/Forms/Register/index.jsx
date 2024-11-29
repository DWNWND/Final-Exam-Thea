import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto px-8 pt-6 pb-8 mb-4  h-svh flex items-center flex-col justify-center">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Register new user</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-primary-green mb-2">
            Username
          </label>
          <input type="text" id="userName" placeholder="Your username" {...register("userName")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.userName ? "border-danger" : "border-primary-green"}`} />
          {errors.userName && <p className="text-danger text-xs mt-1">{errors.userName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-primary-green mb-2">
            Email address
          </label>
          <input type="email" id="email" placeholder="example@example.com" {...register("email")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-danger" : "border-primary-green"}`} />
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-primary-green mb-2">
            Password
          </label>
          <input type="password" id="password" placeholder="********" {...register("password")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-danger" : "border-primary-green"}`} />
          {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-primary-green mb-2">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" placeholder="********" {...register("confirmPassword")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? "border-danger" : "border-primary-green"}`} />
          {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

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
