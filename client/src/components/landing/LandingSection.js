import React from "react";
import "../../App.css";
import { Button } from "../main_button/Button";
import "./LandingSection.css";

function LandingSection({ scrollToPosts }) {
  return (
    <div className="hero-container">
      <video src="/videos/background1_med.mp4" autoPlay loop muted />
      <h1>VÁLKA NA UKRAJINĚ</h1>
      <p>Aktuální situace</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={scrollToPosts}
        >
          Zobrazit zprávy
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={() => window.location.replace("/write")}
        >
          Přidat příspěvek <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default LandingSection;
