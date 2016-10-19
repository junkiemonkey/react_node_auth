import React, { Component, PropTypes } from 'react';
import { List, ListItem, RaisedButton, Divider } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import {addNews, deleteNews, editNews} from '../AC/news.AC';
import { connect } from 'react-redux';
import AddIcon from 'material-ui/svg-icons/content/add';
import {Link} from 'react-router';
import $ from 'jquery';

class DashboardComponent extends Component {
  static propTypes = {

  }
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }


  render(){
    const {newslist, editNews} = this.props;
    if(newslist){
      var newsItems = newslist.map(news => {
        return <ListItem onClick={this._editNews} primaryText={news.title} containerElement={<Link to={`/dashboard/edit/${news.slug}`}/>} style={{border: '1px solid #ccc'}} key={news._id} rightIcon={<div onClick={this._deleteNews} id={news._id}><DeleteIcon /></div>} />
      });
    }

    return(
      <div>
        <List children={newsItems} />
        <RaisedButton
          onClick={this._addNews}
          label="Add News"
          icon={<AddIcon/>}
          primary={true}  />
      </div>
    )
  }

  _deleteNews = e => {
    e.stopPropagation();
    e.preventDefault();
    const id = $(e.target).closest('div').attr('id');
    const {deleteNews} = this.props;
    deleteNews(id);
  }

  _addNews = e => {
    const {addNews} = this.props;
    const {router} = this.context;
    addNews(true);
    router.push('/dashboard/new');
  }

  _editNews = e => {
    const {newslist, editNews} = this.props;
    editNews();
  }
}

export default connect(null, {addNews, deleteNews, editNews})(DashboardComponent);