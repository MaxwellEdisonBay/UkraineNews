import {
  Link,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./ImageButton.css";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#242424",

    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    webkitBoxShadow: "-4px 5px 9px 1px rgba(36,36,36,0.22)",
    boxShadow: "-4px 5px 9px 1px rgba(36,36,36,0.22)",
    border: "none",
  },
}));

const ImageButton = ({ text, modalData, imagePath, active, handleClick }) => {
  return (
    <div className="image-button-container">
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className="channel-desc-line">
              <Typography sx={{ p: 1 }} variant={"subtitle2"}>
                Sledují:
              </Typography>
              <Typography sx={{ p: 1 }} variant={"body2"}>
                {modalData.subscribers}
              </Typography>
            </div>
            <div className="channel-desc-line">
              <Typography sx={{ p: 1 }} variant={"subtitle2"}>
                Pozice:
              </Typography>
              <Typography sx={{ p: 1 }} variant={"body2"}>
                {modalData.position}
              </Typography>
            </div>
            <div className="channel-desc-line">
              <Typography sx={{ p: 1 }} variant={"subtitle2"}>
                Patří:
              </Typography>
              <Typography sx={{ p: 1 }} variant={"body2"}>
                <Link href={modalData.whoOwnsUrl}>{modalData.whoOwns}</Link>
              </Typography>
            </div>
            <div className="channel-desc-line">
              <Typography sx={{ p: 1 }} variant={"subtitle2"}>
                Odkaz:
              </Typography>
              <Typography sx={{ p: 1 }} variant={"body2"}>
                <Link href={modalData.originalUrl}>telegram</Link>
              </Typography>
            </div>
          </React.Fragment>
        }
      >
        <div
          className={active ? "image-button-enabled" : "image-button-disabled"}
          onClick={handleClick}
        >
          <div className="image-button-icon">
            <img src={imagePath} alt="Logo" />
          </div>
          <div className="image-button-body">
            <Typography variant="h6">{text}</Typography>
          </div>
        </div>
      </HtmlTooltip>
    </div>
  );
};

export default ImageButton;
