import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(state => state, {})
export default class OneNews extends Component {
  static propTypes = {
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>Hello</div>
    );
  }
}

