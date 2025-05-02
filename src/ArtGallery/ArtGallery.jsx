import React, { useState, useCallback, useEffect } from "react";

import { Nav } from "./Nav/Nav";
import { Gallery } from "./Gallery/Gallery";
import { FloatingArrow } from "./FloatingArrow/FloatingArrow";
import { ZoomCardItem } from "./ZoomCardItem/ZoomCardItem";

import "./art-gallery.css";

export const ArtGallery = (props) => {
  const [search, setSearch] = useState("");
  const [cardModal, setCardModal] = useState([]);
  const [wide, setWide] = useState(false);

  console.log("ArtGallery cardModal", cardModal);

  useEffect(
    () => {
      if (props.windowWidth < 501) {
        console.log("narrow");
        setWide(false);
      } else {
        console.log("wide");
        setWide(true);
      }
    },
    [props.windowWidth] // Occurs when the state within is changing
  );

  // Recieve search data from Nav component, init search state
  const recieveNavSearchText = useCallback(
    (props) => {
      // Update searched text in the state
      setSearch(props);
    },
    [] //search
  );

  const recieveTagSearchText = useCallback(
    (props) => {
      // Update searched text in the state

      setSearch(props.toLowerCase());
    },
    [] //search
  );

  const showArtCard = (card) => {
    console.log("show art fullscreen");
    console.log('ArtGallery card', card)
    setCardModal(card)
  }

  return (
    <div
      id="ArtGallery"
      className="wide-art-gallery"
      // remove when clicked out of
      onClick={(e) => {
        if (e.target.id === "ArtGallery") {
          setCardModal(undefined);
        }
      }}
    >
      <div
        className={"art-gallery-background"}
      >
        <Nav search={search} handleNavSearch={recieveNavSearchText} />
        <Gallery
          search={search}
          handleGalleryClickedCard={showArtCard}
        />
      </div>

      {cardModal === undefined || cardModal.length === 0 ? (
        <FloatingArrow />
      ) : (
        <div className={wide ? "zoom-card-wide" : "zoom-card-narrow"}>
          <ZoomCardItem card={cardModal} handleTagSearch={recieveTagSearchText} />
        </div>
      )}
    </div>
  );
};
