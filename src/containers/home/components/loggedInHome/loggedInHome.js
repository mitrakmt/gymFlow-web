import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InfluencerCard from "shared-components/influencer-card/influencerCard";
import ActivityCard from "shared-components/activity-card/activityCard";

import "./loggedInHome.css";

const activities = [
  {
    name: "something"
  }
];

const influencers = [
  {
    username: "mitrakmt"
  }
];

const LoggedInHome = props => (
  <div className="loggedInHome">
    {/* My activity */}
    <h1 className="loggedInHome-heading">My Activity</h1>
    <div className="loggedInHome-myActivity">
      {activities.map(activity => (
        <ActivityCard activity={activity} />
      ))}
    </div>
    {/* Trending influencers */}
    <h1 className="loggedInHome-heading">Trending Influencers</h1>
    <div className="loggedInHome-trendingInfluencers">
      {influencers.map(influencer => (
        <InfluencerCard influencer={influencer} />
      ))}
    </div>
    {/* Bulk up, get fit boxes that lead to recommendations */}
    <div className="loggedInHome-recommendations" />
  </div>
);

LoggedInHome.propTypes = {};

export default LoggedInHome;
