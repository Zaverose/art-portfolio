import React from "react";
import "./gallery.css";
import { Card } from "../Card/Card";
import artJSON from "../../config/art-test.json";

export const Gallery = ({search, handleGalleryClickedCard}) => {
  let cardItemsList = createCardsList(
    search,
    artJSON,
    handleGalleryClickedCard
  );

  return (
    <div id="galleryContainer" className="gallery-container">
      <ul id="gallery" className="gallery">
        {cardItemsList}
      </ul>
      <p id="cardsCounter" className="cards-counter">
        {cardItemsList.length} items found
      </p>
    </div>
  );
};

/**
 * Extract JSON recieved from DB {cardItemsData}
 * init new {Card} component for each JSON object, as props
 * @param {State} cardItemsData
 */
function createCardsList(search, cardItemsData, recieveCardDetails) {
  let data = cardItemsData;
  if (search) {
    data = filterCards(cardItemsData, search.toLowerCase());
  }

  let cardItemsList = data.map(({filePaths, title, date, tags}, i) => {
    return (
    <Card
      url={filePaths[0]}
      title={title}
      date={date}
      tags={tags}
      key={`${i}-${filePaths[0]}`}
      handleClickedCard={recieveCardDetails}
    />
  )});

  return cardItemsList;
}

/**
 * Filter the cards according to the search text
 */
function filterCards(data, search) {
  let filtered = data.filter(art => {
    // Filter card by the title
    let titleFlag = art.title.toLowerCase().indexOf(search) !== -1;

    // Filter card by the tags, if not filtered by the title
    let tagsFlag = false;
    if (!titleFlag && art.tags) {
      art.tags.filter(tag => {
        if (!tagsFlag) {
          tagsFlag = tag.toLowerCase().indexOf(search) !== -1;
        }
      });
    }

    // Return if the card chosen by the filtering
    return titleFlag || tagsFlag;
  });

  return filtered;
}
