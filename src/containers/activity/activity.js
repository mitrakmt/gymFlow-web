import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getActivity } from "actions/activity";

import "./activity.css";

class Activity extends Component {
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
    this.props.dispatch(getActivity());
  }

  render() {
    return (
      <div className="activity">
        <h1>Activity</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth, activity }) {
  return { auth, activity };
}

export default connect(mapStateToProps)(Activity);
