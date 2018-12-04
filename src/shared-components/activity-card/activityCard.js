import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./activityCard.css";

const ActivityCard = props => (
  <div className="activityCard">
    <Card className="row">
      <CardContent className="row">
        <Typography variant="headline" component="h2">
          {props.activity.name}
        </Typography>
      </CardContent>
      <CardActions className="right">
        <Link to={`/activity`}>
          <Button>View</Button>
        </Link>
      </CardActions>
    </Card>
  </div>
);

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default ActivityCard;
