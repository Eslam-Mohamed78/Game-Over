import style from "./Login.module.scss";
import gamingImage from "./../../Assets/Images/gaming.ebaf2ffc84f4451d.jpg";
import gamingLogo from "./../../Assets/Images/logo.png";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, nullResponse } from "../../Redux/Authentication";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { object, string } from "yup";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { response, error, isloading } = useSelector(
    (state) => state.authentication
  );

  // Validation using yup

  const validationSchema = object({
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase..."
      ),
  });

  useEffect(() => {
    if (response !== null) {
      localStorage.setItem("userToken", response.token);
      dispatch(nullResponse()); // set response with null > to avoid error of response in directed page
      navigate("/");
      toast.success("Logged In Successfully", { duration: 1500 });
    }
  }, [navigate, response]);

  async function handleSubmit(values) {
    await dispatch(checkLogin(values)).unwrap();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Login_Page</title>
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
              <img className={style.logo} src={gamingLogo} alt="logo" />
              <p className=" text-color fs-4 fw-bold">Log in to GameOver</p>

              {error ? <div className="alert alert-danger">{error}</div> : null}

              <form onSubmit={formik.handleSubmit}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className=" form-control my-3 py-2"
                  placeholder="Email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger">
                    {formik.errors.email}
                  </div>
                ) : null}

                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className=" form-control my-3 py-2"
                  placeholder="Password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger">
                    {formik.errors.password}
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
                      Login
                    </button>
                  </div>
                )}
              </form>

              <div className="my-3">
                <Link className="text-info text-decoration-none">
                  Forgot Password
                </Link>
              </div>

              <div>
                Not a member yet ?
                <Link className="text-info text-decoration-none" to="/register">
                  &nbsp;Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
