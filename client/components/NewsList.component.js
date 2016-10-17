import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui';

class NewsList extends Component {
  constructor(props){
    super(props);
  }
  static propTypes = {

  }

  render(){
    let {newslist} = this.props;
    if(newslist){
      newslist.map(news => {
        return <ListItem primaryText={news.title} />
      })
    }else {
      newslist = null;
    }
    return(
      <div>
        <List>
          {newslist}
        </List>
      </div>
    )
  }
}

export default NewsList;