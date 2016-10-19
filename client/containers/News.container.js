import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewsList from '../components/NewsList.component';
import {loadAllNews} from '../AC/news.AC';


class News extends Component {

  componentDidMount(){
    const {loadAllNews} = this.props;
    loadAllNews();
  }


  static propTypes = {

  }

  render(){
    return(
      <div>
        <h1>News</h1>
        <NewsList newslist = {this.props.news} />
      </div>
    )
  }
}

export default connect(({news}) => {
  return news;
}, {loadAllNews})(News);