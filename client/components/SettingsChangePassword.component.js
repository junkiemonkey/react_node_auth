import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {TextField, RaisedButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';
import {changePass}  from '../AC/settings.AC';

class ChangePassword extends Component {
  constructor(props){
    super(props);
  }

  state = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
    error: '',
    oldField: '',
    newField: '',
    confirmField: ''
  }

  static propTypes = {

  }

  render(){
    return(
      <div className="block">
        <h3>Change Password</h3>
        <div className="form-group">
          <TextField
            onChange={this.oldPassHandler}
            floatingLabelText = "Old Password"
            errorText = {this.state.oldField ? this.state.error : ''}
            type="password" />
        </div>
        <div className="form-group">
          <TextField
            onChange={this.newPassHandler}
            floatingLabelText = "New Password"
            errorText = {this.state.newField ? this.state.error : ''}
            type="password" />
        </div>
        <div className="form-group">
          <TextField
            onChange={this.confirmPassHandler}
            floatingLabelText = "Confirm New Password"
            errorText = {this.state.confirmField ? this.state.error : ''}
            type="password" />
        </div>
        <div className="form-group">
          <RaisedButton label="Save" primary={true} icon={<SaveIcon />} onClick={this.saveHandler} />
        </div>
      </div>
    )
  }

  oldPassHandler = e => {
    this.setState({
      oldPass: e.target.value
    })
  }

  newPassHandler = e => {
    this.setState({
      newPass: e.target.value
    });
  }

  confirmPassHandler = e => {
    this.setState({
      confirmPass: e.target.value
    });
  }

  saveHandler = e => {
    if(!this._validator(this.state)) return;
    const {changePass, user} = this.props;
    changePass({old: this.state.oldPass, password: this.state.newPass, email: user.data.email});
  };

  _validator = (state) => {
    const {oldPass, newPass, confirmPass} = state;
    const require = 'This field is required';
    const notequal = 'Pass not equal';
    if(oldPass === ''){
      this.setState({
        error: require,
        oldField: true
      });
      return false;
    }else {
      this.setState({
        error: '',
        oldField: false
      });
    }
    if(newPass === ''){
      console.log('op')
      this.setState({
        error: require,
        newField: true
      });
      return false;
    }else {
      this.setState({
        error: '',
        newField: false
      });
    }
    if(newPass !== confirmPass) {
      this.setState({
        newField: true,
        confirmField: true,
        error: notequal
      });
      return false;
    }else {
      this.setState({
        newField: false,
        confirmField: false,
        error: ''
      });
    }
    return true;
  }
}

export default connect(({auth}) => {
  return auth;
}, {changePass})(ChangePassword);