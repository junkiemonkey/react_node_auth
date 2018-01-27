import React, { Component, PropTypes } from 'react';
import OneNews from '../containers/OneNews.container';

class OneNewsHandler extends Component {
  static propTypes = {

  }

  render(){
    return <OneNews slug={this.props.params.slug}  />
  }
}

export default OneNewsHandler;