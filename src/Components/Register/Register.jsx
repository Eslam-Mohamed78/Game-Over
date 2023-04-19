import style from "./Register.module.scss";
import gamingImage from "./../../Assets/Images/gaming.ebaf2ffc84f4451d.jpg";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { object, string, ref } from "yup";
import { checkRegister, nullResponse } from "../../Redux/Authentication";
import { toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { response, error, isloading } = useSelector(
    (state) => state.authentication
  );

  // Yup Validation

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name minLength is 3")
      .max(15, "Name maxLength is 15"),
    email: string()
      .required("Email is required")
      .email("InValid Email Address"),
    password: string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase..."
      ),
    rePassword: string()
      .required("rePassword is required")
      .oneOf([ref("password")], "password & rePassword doesn't match"),
    phone: string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be Egyption number"),
  });

  useEffect(() => {
    if (response !== null) {
      navigate("/login");
      dispatch(nullResponse());
      toast.success("Registered Successfully", { duration: 1500 });
    }
  }, [response]);

  async function handleSubmit(values) {
    await dispatch(checkRegister(values)).unwrap();
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Register_Page</title>
      </Helmet>

      <div className="container my-5 rounded-3 overflow-hidden">
        <div className="row">
          <div className=" col-md-6 px-0">
            <div className="h-100">
              <img className="w-100 h-100" src={gamingImage} alt="Gaming" />
            </div>
          </div>

          <div className={`col-md-6 text-center p-5 ${style.logInfo}`}>
            <div>
              <p className=" text-color fs-4 fw-bold mb-0">
                Create My Account !
              </p>

              {error ? <div className="alert alert-danger">{error}</div> : null}

              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className=" form-control my-3"
                  placeholder="Your Name"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger">{formik.errors.name}</div>
                ) : null}

                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className=" form-control"
                  placeholder="Email Address"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger">
                    {formik.errors.email}
                  </div>
                ) : null}

                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className=" form-control my-3"
                        placeholder="Password"
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div className="alert alert-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div>
                      <input
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                        className=" form-control my-3"
                        placeholder="rePassword"
                      />
                      {formik.errors.rePassword && formik.touched.rePassword ? (
                        <div className="alert alert-danger">
                          {formik.errors.rePassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className=" form-control mb-3"
                  placeholder="Your Phone"
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger">
                    {formik.errors.phone}
                  </div>
                ) : null}

                {isloading ? (
                  <div>
                    <button type="button" className="btn text-white w-100 py-2">
                      <i className="fas fa-spinner fa-spin text-white"></i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="btn text-white w-100 py-2"
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      Create Account
                    </button>
                  </div>
                )}

                <p className={`mb-0 mt-2 ${style.policy}`}>
                  This site is protected by recaptcha and the Google
                  <Link
                    className=" text-decoration-none text-info"
                    to="https://policies.google.com/privacy"
                  >
                    &nbsp;Privacy Policy&nbsp;
                  </Link>
                  and
                  <Link
                    className=" text-decoration-none text-info"
                    to="https://policies.google.com/terms"
                  >
                    &nbsp;Terms of Service&nbsp;
                  </Link>
                  apply.
                </p>
              </form>

              <div className="mt-3">
                Already a member ?
                <Link className="text-info text-decoration-none" to="/login">
                  &nbsp;Log In<i className="fa-solid fa-angles-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
