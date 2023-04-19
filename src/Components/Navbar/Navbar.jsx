import React, { useEffect, useState } from "react";
import style from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [islogged, setislogged] = useState(false);

  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setislogged(true);
    } else {
      setislogged(false);
    }
  }, [localStorage.getItem("userToken")]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container">
          <Link className={`navbar-brand ${style.logo}`} to="">
            <img className=" w-100" src={logo} alt="logo" />
            <span className=" text-white">Game Over</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {islogged ? (
              <>
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-color active"
                      aria-current="page"
                      to=""
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link className="nav-link text-color" to="all">
                      All
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link text-color dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Platforms
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/platforms/pc">
                          pc
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/platforms/browser">
                          browser
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link text-color dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort-By
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/sortby/release-date">
                          release-date
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/sortby/popularity">
                          popularity
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/sortby/alphabetical">
                          alphabetical
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/sortby/relevance">
                          relevance
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link text-color dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/Categories/racing">
                          racing
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/sports">
                          sports
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/social">
                          social
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/shooter">
                          shooter
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/open-world">
                          open-world
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/zombie">
                          zombie
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/fantasy">
                          fantasy
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/action-rpg">
                          action-rpg
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/action">
                          action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/flight">
                          flight
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Categories/battle-royale">
                          battle-royale
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      className="nav-link text-color cursor-pointer"
                    >
                      Log Out
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-color" to="login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-color" to="Register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
