import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class News extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {

  }

  render(){
    return(
      <div>
        <h1>News</h1>
      </div>
    )
  }
}

export default connect(state => {
  return state;
}, {})(News);