import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui';

class NewsList extends Component {

  static propTypes = {

  }

  render(){
    let {newslist} = this.props;
    if(newslist){
      var newsItems = newslist.map(news => {
        return <ListItem style={{border: '1px solid #ccc'}} key={news._id} primaryText={news.title} />
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