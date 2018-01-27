import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab, RaisedButton } from 'material-ui';

@connect(state => state, {})
export default class Dashboard extends Component {
  static propTypes = {
    news: object,
    auth: object,
  }

  render() {
    const {news, auth} = this.props;
    const style = {
      overflow: 'hidden'
    };
    return (
      <Fragment>
        <h1>Dashboard</h1>
        <Tabs contentContainerClassName="tab_pane">
          <Tab label="News" style={style}>
            {/*{news.is_new_news || news.is_edit_news ? this.props.children : <DashboardNews newslist={news.news}/>}*/}
          </Tab>
          <Tab label="Settings" style={style}>
            {/*<ChangeName />*/}
            {/*<ChangePassword />*/}
          </Tab>
        </Tabs>
      </Fragment>
    );
  }
}

