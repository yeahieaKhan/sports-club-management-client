import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contextApi/AuthContext";
import axios from "axios";
import Logo from "../pages/sharedPages/Logo";

const Login = () => {
  const { userLogin, user, goolgeLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(data);
    userLogin(data.email, data.password)
      .then(async (result) => {
        // user data update in database

        const user = result.user;
        console.log(user);
        const userInfo = {
          email: user.email,
          role: "user",
          created_At: new Date().toISOString(),
          last_logg_in: new Date().toDateString(),
        };

        await axios
          .post("http://localhost:8000/users", userInfo)
          .then((res) => {
            console.log("Inserted response", res.data);
          })
          .catch((error) => {
            console.log("something went", error);
          });

        console.log("User login successfully", result);
        navigate("/");
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const handleGoogleLogin = () => {
    goolgeLogin()
      .then(async (res) => {
        console.log("google login successfully");
        // user data update in database
        const user = res.user;
        console.log(user);
        const userInfo = {
          email: user.email,
          role: "user",
          created_At: new Date().toISOString(),
          last_logg_in: new Date().toDateString(),
        };

        await axios
          .post("http://localhost:8000/users", userInfo)
          .then((res) => {
            console.log("Inserted response", res.data);
          })
          .catch((eorror) => {
            console.log("something went", eorror);
          });

        navigate("/");
      })
      .catch((error) => {
        console.log("Something went rong");
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div>
            <Link className="flex items-center max-w-xl" to={"/"}>
              <Logo></Logo>
              <span>Sports Club</span>
            </Link>
          </div>
          <h1 className="text-xl text-center font-bold">User login!</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-700">This field is required</span>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  maxLength: 16,
                  minLength: 6,
                })}
              />
              {errors?.password && (
                <span className="text-red-700">
                  {errors.password.type === "required" &&
                    "This field is required"}
                  {errors.password.type === "minLength" &&
                    "Password must be at least 6 characters"}
                  {errors.password.type === "maxLength" &&
                    "Password must be at most 16 characters"}
                </span>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-secondary mt-4">Login</button>
              <div>
                <p>
                  Register your account ?{" "}
                  <Link
                    to={"/register"}
                    className="text-blue-700 font-bold underline ml-2"
                  >
                    {" "}
                    Register
                  </Link>
                </p>
              </div>

              <div></div>
            </fieldset>
          </form>
          {/* Google */}
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleLogin}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
