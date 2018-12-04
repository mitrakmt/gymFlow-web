import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./influencerCard.css";

const InfluencerCard = props => (
  <div className="influencerCard">
    <Card className="row">
      <CardContent className="row">
        <Typography variant="headline" component="h2">
          {props.influencer.username}
        </Typography>
      </CardContent>
      <CardActions className="right">
        <Link to={`/influencers/${props.influencer.username}`}>
          <Button>View</Button>
        </Link>
      </CardActions>
    </Card>
  </div>
);

InfluencerCard.propTypes = {
  influencer: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default InfluencerCard;
