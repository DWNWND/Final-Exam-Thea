import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import StringInput from "../../Inputs/String";
import RoundBtn from "../../Buttons/RoundBtn";

// Validation schema
// remeber to implement validation on email etc.
const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const { setIsLoggedIn, userName } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);

    // Check if there was an error
    if (!loading && !error && result.success) {
      // Assume login returns an object with a success property
      setIsLoggedIn(true);
      navigate("/user/" + userName);
    } else if (error) {
      // Handle error feedback if necessary (optional)
      console.error("Login failed:", result.error || error); // Log error for debugging
    }
  };

  //add more levels of userFeedback for the different errorcodes

  return (
    <div className="max-w-md mx-auto px-8 pb-8 pt-16 mb-4 h-svh flex items-center flex-col justify-center">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" error={errors.email} register={register} errorMessage={errors.email && errors.email.message} />
        <StringInput type="password" id="password" label="Password" placeholder="• • • • • • •" error={errors.password} register={register} errorMessage={errors.password && errors.password.message} />
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Login" bgColor="primary-green" textColor="white" />
        </div>
      </form>
      <p className="text-danger text-xs mt-3">{error && error.message}</p>
      <Link to="/#" className=" w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Forgot your password?
      </Link>
      <Link to="/register" className=" w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Register new user
      </Link>
    </div>
  );
}
