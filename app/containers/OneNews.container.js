import React, { Component, PropTypes } from 'react';
import OneNewsComponent from '../components/OneNews.component';
import { loadOneNews } from '../actions/news.actions';
import { connect } from 'react-redux';

class OneNews extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {

  }

  componentDidMount(){
    const {loadOneNews, slug} = this.props;
    loadOneNews(slug);
  }

  render(){
    const news = this.props.one_news ? this.props.one_news : '';
    return(
      <div>
        <OneNewsComponent one_news={news} />
      </div>
    )
  }
}

export default connect(({news}, {slug}) => {
  const {one_news} = news;
  return {one_news, slug};
}, {loadOneNews})(OneNews);
