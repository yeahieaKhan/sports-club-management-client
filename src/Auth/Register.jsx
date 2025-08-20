import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contextApi/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import Logo from "../pages/sharedPages/Logo";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  console.log(profilePic);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (res) => {
        console.log("Register successfully", res);

        //user info in database

        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString,
        };

        const userRes = await axios.post(
          "http://localhost:8000/users",
          userInfo
        );
        console.log(userRes.data);

        //update user info in firebase
        const profileData = {
          displayName: data.name,
          photoURL: profilePic,
        };
        console.log(profileData);
        updateUserProfile(profileData)
          .then(() => {
            console.log("User profile updated");
          })
          .catch((error) => {
            console.log("Profile update failed", error);
          });
      })
      .catch((error) => {
        console.log("Registration error", error);
      });
    navigate("/");
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbb_image}`,
        formData
      );
      console.log(res.data);
      const url = res.data.data.url;
      setProfilePic(url);
      console.log(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Error", "Image upload failed", "error");
    }
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
          <h1 className="text-xl font-bold text-center">Create Account!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="name"
                className="input"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
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

              <input
                type="file"
                className="input"
                onChange={handleImageUpload}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <div>
                <span>Already have an account?</span>{" "}
                <Link to={"/login"} className="btn btn-link">
                  Login
                </Link>
              </div>
              <button className="btn btn-secondary mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
