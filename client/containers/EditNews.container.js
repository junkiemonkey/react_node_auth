import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditNewsComponent from '../components/EditNews.component';

class EditNews extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {

  }

  render(){
    return(
      <div>
        <EditNewsComponent />
      </div>
    )
  }
}

export default connect(state => {
  return state;
}, {})(EditNews);