import style from "./Home.module.scss";
import banner from "./../../Assets/Images/paladins.b44d33d6e7ee1ba8.png";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { getSpecificGame } from "../../Redux/appData";
import { Link } from "react-router-dom";

export default function Home() {
  const { response, isloading } = useSelector((state) => state.appData);
  const dispatch = useDispatch();
  const [gameCounter, setgameCounter] = useState(3);

  const handleMoreGames = () => {
    setgameCounter(gameCounter + 3); // Update counter to display 20 more games
  };

  let endPoint = `games?category=battle-royale`;

  async function PopularityGames() {
    dispatch(getSpecificGame(endPoint));
  }

  useEffect(() => {
    console.log("HomeGames Mounted");
    PopularityGames();
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

  return (
    <>
      <Helmet>
        <title>Home_Page</title>
      </Helmet>

      <div className={style.banner}>
        <img className={style.bannerImage} src={banner} alt="banner" />

        <div className="container">
          <div className="row">
            <div className={style.caption}>
              <h1>
                Find & track the best
                <span className="text-info"> free-to-play </span>games!
              </h1>
              <p className={style.text}>
                Track what you've played and search for what to play next! Plus
                get free premium loot!
              </p>
              <button className={`${style.browse} btn `}>
                <Link className=" text-decoration-none text-info" to="/all">
                  Browse Games
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

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
        <div className="container my-2">
          <p className="text-color fs-3 fw-bold text-center mb-4">
            <i className="fa-solid fa-robot"></i> Personalized Recommendations
          </p>
          <div className="row gy-4">
            {console.log("response-type", Array.isArray(response))}
            {/* to ensure that the response is not for specificGame */}
            {Array.isArray(response) &&
              response?.slice(0, gameCounter)?.map((game) => (
                <div key={game.id} className="col-md-4 col-sm-6">
                  <Link to={`/specificGame/${game.id}`}>
                    <div className=" rounded-2 overflow-hidden game-card">
                      <div className=" position-relative">
                        <figure
                          className="mb-0"
                          onMouseEnter={(event) => hideImage(event)}
                          onMouseLeave={(event) => showImage(event)}
                        >
                          <img
                            className={`w-100 top-0 start-0`}
                            src={game?.thumbnail}
                            alt={game?.title}
                          />
                          <video
                            autoPlay
                            loop
                            className="w-100 h-100 pb-0 top-0 opacity-0 position-absolute start-0 rounded-2"
                            preload="auto"
                            muted={true}
                            src={game?.thumbnail?.replace(
                              "thumbnail.jpg",
                              "videoplayback.webm"
                            )}
                          ></video>
                        </figure>
                      </div>

                      <div className={`${style.caption} p-3`}>
                        <div className="title d-flex">
                          <p className={`${style.title} mb-0`}>
                            {game.title.length > 15
                              ? game.title.slice(0, 15).concat("...")
                              : game.title}
                          </p>
                          <div className=" ms-auto d-flex align-items-center">
                            <span className="badge bg-color p-2 ms-auto">
                              FREE
                            </span>
                          </div>
                        </div>

                        <p className="my-2">
                          {game.short_description.slice(0, 25)}...
                        </p>

                        <div className={`${style.foot}`}>
                          <i className="fa-solid fa-square-plus"></i>
                          <span className="ms-auto">
                            <span className={style.genre}>{game.genre}</span>
                            <i className="fa-brands fa-windows"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>

          {gameCounter >= response?.length ? null : (
            <>
              {console.log(gameCounter)}
              <div className="text-center mt-4">
                <button
                  onClick={handleMoreGames}
                  className={`btn text-color ${style.moreGames}`}
                >
                  More Games <i className="fa-solid fa-angles-right"></i>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
