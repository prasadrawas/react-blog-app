import React, { useState } from "react";
import { ErrorBox, FormInput, Logo, SecondaryButton } from "../../components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import routes from "../../config/routes";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../constants/regex-constants";
import authService from "../../appwrite/auth-service";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ref = searchParams.get("ref");

  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = (data) => {
    setAuthError("");
    setLoading(true);
    authService
      .login(data)
      .then(async (session) => {
        console.log(session);
        if (session) {
          const user = await authService.getCurrentUser();
          if (user) {
            dispatch(login({ user }));
            if (ref) {
              navigate(ref);
            } else {
              navigate(routes.home);
            }
          } else {
            dispatch(logout);
          }
        }
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <form
        onSubmit={handleSubmit(onLogin)}
        className="w-[500px] px-10 space-y-5 shadow-xl py-20 rounded-2xl"
      >
        <center>
          <Logo className={"h-24 my-6"} />
        </center>

        <h1 className="font-bold text-2xl">Login to Dribbble</h1>

        <FormInput
          label={"Email"}
          placeholder={"john@exampl.com"}
          type="email"
          name={"email"}
          register={register}
          pattern={emailRegex}
          error={errors.email?.message}
          className={"w-full"}
        />
        <FormInput
          label={"Password"}
          placeholder={"5+ characters"}
          type="password"
          name={"password"}
          register={register}
          error={errors.password?.message}
          className={"w-full"}
        />

        <div className="my-5" />

        <SecondaryButton
          title={"Login"}
          type="submit"
          loading={loading}
          className={"w-full p-4"}
        />

        <p className="font-regular text-xs text-slate-600 text-center">
          Don't have an account?{" "}
          <Link
            className="text-slate-900 cursor-pointer underline"
            to={`${routes.register}?ref=${ref ? ref : ''}`}
          >
            Sign Up
          </Link>
        </p>

        {authError.length > 1 && <ErrorBox errorMessage={authError} />}
      </form>
    </div>
  );
}
