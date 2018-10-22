import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScrollToTop extends Component {
  componentDidMount() {
    this.props.history.listen(() => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ScrollToTop.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};
