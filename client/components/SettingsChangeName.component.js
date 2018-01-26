import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {TextField, RaisedButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';
import { changeName } from '../AC/settings.AC';

class ChangeName extends Component {
  constructor(props){
    super(props);
  }

  state = {
    name: ''
  }

  static propTypes = {

  }

  render(){
    const {user} = this.props;
    return(
      <div className="block">
        <h3>Change Name</h3>
        <div className="form-group">
          <TextField
            onChange={this.nameHandler}
            defaultValue={user && user.data.name}
            floatingLabelText = "Name" />
        </div>
        <div className="form-group">
          <RaisedButton label="Save" primary={true} icon={<SaveIcon />} onClick={this.saveHandler} />
        </div>
      </div>
    )
  }

  nameHandler = e => {
    this.setState({
      name: e.target.value
    })
  }

  saveHandler = () => {
    if(this.state.name === '') return;
    const {changeName, user} = this.props;
    changeName({name: this.state.name, email: user.data.email});
  }
}

export default connect(({auth}) => {
  return auth;
}, {changeName})(ChangeName);