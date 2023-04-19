import style from './TemplateName.module.scss'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificGame } from "../../Redux/appData";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function TemplateName() {
  const { response, isloading } = useSelector((state) => state.appData);
  const dispatch = useDispatch();
  const [gameCounter, setgameCounter] = useState(20);

  const handleMoreGames = () => {
    setgameCounter(gameCounter + 20); // Update counter to display 20 more games
  };

  const endPoint = "games?category=racing";

  async function PopularityGames() {
    dispatch(getSpecificGame(endPoint));
  }

  useEffect(() => {
    console.log("PopularityGames Mounted");
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
        <title>RACING_GAMES</title>
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
        <div className="container py-4">
          <div className="row gy-4">
            {console.log("response-type", Array.isArray(response))}

            {/* to ensure that the response is not for specificGame */}
            {Array.isArray(response) &&
              response?.slice(0, gameCounter)?.map((game) => (
                <div key={game.id} className="col-lg-3 col-md-4 col-sm-6">
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
  )
}
