import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import LoginBg from "../assets/login-bg.png";
import ButtonComponent from "../components/button";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../operations/mutations";
import { useSendAlert } from "../components/send-alert";
import BusyOverlay from "../components/BusyOverlay";

const LoginPage = () => {
  const { mutate, data, isLoading, isError } = useLoginUserMutation();

  const sendAlert = useSendAlert();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("What is your email address?"),
    password: yup
      .string()
      .min(8, "Please enter a password that is longer than 8 characters")
      .required("Please enter your password"),
  });

  const { errors, values, validateForm, handleSubmit, handleChange } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        validateForm(values).then((errors) => {
          mutate(values);

          setLoading(false);
        });
      },
    });

  useEffect(() => {
    if (data) {
      sendAlert("Login successful!", "success");
      navigate("/profile");
    }
    if (!isLoading && isError) {
      sendAlert("Something wrong happened!", "error");
    }
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (values.email && values.password) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [values, loading]);
  return (
    <div>
      <BusyOverlay loading={isLoading} />

      <div>
        <img src={LoginBg} alt="" />
        <div className="bg-white p-10">
          <h2 className="text-orange-400 font-bold text-xl mb-5">Log in</h2>
          <p className="text-gray-200 text-sm mb-10">
            Login to your profile to request meal.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-10 ">
              <label
                for="email"
                className="form-label font-medium text-13 text-left  text-gray-100"
              >
                Email/ Admin ID
              </label>
              <div className="relative mt-5">
                <input
                  type="text"
                  className="form-control
                  block
                  w-full
                  px-4
                  py-1.5
                  h-53
                  text-10
                  text-dark-100
                  invalid:border-orange-400
                  bg-white bg-clip-padding
                  border border-solid border-gray-200
                  rounded
                  transition
                  ease-in-out
                  shadow-lg
                  m-0
                  focus:text-dark-100 focus:bg-white focus:border-orange-400 focus:outline-none placeholder:text-gray-200"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(errors.email)}
                  aria-describedby="email"
                  placeholder="name@gmail.com"
                />
              </div>

              <small id="email" className="block mt-1 text-xs text-red-600">
                {errors.email}
              </small>
            </div>
            <div className="form-group mb-6 ">
              <label
                for="password"
                className="form-label font-medium text-13 text-left  text-gray-100"
              >
                Password
              </label>
              <div className="relative mt-5">
                <input
                  type="password"
                  className="form-control
                  block
                  w-full
                  px-4
                  py-1.5
                  h-53
                  text-10
                  text-dark-100
                  invalid:border-orange-400
                  bg-white bg-clip-padding
                  border border-solid border-gray-200
                  rounded
                  transition
                  ease-in-out
                  shadow-lg
                  m-0
                  focus:text-dark-100 focus:bg-white focus:border-orange-400 focus:outline-none placeholder:text-gray-200"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(errors.password)}
                  aria-describedby="password"
                  placeholder="Write your password"
                />
              </div>

              <small id="email" className="block mt-1 text-xs text-red-600">
                {errors.password}
              </small>
            </div>
            <div className="w-full mt-14">
              <ButtonComponent
                fullWidth
                btnText="Proceed"
                disabled={loading}
                //   callToAction={null}
              />
            </div>
            <div className="text-center text-gray-200 text-10 mt-6">
              Your info is safely secured
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
