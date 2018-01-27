import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui';
import { Link } from 'react-router';

class NewsList extends Component {

  static propTypes = {

  }

  render(){
    let {newslist} = this.props;
    if(newslist){
      var newsItems = newslist.map(news => {
        return (<div key={news._id} className="news-item"><ListItem secondaryText={new Date(news.created).toDateString()} style={{border: '1px solid #ccc'}}  primaryText={news.title} containerElement={<Link to={`/news/${news.slug}`} />} /></div>)
      })
    }else {
      newslist = null;
    }
    return(
      <div>
        <List children={newsItems} />
      </div>
    )
  }
}

export default NewsList;