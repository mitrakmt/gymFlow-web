import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getInfluencers } from "actions/influencer";

import "./influencers.css";

class Influencers extends Component {
  static defaultProps = {
    user: null
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentWillMount() {
    this.props.dispatch(getInfluencers());
  }

  render() {
    return (
      <div className="influencers">
        <h1>Influencers</h1>
        {this.props.influencer.data.influencers.map(influencer => (
          <div>
            <h1>{influencer.username}</h1>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ auth, influencer }) {
  console.log("influencer", influencer);
  return { auth, influencer };
}

export default connect(mapStateToProps)(Influencers);
