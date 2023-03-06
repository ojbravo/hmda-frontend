import React, { useState } from 'react';
import { VideoModal } from './VideoModal.jsx';
import iconSprite from "../common/uswds/img/sprite.svg";

// const [showModal, setShowModal] = useState(false);

// const handleShowModal = () => {
//   setShowModal(true);
// };

export const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return(
    <>
    <section className="usa-hero" aria-label="Introduction">
    <div className="grid-container">
      <div className="usa-hero__callout">
        <h1 className="usa-hero__heading">
          Transparency &amp; Accountability:<span className="usa-hero__heading--alt">U.S. Mortgage Market + Lenders</span>
        </h1>
        <p>
        Enacted by Congress in 1975, HMDA provides the most comprehensive source of publicly available information on the U.S. Mortgage Market.
        </p>
        <ul className="usa-button-group">
          <li className="usa-button-group__item">
            <a href="#hmda-video" 
            onClick={handleShowModal}
            className="usa-button  usa-button--accent-cool" 
            aria-controls="hmda-video"
            data-open-modal> 
              <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                <use href={`${iconSprite}#youtube`}></use>
              </svg> See How It Works
            </a>
            <VideoModal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Example Modal"
              content="This is an example modal."
            />
          </li>
          <li className="usa-button-group__item">
            <a href="/data-browser/" className="usa-button ">
              <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                  <use href={`${iconSprite}#insights`}></use>
              </svg> Explore the Data
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>    


    </>
)}