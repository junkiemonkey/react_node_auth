import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, List, ListItem, RaisedButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

class DashboardComponent extends Component {
  static propTypes = {

  }

  render(){
    const {newslist} = this.props;
    if(newslist){
      var newsItems = newslist.map(news => {
        <ListItem primaryText={news.title} leftIcon={<DeleteIcon />}></ListItem>
      });
    }

    return(
      <Tabs contentContainerClassName="tab_pane">
        <Tab label="News">
          {newsItems}
          {this.props.children}
          <RaisedButton
            containerElement = {<Link to="dashboard/new" />}
            label="Add News"
            icon={<AddIcon/>}
            primary={true}  />
        </Tab>
        <Tab label="Settings">
          <h3>Settings</h3>
        </Tab>
      </Tabs>
    )
  }
}

export default DashboardComponent;