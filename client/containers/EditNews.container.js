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
    const {newslist, slug} = this.props;
    return(
      <div>
        <EditNewsComponent newslist={newslist} slug={slug} />
      </div>
    )
  }
}

export default connect(({news}, ...rest) => {
  return {newslist: news};
}, {})(EditNews);