import React, { Component, PropTypes } from 'react'
import EditNews from '../containers/EditNews.container';

class NewsHandler extends Component {
  static propTypes = {

  }

  render(){
    return <EditNews slug={this.props.params.slug} />
  }
}

export default NewsHandler;