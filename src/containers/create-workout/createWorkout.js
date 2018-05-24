import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './createWorkout.css';


class CreateWorkout extends Component {
  static defaultProps = {
    user: null
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    return (
      <div className="createWorkout">
        <h1>Create workout</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(CreateWorkout);
