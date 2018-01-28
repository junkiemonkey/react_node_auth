import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewsList from '../components/News.component';
import {loadAllNews} from '../AC/news.AC';


class News extends Component {

  componentDidMount(){
    const {loadAllNews} = this.props;
    loadAllNews();
  }

  static propTypes = {

  }

  render(){
    // console.log(this.props);
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