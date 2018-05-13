import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui';
import { Link } from 'react-router-dom';
import { loadAllNews } from '../../reducers/news.reducer';

@connect(({news}) => news, {loadAllNews})
export default class News extends Component {
  static propTypes = {
    loadAllNews: func,
    list: array
  }

  componentDidMount() {
    this.props.loadAllNews();
  }

  render() {
    const {
      props: { list }
    } = this;

    if (!list) return null;

    return (
      <List>
        {
          list.map(news => (
            <div key={news._id} className="news-item">
              <ListItem
                secondaryText={new Date(news.created).toDateString()}
                style={{border: '1px solid #ccc'}}
                primaryText={news.title}
                containerElement={<Link to={`/news/${news.slug}`} />}
              />
            </div>
          ))
        }
      </List>
    );
  }
}

