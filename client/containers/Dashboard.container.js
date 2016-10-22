import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, RaisedButton } from 'material-ui';
import DashboardNews from '../components/DashboardNews.component';
import {loadAllNews} from '../AC/news.AC';


class Dashboard extends Component {

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount() {
    const {router} = this.context;
    const {auth, news, loadAllNews} = this.props;
    if (!auth.hasOwnProperty('user')) {
      router.push('/login');
      return null;
    } else {
      loadAllNews();
    }
  }

  render() {
    const {news, auth} = this.props;
    // console.log(this.props);
    let welcome = '';
    if (auth.hasOwnProperty('user')) {
      const {data} = auth.user;
      welcome = `Welcome ${data.name}!`;
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <Tabs contentContainerClassName="tab_pane">
          <Tab label="News">
            {news.is_new_news || news.is_edit_news ? this.props.children : <DashboardNews newslist={news.news}/>}
          </Tab>
          <Tab label="Settings">
            <h3>Settings</h3>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(({auth, news}, ...rest) => {
  return {
    auth, news
  };
},{loadAllNews})(Dashboard);