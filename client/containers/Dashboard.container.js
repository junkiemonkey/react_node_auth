import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DashboardComponent from '../components/Dashboard.component';
import {loadAllNews} from '../AC/news.AC';

class Dashboard extends Component {

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount(){
    const {router} = this.context;
    const {auth, news, loadAllNews} = this.props;
    if(!auth.hasOwnProperty('user')) {
      router.push('/login');
      return null;
    }else {
      loadAllNews();
    }
  }

  render(){
    const {news, auth} = this.props;
    let welcome = '';
    if(auth.hasOwnProperty('user')){
      const {data} = auth.user;
      welcome = `Welcome ${data.name}!`;
    }

    return (
      <div>
        <h1>{welcome}</h1>
        <DashboardComponent newslist = {news.news} />
      </div>
    );
  }
}

export default connect(({auth, news}, ...rest) => {
  return {
    auth, news
  };
},{loadAllNews})(Dashboard);