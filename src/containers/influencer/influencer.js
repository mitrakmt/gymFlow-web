import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getInfluencer } from "actions/influencer";

import "./influencer.css";

class Influencer extends Component {
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
    this.props.dispatch(getInfluencer());
  }

  render() {
    return (
      <div className="influencer">
        <h1>Influencer</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth, influencer }) {
  console.log("influencer", influencer);
  return { auth, influencer };
}

export default connect(mapStateToProps)(Influencer);
