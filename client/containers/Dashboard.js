import React, {Component} from 'react';
import { connect } from 'react-redux';
import {login} from '../AC/login';



class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    // if()
    console.log(this.props);
  }

  render(){
    return (
      <div>
        <h1>Welcome Admin!</h1>
      </div>
    );
  }
}

export default connect(({auth}, ...rest) => {
  console.log(auth);
  return auth;
},{})(Dashboard);