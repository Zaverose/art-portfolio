import React from "react";
import "./card-item.css";

// TODO: revert to normal once done
const BASE_IMG_URL = "https://art-gallery-cloudflare-worker.zaverosearts.workers.dev";
/**
 * Card component
 */
export function Card({url, title, date, tags, handleClickedCard}) {

  const updateCardDetailsOnClick = (e) => {
    e.preventDefault();
    handleClickedCard({url, title, date, tags});
  }

  return (
    <li onClick={updateCardDetailsOnClick}>
      <div id="cardContainer" className="card-container card-border">
        <div className="card-image-container">
          <img
            id="cardImage"
            className="card-image"
            alt={title}
            src={url}
          />
        </div>
        <div className="overlay">
          <div id="cardTitleContainer" className="items card-title-container">
            <p id="cardTitle">{title}</p>
            <hr />
          </div>
          <div id="cardDateContainer" className="items card-date-container">
            <p id="cardDate">{date}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
