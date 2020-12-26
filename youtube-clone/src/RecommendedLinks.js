import React from "react";
import "./RecommendedLinks.css";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
}));

function RecommendedLinks({ buttonText, selected }) {
  const classes = useStyles();
  return (
    <div className="recommendedLink__button">
      <Fab
        variant="extended"
        size="small"
        aria-label="add"
        className={` ${selected && 'buttonSelected'} ${classes.margin}`}
      >
        {buttonText}
      </Fab>
      {/* <Fab variant="extended">{buttonText}</Fab> */}
    </div>
  );
}

export default RecommendedLinks;
