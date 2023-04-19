import React, { useEffect } from "react";
import style from "./SpecificGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificGame } from "../../Redux/appData";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SpecificGame() {
  const { response, isloading } = useSelector((state) => state.appData);
  const dispatch = useDispatch();

  const params = useParams();
  const endPoint = `game?id=${params.id}`;

  async function specificGame() {
    dispatch(getSpecificGame(endPoint));
  }

  // first render the data
  useEffect(() => {
    specificGame();
  }, []);

  // hide image
  function hideImage(event) {
    event.target.parentNode.children[0].classList.add("opacity-0");
    event.target.parentNode.children[1].classList.remove("opacity-0");
  }
  // show image
  function showImage(event) {
    event.target.parentNode.children[0].classList.remove("opacity-0");
    event.target.parentNode.children[1].classList.add("opacity-0");
  }

  var settings = {
    dots: false,
    infinite: true,
    draggble: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
  };

  return (
    <>
      <Helmet>
        <title>SPECIFIC_GAME</title>
      </Helmet>

      {isloading ? (
        <div className="text-center">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url('${response?.thumbnail?.replace(
              "thumbnail",
              "background"
            )}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <div className={`${style.overLay} `}></div>
          <div
            className={`container mb-4 pt-5 ${style.content} position-relative cursor-pointer`}
          >
            <div className="row text-color">
              <div className="col-md-4">
                <div className=" position-relative">
                  <figure
                    onMouseEnter={(event) => hideImage(event)}
                    onMouseLeave={(event) => showImage(event)}
                  >
                    <img
                      className={`rounded-2 w-100 top-0 start-0`}
                      src={response?.thumbnail}
                      alt={response?.title}
                    />
                    <video
                      autoPlay
                      loop
                      className="w-100 pb-0 top-0 opacity-0 position-absolute start-0 rounded-2"
                      preload="auto"
                      muted={true}
                      src={response?.thumbnail?.replace(
                        "thumbnail.jpg",
                        "videoplayback.webm"
                      )}
                    ></video>
                  </figure>

                  <div
                    className={`d-flex align-items-center mb-4 gap-4 mt-3  w-100`}
                  >
                    <button className="btn text-color">FREE</button>
                    <Link
                      className={`btn text-white ${style.playNow} w-100 bg-color`}
                      to={response?.freetogame_profile_url}
                    >
                      PLAY NOW <i className="fa-solid fa-right-to-bracket"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div>
                  <h2 className="fs-1 fw-bold">{response?.title}</h2>

                  <h4>About {response?.title} :</h4>

                  <p className=" fs-5">{response?.description}</p>

                  {response?.screenshots?.length >0 ? (
                    <>
                      <h3>{response?.title} Screenshots :</h3>
                      <Slider
                        {...settings}
                        className=" overflow-hidden text-center my-4"
                      >
                        {response?.screenshots?.map((img) => (
                          <div key={img?.id}>
                            <img
                              className="w-100 cursor-pointer"
                              src={img?.image}
                              alt="banner game"
                            />
                          </div>
                        ))}
                      </Slider>
                    </>
                  ) : null}

                  {response?.minimum_system_requirements ? (
                    <>
                      <h3>Minimum System Requirements :</h3>

                      <ul className=" list-unstyled mt-4">
                        <li className="mb-3">
                          <span className="fw-bold">Graphics :</span>&nbsp;
                          {response?.minimum_system_requirements?.graphics}
                        </li>
                        <li className="mb-3">
                          <span className="fw-bold">Memory :</span>&nbsp;
                          {response?.minimum_system_requirements?.memory}
                        </li>
                        <li className="mb-3">
                          <span className="fw-bold">Os :</span>&nbsp;{" "}
                          {response?.minimum_system_requirements?.os}
                        </li>
                        <li className="mb-3">
                          <span className="fw-bold">Processor :</span>&nbsp;
                          {response?.minimum_system_requirements?.processor}
                        </li>
                        <li className="mb-3">
                          <span className="fw-bold">Storage :</span>&nbsp;
                          {response?.minimum_system_requirements?.storage}
                        </li>
                      </ul>
                    </>
                  ) : null}

                  <h3 className="fw-bold">Additional Information :</h3>

                  <div className="row mt-4">
                    <div className="col-md-4">
                      <p className="mb-1 light-color">Title</p>
                      <p>{response?.title}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="mb-1 light-color">Developer</p>
                      <p>{response?.developer}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="mb-1 light-color">Publisher</p>
                      <p>{response?.publisher}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="mb-1 light-color">Release Date</p>
                      <p>{response?.release_date}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="mb-1 light-color">Genre</p>
                      <p>{response?.genre}</p>
                    </div>

                    <div className="col-md-4">
                      <p className="mb-1 light-color">Platform</p>
                      <p>{response?.platform}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
