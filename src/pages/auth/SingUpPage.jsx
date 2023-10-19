import React, { useState } from "react";
import { ErrorBox, FormInput, Logo, SecondaryButton } from "../../components";
import authService from "../../appwrite/auth-service";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  emailRegex,
  firstNameRegex,
  lastNameRegex,
  strongPasswordRegex,
} from "../../constants/regex-constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { login, logout } from "../../store/authSlice";

function SingUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ref = searchParams.get("ref");

  const onRegister = (data) => {
    setAuthError("");
    setLoading(true);
    authService
      .createAccount({ ...data, name: data.firstName + " " + data.lastName })
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
        onSubmit={handleSubmit(onRegister)}
        className="max-w-[500px] px-10 space-y-5 shadow-xl py-20 rounded-2xl"
      >
        <center>
          <Logo className={"h-24 my-4"} />
        </center>

        <h1 className="font-bold text-2xl">Sign up to Dribbble</h1>

        <div className="flex items-center justify-between">
          <FormInput
            label={"First name"}
            placeholder={"John"}
            name={"firstName"}
            register={register}
            pattern={firstNameRegex}
            error={errors.firstName?.message}
          />
          <div className="mx-2" />
          <FormInput
            label={"Last name"}
            placeholder={"john"}
            name={"lastName"}
            register={register}
            pattern={lastNameRegex}
            error={errors.lastName?.message}
          />
        </div>

        <FormInput
          label={"Email"}
          placeholder={"john@exampl.com"}
          type="email"
          name={"email"}
          register={register}
          pattern={emailRegex}
          error={errors.email?.message}
        />
        <FormInput
          label={"Password"}
          placeholder={"5+ characters"}
          type="password"
          name={"password"}
          register={register}
          pattern={strongPasswordRegex}
          error={errors.password?.message}
        />

        <div className="my-5" />

        <SecondaryButton
          title={"Sign Up"}
          loading={loading}
          type="submit"
          className={"w-full p-4"}
        />
        <p className="font-regular text-xs text-slate-600 text-center">
          Already have an account?{" "}
          <Link
            className="text-slate-900 cursor-pointer underline"
            to={routes.login}
          >
            Sign In
          </Link>
        </p>

        {authError.length > 1 && <ErrorBox errorMessage={authError} />}
      </form>
    </div>
  );
}

export default SingUpPage;
