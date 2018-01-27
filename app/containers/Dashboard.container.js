import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, RaisedButton } from 'material-ui';
import DashboardNews from '../components/DashboardNews.component';
import ChangeName from '../components/SettingsChangeName.component';
import ChangePassword from '../components/SettingsChangePassword.component';
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
    const style = {
      overflow: 'hidden'
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <Tabs contentContainerClassName="tab_pane">
          <Tab label="News" style={style}>
            {news.is_new_news || news.is_edit_news ? this.props.children : <DashboardNews newslist={news.news}/>}
          </Tab>
          <Tab label="Settings" style={style}>
            <ChangeName />
            <ChangePassword />
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