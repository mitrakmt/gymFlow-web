import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkouts } from 'actions/workouts';

import './workouts.css';


class Workouts extends Component {
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

    this.state = {};
  }

  componentWillMount() {
      console.log('getWorkouts', getWorkouts)
      this.props.dispatch(getWorkouts())
  }

  render() {
    return (
      <div className="workouts">
        <h1>Workouts</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth, workouts }) {
    console.log('workouts', workouts)
  return { auth, workouts };
}

export default connect(mapStateToProps)(Workouts);
