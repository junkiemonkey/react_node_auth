import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {login} from '../AC/auth';

class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount(){
    const {router} = this.context;
    if(!this.props.hasOwnProperty('user')) router.push('/login');
  }

  render(){
    let welcome = '';
    if(this.props.hasOwnProperty('user')){
      const {data} = this.props.user;
      welcome = `Welcome ${data.name}!`;
    }

    return (
      <div>
        <h1>{welcome}</h1>
      </div>
    );
  }
}

export default connect(({auth}, ...rest) => {
  return auth;
},{})(Dashboard);